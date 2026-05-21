<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use yii\filters\Cors;
use yii\filters\auth\HttpBearerAuth;
use yii\web\UnauthorizedHttpException;

class UsuarioController extends Controller
{
    public $enableCsrfValidation = false;

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        // CORS debe registrarse ANTES que el autenticador
        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors'  => [
                'Origin' => ['http://localhost:8100'],
                'Access-Control-Request-Method'    => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers'   => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age'           => 600,
            ],
        ];

        $behaviors['authenticator'] = [
            'class'  => HttpBearerAuth::class,
            // Todos los endpoints de este controlador requieren token
        ];

        return $behaviors;
    }

    /**
     * GET /usuario/perfil
     * Devuelve datos del usuario autenticado + suscripción activa.
     */
    public function actionPerfil()
    {
        $userId = Yii::$app->user->id;

        // Datos básicos del usuario (tabla webvimark)
        $user = Yii::$app->db->createCommand('
            SELECT id, username, email, avatar
            FROM user
            WHERE id = :id
        ', [':id' => $userId])->queryOne();

        if (!$user) {
            throw new UnauthorizedHttpException('Usuario no encontrado.');
        }

        // Última suscripción activa
        $sub = Yii::$app->db->createCommand('
            SELECT s.subscription_id, s.start_date, s.end_date,
                   sp.plan_name
            FROM subscriptions s
            JOIN subscription_plans sp ON sp.plan_id = s.plan_id
            WHERE s.user_id = :uid
            ORDER BY s.subscription_id DESC
            LIMIT 1
        ', [':uid' => $userId])->queryOne();

        $suscripcion = null;
        if ($sub) {
            $activo = $sub['end_date'] === null || $sub['end_date'] >= date('Y-m-d');
            $suscripcion = [
                'plan'       => $sub['plan_name'],
                'activo'     => $activo,
                'renovacion' => $sub['end_date'],
            ];
        }

        return $this->asJson([
            'id'          => (int) $user['id'],
            'username'    => $user['username'],
            'email'       => $user['email'],
            'avatar'      => $user['avatar'] ?: null,
            'suscripcion' => $suscripcion,
        ]);
    }

    /**
     * GET /usuario/continuar-viendo
     * Devuelve los últimos contenidos vistos con progreso calculado.
     */
    public function actionContinuarViendo()
    {
        $userId = Yii::$app->user->id;

        // Toma la última entrada de watch_history por contenido para este usuario
        $rows = Yii::$app->db->createCommand('
            SELECT wh.history_id, wh.watched_seconds,
                   c.content_id, c.title, c.image_url, c.duration_minutes
            FROM watch_history wh
            JOIN profiles p ON p.profile_id = wh.profile_id
            JOIN content c ON c.content_id = wh.content_id
            WHERE p.user_id = :uid
            ORDER BY wh.history_id DESC
            LIMIT 10
        ', [':uid' => $userId])->queryAll();

        // Desduplicar por contenido (puede haber múltiples entradas)
        $seen    = [];
        $result  = [];
        foreach ($rows as $row) {
            $cid = (int) $row['content_id'];
            if (isset($seen[$cid])) {
                continue;
            }
            $seen[$cid] = true;

            $totalSeconds = (int) $row['duration_minutes'] * 60;
            $progreso = $totalSeconds > 0
                ? (int) round(((int) $row['watched_seconds'] / $totalSeconds) * 100)
                : 0;
            $progreso = max(0, min(100, $progreso));

            $result[] = [
                'id'       => $cid,
                'titulo'   => $row['title'],
                'imagen'   => $row['image_url'],
                'progreso' => $progreso,
            ];
        }

        return $this->asJson($result);
    }

    public function actionActualizarPerfil()
{
    Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    $db = Yii::$app->db;
    $tx = $db->beginTransaction();
 
    try {
        $user = Yii::$app->user->identity;
        if (!$user) {
            Yii::$app->response->statusCode = 401;
            return ['error' => 'No autenticado'];
        }
 
        $params = Yii::$app->request->getBodyParams();
 
        $updates = [];
 
        // Actualizar email si viene
        if (!empty($params['email'])) {
            if (!filter_var($params['email'], FILTER_VALIDATE_EMAIL)) {
                Yii::$app->response->statusCode = 422;
                return ['error' => 'Email inválido'];
            }
 
            // Verificar que no exista en otro usuario
            $existe = (new \yii\db\Query())
                ->from('user')
                ->where(['email' => $params['email']])
                ->andWhere(['<>', 'id', $user->id])
                ->one();
 
            if ($existe) {
                Yii::$app->response->statusCode = 422;
                return ['error' => 'El email ya está en uso'];
            }
 
            $updates['email'] = $params['email'];
        }
 
        // Cambiar contraseña (requiere password_actual)
        if (!empty($params['password_nuevo'])) {
            if (empty($params['password_actual'])) {
                Yii::$app->response->statusCode = 422;
                return ['error' => 'Debes ingresar tu contraseña actual'];
            }
 
            $valida = Yii::$app->security->validatePassword(
                $params['password_actual'],
                $user->password_hash
            );
 
            if (!$valida) {
                Yii::$app->response->statusCode = 422;
                return ['error' => 'La contraseña actual es incorrecta'];
            }
 
            if (strlen($params['password_nuevo']) < 6) {
                Yii::$app->response->statusCode = 422;
                return ['error' => 'La nueva contraseña debe tener al menos 6 caracteres'];
            }
 
            $updates['password_hash'] = Yii::$app->security->generatePasswordHash(
                $params['password_nuevo']
            );
        }
 
        if (empty($updates)) {
            Yii::$app->response->statusCode = 400;
            return ['error' => 'No hay datos para actualizar'];
        }
 
        $updates['updated_at'] = time();
 
        $db->createCommand()
           ->update('user', $updates, ['id' => $user->id])
           ->execute();
 
        $tx->commit();
 
        return [
            'success' => true,
            'message' => 'Perfil actualizado correctamente',
            'email'   => $params['email'] ?? $user->email,
        ];
 
    } catch (\Throwable $e) {
        $tx->rollBack();
        Yii::$app->response->statusCode = 500;
        return [
            'error'   => 'Error interno',
            'message' => $e->getMessage(),
        ];
    }
    }

    public function actionSubirAvatar()
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
 
    try {
        $user = \Yii::$app->user->identity;
        if (!$user) {
            \Yii::$app->response->statusCode = 401;
            return ['success' => false, 'message' => 'No autenticado'];
        }
 
        $archivo = \yii\web\UploadedFile::getInstanceByName('avatar');
        if (!$archivo) {
            \Yii::$app->response->statusCode = 400;
            return ['success' => false, 'message' => 'No se recibió ningún archivo'];
        }
 
        // Validar extensión
        $extensionesPermitidas = ['png', 'jpg', 'jpeg', 'webp'];
        if (!in_array(strtolower($archivo->extension), $extensionesPermitidas)) {
            \Yii::$app->response->statusCode = 422;
            return ['success' => false, 'message' => 'Formato no permitido. Usa PNG, JPG o WEBP.'];
        }
 
        // Validar tamaño (2MB máx para avatares)
        if ($archivo->size > 2 * 1024 * 1024) {
            \Yii::$app->response->statusCode = 422;
            return ['success' => false, 'message' => 'El avatar excede 2MB.'];
        }
 
        // Crear carpeta destino
        $carpeta = \Yii::getAlias('@app/web/imagenes/avatares/');
        if (!is_dir($carpeta)) {
            mkdir($carpeta, 0777, true);
        }
 
        // Nombre único: avatar_{userId}_{timestamp}.{ext}
        $nombreArchivo = 'avatar_' . $user->id . '_' . time() . '.' . $archivo->extension;
        $rutaCompleta  = $carpeta . $nombreArchivo;
 
        if (!$archivo->saveAs($rutaCompleta)) {
            \Yii::$app->response->statusCode = 500;
            return ['success' => false, 'message' => 'No se pudo guardar el archivo'];
        }
 
        // URL pública absoluta
        $baseUrl    = \Yii::$app->request->hostInfo;
        $urlPublica = $baseUrl . '/imagenes/avatares/' . $nombreArchivo;
 
        // Actualizar el campo avatar del usuario
        \Yii::$app->db->createCommand()
            ->update('user', ['avatar' => $urlPublica], ['id' => $user->id])
            ->execute();
 
        return [
            'success' => true,
            'message' => 'Avatar actualizado correctamente',
            'avatar'  => $urlPublica,
        ];
 
    } catch (\Throwable $e) {
        \Yii::$app->response->statusCode = 500;
        return [
            'success' => false,
            'message' => $e->getMessage(),
        ];
    }
}

public function actionFavoritos()
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
 
    $user = \Yii::$app->user->identity;
    if (!$user) {
        \Yii::$app->response->statusCode = 401;
        return ['error' => 'No autenticado'];
    }
 
    // Obtener perfiles del usuario
    $profileIds = (new \yii\db\Query())
        ->select('profile_id')
        ->from('profiles')
        ->where(['user_id' => $user->id])
        ->column();
 
    if (empty($profileIds)) {
        return [];
    }
 
    // Buscar favoritos del usuario joineado con content
    $favoritos = (new \yii\db\Query())
        ->select([
            'c.content_id as id',
            'c.title as titulo',
            'c.image_url as imagen',
            'c.release_year as anio',
            'c.clasificacion',
            'c.content_type as tipo',
        ])
        ->from('favorites f')
        ->innerJoin('content c', 'c.content_id = f.content_id')
        ->where(['f.profile_id' => $profileIds])
        ->groupBy('c.content_id')
        ->orderBy(['c.content_id' => SORT_DESC])
        ->all();
 
    // Calcular rating promedio para cada uno
    foreach ($favoritos as &$fav) {
        $avg = (new \yii\db\Query())
            ->from('ratings')
            ->where(['content_id' => $fav['id']])
            ->average('score');
        $fav['calificacion'] = $avg ? round($avg, 1) : 0;
    }
 
    return $favoritos;
}
 
/**
 * POST /usuario/favoritos
 * Headers: Authorization: Bearer <token>
 * Body: { content_id }
 *
 * Marca un contenido como favorito para el primer perfil del usuario.
 */
public function actionAgregarFavorito()
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
 
    $user = \Yii::$app->user->identity;
    if (!$user) {
        \Yii::$app->response->statusCode = 401;
        return ['error' => 'No autenticado'];
    }
 
    $params = \Yii::$app->request->getBodyParams();
    $contentId = (int)($params['content_id'] ?? 0);
 
    if ($contentId === 0) {
        \Yii::$app->response->statusCode = 400;
        return ['error' => 'content_id requerido'];
    }
 
    // Obtener el primer perfil del usuario
    $profileId = (new \yii\db\Query())
        ->select('profile_id')
        ->from('profiles')
        ->where(['user_id' => $user->id])
        ->scalar();
 
    if (!$profileId) {
        \Yii::$app->response->statusCode = 422;
        return ['error' => 'El usuario no tiene perfiles'];
    }
 
    // Verificar si ya existe
    $existe = (new \yii\db\Query())
        ->from('favorites')
        ->where(['profile_id' => $profileId, 'content_id' => $contentId])
        ->exists();
 
    if ($existe) {
        return ['success' => true, 'message' => 'Ya estaba en favoritos'];
    }
 
    \Yii::$app->db->createCommand()->insert('favorites', [
        'profile_id' => $profileId,
        'content_id' => $contentId,
    ])->execute();
 
    return ['success' => true, 'message' => 'Agregado a favoritos'];
}
 
/**
 * DELETE /usuario/favoritos/{content_id}
 * Headers: Authorization: Bearer <token>
 *
 * Quita un contenido de los favoritos del usuario.
 */
public function actionQuitarFavorito($content_id)
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
 
    $user = \Yii::$app->user->identity;
    if (!$user) {
        \Yii::$app->response->statusCode = 401;
        return ['error' => 'No autenticado'];
    }
 
    $profileIds = (new \yii\db\Query())
        ->select('profile_id')
        ->from('profiles')
        ->where(['user_id' => $user->id])
        ->column();
 
    if (empty($profileIds)) {
        return ['success' => true];
    }
 
    \Yii::$app->db->createCommand()
        ->delete('favorites', [
            'profile_id' => $profileIds,
            'content_id' => (int)$content_id,
        ])
        ->execute();
 
    return ['success' => true, 'message' => 'Quitado de favoritos'];
}

/**
 * POST /usuario/calificar
 * Headers: Authorization: Bearer <token>
 * Body: { content_id, score (1-5) }
 *
 * Registra o actualiza la calificación del usuario para un contenido.
 */
public function actionCalificar()
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

    $user = \Yii::$app->user->identity;
    if (!$user) {
        \Yii::$app->response->statusCode = 401;
        return ['error' => 'No autenticado'];
    }

    $params    = \Yii::$app->request->getBodyParams();
    $contentId = (int)($params['content_id'] ?? 0);
    $score     = (int)($params['score'] ?? 0);

    if ($contentId === 0 || $score < 1 || $score > 5) {
        \Yii::$app->response->statusCode = 400;
        return ['error' => 'content_id y score (1-5) son requeridos'];
    }

    // Usa el primer perfil del usuario (igual que favoritos)
    $profileId = (new \yii\db\Query())
        ->select('profile_id')
        ->from('profiles')
        ->where(['user_id' => $user->id])
        ->scalar();

    if (!$profileId) {
        \Yii::$app->response->statusCode = 422;
        return ['error' => 'El usuario no tiene perfiles'];
    }

    // Upsert: si ya calificó este contenido, actualiza; si no, inserta
    $ratingId = (new \yii\db\Query())
        ->select('rating_id')
        ->from('ratings')
        ->where(['profile_id' => $profileId, 'content_id' => $contentId])
        ->scalar();

    if ($ratingId) {
        \Yii::$app->db->createCommand()
            ->update('ratings', ['score' => $score], ['rating_id' => $ratingId])
            ->execute();
    } else {
        \Yii::$app->db->createCommand()
            ->insert('ratings', [
                'profile_id' => $profileId,
                'content_id' => $contentId,
                'score'      => $score,
            ])->execute();
    }

    // Promedio actualizado para refrescar la UI
    $avg = (new \yii\db\Query())
        ->from('ratings')
        ->where(['content_id' => $contentId])
        ->average('score');

    return [
        'success'      => true,
        'message'      => 'Calificación guardada',
        'tu_score'     => $score,
        'calificacion' => $avg ? round($avg, 1) : 0,
    ];
}

/**
 * GET /usuario/calificacion/{content_id}
 * Headers: Authorization: Bearer <token>
 *
 * Devuelve la calificación que el usuario dio a un contenido (0 si no calificó).
 */
public function actionMiCalificacion($content_id)
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

    $user = \Yii::$app->user->identity;
    if (!$user) {
        \Yii::$app->response->statusCode = 401;
        return ['error' => 'No autenticado'];
    }

    $profileIds = (new \yii\db\Query())
        ->select('profile_id')
        ->from('profiles')
        ->where(['user_id' => $user->id])
        ->column();

    if (empty($profileIds)) {
        return ['score' => 0];
    }

    $score = (new \yii\db\Query())
        ->select('score')
        ->from('ratings')
        ->where(['profile_id' => $profileIds, 'content_id' => (int)$content_id])
        ->orderBy(['rating_id' => SORT_DESC])
        ->scalar();

    return ['score' => $score ? (int)$score : 0];
}

/**
 * POST /usuario/historial
 * Headers: Authorization: Bearer <token>
 * Body: { content_id, watched_seconds?, episode_id? }
 *
 * Guarda el progreso de reproducción del usuario.
 * Hace UPSERT: mantiene una sola fila por (perfil, contenido, episodio),
 * así el progreso se actualiza en lugar de duplicar registros.
 * Si watched_seconds llega como 0 (video visto completo), el contador
 * queda reiniciado. Alimenta GET /usuario/continuar-viendo.
 */
public function actionRegistrarHistorial()
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

    $user = \Yii::$app->user->identity;
    if (!$user) {
        \Yii::$app->response->statusCode = 401;
        return ['error' => 'No autenticado'];
    }

    $params    = \Yii::$app->request->getBodyParams();
    $contentId = (int)($params['content_id'] ?? 0);
    $segundos  = max(0, (int)($params['watched_seconds'] ?? 0));
    $episodeId = isset($params['episode_id']) && $params['episode_id'] !== null
        ? (int)$params['episode_id']
        : null;

    if ($contentId === 0) {
        \Yii::$app->response->statusCode = 400;
        return ['error' => 'content_id requerido'];
    }

    $profileId = (new \yii\db\Query())
        ->select('profile_id')
        ->from('profiles')
        ->where(['user_id' => $user->id])
        ->scalar();

    if (!$profileId) {
        \Yii::$app->response->statusCode = 422;
        return ['error' => 'El usuario no tiene perfiles'];
    }

    // Busca la fila existente para este perfil/contenido/episodio.
    // Con episode_id = null Yii genera "episode_id IS NULL" automáticamente.
    $historyId = (new \yii\db\Query())
        ->select('history_id')
        ->from('watch_history')
        ->where([
            'profile_id' => $profileId,
            'content_id' => $contentId,
            'episode_id' => $episodeId,
        ])
        ->scalar();

    if ($historyId) {
        \Yii::$app->db->createCommand()
            ->update('watch_history',
                ['watched_seconds' => $segundos],
                ['history_id' => $historyId])
            ->execute();
    } else {
        \Yii::$app->db->createCommand()->insert('watch_history', [
            'profile_id'      => $profileId,
            'content_id'      => $contentId,
            'episode_id'      => $episodeId,
            'watched_seconds' => $segundos,
        ])->execute();
    }

    return [
        'success'         => true,
        'message'         => 'Progreso guardado',
        'watched_seconds' => $segundos,
    ];
}

/**
 * GET /usuario/historial/{content_id}
 * Headers: Authorization: Bearer <token>
 *
 * Devuelve los segundos vistos guardados para un contenido (0 si no hay).
 * Permite al reproductor reanudar donde se quedó el usuario.
 */
public function actionMiHistorial($content_id)
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;

    $user = \Yii::$app->user->identity;
    if (!$user) {
        \Yii::$app->response->statusCode = 401;
        return ['error' => 'No autenticado'];
    }

    $profileIds = (new \yii\db\Query())
        ->select('profile_id')
        ->from('profiles')
        ->where(['user_id' => $user->id])
        ->column();

    if (empty($profileIds)) {
        return ['watched_seconds' => 0];
    }

    $segundos = (new \yii\db\Query())
        ->select('watched_seconds')
        ->from('watch_history')
        ->where(['profile_id' => $profileIds, 'content_id' => (int)$content_id])
        ->orderBy(['history_id' => SORT_DESC])
        ->scalar();

    return ['watched_seconds' => $segundos ? (int)$segundos : 0];
}
}
