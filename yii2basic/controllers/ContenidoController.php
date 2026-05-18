<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use yii\filters\Cors;
use app\models\Content;
use app\models\Genre;
use app\models\Season;

class ContenidoController extends Controller
{
    public $enableCsrfValidation = false;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
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
        return $behaviors;
    }

    /**
     * GET /contenidos/destacado
     * Devuelve el contenido con mayor calificación promedio.
     */
    public function actionDestacado()
    {
        $row = Yii::$app->db->createCommand('
            SELECT c.content_id, c.title, c.image_url, c.release_year, c.clasificacion,
                   ROUND(IFNULL(AVG(r.score), 0), 1) AS calificacion
            FROM content c
            LEFT JOIN ratings r ON r.content_id = c.content_id
            GROUP BY c.content_id, c.title, c.image_url, c.release_year, c.clasificacion
            ORDER BY calificacion DESC, c.content_id DESC
            LIMIT 1
        ')->queryOne();

        if (!$row) {
            return $this->asJson([]);
        }

        return $this->asJson($this->formatItem($row));
    }

    /**
     * GET /contenidos/categorias
     * Devuelve array de categorías con sus contenidos.
     * Primera categoría = "Tendencias" (los 10 más vistos en watch_history).
     */
    public function actionCategorias()
    {
        $result = [];

        // Tendencias: top 10 más vistos (por cantidad de entradas en watch_history)
        $tendencias = Yii::$app->db->createCommand('
            SELECT c.content_id, c.title, c.image_url, c.release_year, c.clasificacion,
                   ROUND(IFNULL(AVG(r.score), 0), 1) AS calificacion
            FROM content c
            LEFT JOIN watch_history wh ON wh.content_id = c.content_id
            LEFT JOIN ratings r ON r.content_id = c.content_id
            GROUP BY c.content_id, c.title, c.image_url, c.release_year, c.clasificacion
            ORDER BY COUNT(wh.history_id) DESC, c.content_id ASC
            LIMIT 10
        ')->queryAll();

        $result[] = [
            'nombre' => 'Tendencias',
            'items'  => $this->formatItems($tendencias),
        ];

        // Una categoría por cada género que tenga contenidos
        $genres = Genre::find()->all();
        foreach ($genres as $genre) {
            $items = Yii::$app->db->createCommand('
                SELECT c.content_id, c.title, c.image_url, c.release_year, c.clasificacion,
                       ROUND(IFNULL(AVG(r.score), 0), 1) AS calificacion
                FROM content c
                JOIN content_genres cg ON cg.content_id = c.content_id
                LEFT JOIN ratings r ON r.content_id = c.content_id
                WHERE cg.genre_id = :gid
                GROUP BY c.content_id, c.title, c.image_url, c.release_year, c.clasificacion
                ORDER BY calificacion DESC
                LIMIT 20
            ', [':gid' => $genre->genre_id])->queryAll();

            if (!empty($items)) {
                $result[] = [
                    'nombre' => $genre->genre_name,
                    'items'  => $this->formatItems($items),
                ];
            }
        }

        return $this->asJson($result);
    }

    /**
     * GET /contenidos/buscar/{text}?categoria={genre_id}
     * Búsqueda por título con filtro opcional de género.
     */
    public function actionBuscar($text = '')
    {
        $categoriaId = Yii::$app->request->get('categoria');

        if ($categoriaId) {
            $rows = Yii::$app->db->createCommand('
                SELECT c.content_id, c.title, c.image_url, c.release_year, c.clasificacion,
                       ROUND(IFNULL(AVG(r.score), 0), 1) AS calificacion,
                       cg.genre_id AS categoria
                FROM content c
                JOIN content_genres cg ON cg.content_id = c.content_id
                LEFT JOIN ratings r ON r.content_id = c.content_id
                WHERE c.title LIKE :text AND cg.genre_id = :gid
                GROUP BY c.content_id, c.title, c.image_url, c.release_year, c.clasificacion, cg.genre_id
                ORDER BY calificacion DESC
                LIMIT 20
            ', [':text' => '%' . $text . '%', ':gid' => (int) $categoriaId])->queryAll();
        } else {
            $rows = Yii::$app->db->createCommand('
                SELECT c.content_id, c.title, c.image_url, c.release_year, c.clasificacion,
                       ROUND(IFNULL(AVG(r.score), 0), 1) AS calificacion,
                       NULL AS categoria
                FROM content c
                LEFT JOIN ratings r ON r.content_id = c.content_id
                WHERE c.title LIKE :text
                GROUP BY c.content_id, c.title, c.image_url, c.release_year, c.clasificacion
                ORDER BY calificacion DESC
                LIMIT 20
            ', [':text' => '%' . $text . '%'])->queryAll();
        }

        return $this->asJson(array_map(function ($row) {
            return [
                'id'           => (int) $row['content_id'],
                'titulo'       => $row['title'],
                'imagen'       => $row['image_url'],
                'anio'         => $row['release_year'] !== null ? (int) $row['release_year'] : null,
                'clasificacion' => $row['clasificacion'],
                'calificacion' => (float) $row['calificacion'],
                'categoria'    => $row['categoria'] !== null ? (int) $row['categoria'] : null,
            ];
        }, $rows));
    }

    /**
     * GET /contenidos/total/{text}?categoria={genre_id}
     * Conteo total para paginación.
     */
    public function actionTotal($text = '')
    {
        $categoriaId = Yii::$app->request->get('categoria');

        if ($categoriaId) {
            $count = Yii::$app->db->createCommand('
                SELECT COUNT(DISTINCT c.content_id)
                FROM content c
                JOIN content_genres cg ON cg.content_id = c.content_id
                WHERE c.title LIKE :text AND cg.genre_id = :gid
            ', [':text' => '%' . $text . '%', ':gid' => (int) $categoriaId])->queryScalar();
        } else {
            $count = Content::find()
                ->andFilterWhere(['like', 'title', $text ?: null])
                ->count();
        }

        return $this->asJson((int) $count);
    }

    /**
     * GET /contenidos/{id}
     * Detalle de un contenido. Si es Serie, incluye temporadas y episodios.
     */
    public function actionView($id)
    {
        $row = Yii::$app->db->createCommand('
            SELECT c.content_id, c.title, c.description, c.image_url, c.release_year,
                   c.clasificacion, c.content_type, c.duration_minutes,
                   ROUND(IFNULL(AVG(r.score), 0), 1) AS calificacion
            FROM content c
            LEFT JOIN ratings r ON r.content_id = c.content_id
            WHERE c.content_id = :id
            GROUP BY c.content_id, c.title, c.description, c.image_url, c.release_year,
                     c.clasificacion, c.content_type, c.duration_minutes
        ', [':id' => (int) $id])->queryOne();

        if (!$row) {
            throw new \yii\web\NotFoundHttpException('Contenido no encontrado.');
        }

        $result = [
            'id'           => (int) $row['content_id'],
            'titulo'       => $row['title'],
            'descripcion'  => $row['description'],
            'imagen'       => $row['image_url'],
            'anio'         => $row['release_year'] !== null ? (int) $row['release_year'] : null,
            'clasificacion' => $row['clasificacion'],
            'calificacion' => (float) $row['calificacion'],
            'tipo'         => $row['content_type'],
            'duracion'     => (int) $row['duration_minutes'],
        ];

        if ($row['content_type'] === Content::CONTENT_TYPE_SERIES) {
            $seasons = Season::find()
                ->with(['episodes' => function ($q) {
                    $q->orderBy(['episode_number' => SORT_ASC]);
                }])
                ->where(['content_id' => (int) $id])
                ->orderBy(['season_number' => SORT_ASC])
                ->all();

            $result['temporadas'] = array_map(function ($season) {
                return [
                    'id'        => (int) $season->season_id,
                    'numero'    => (int) $season->season_number,
                    'episodios' => array_map(function ($ep) {
                        return [
                            'id'      => (int) $ep->episode_id,
                            'numero'  => (int) $ep->episode_number,
                            'titulo'  => 'Episodio ' . $ep->episode_number,
                            'duracion' => (int) $ep->duration_minutes,
                        ];
                    }, $season->episodes),
                ];
            }, $seasons);
        }

        return $this->asJson($result);
    }

    // --- helpers ---

    private function formatItem(array $row): array
    {
        return [
            'id'            => (int) $row['content_id'],
            'titulo'        => $row['title'],
            'imagen'        => $row['image_url'],
            'anio'          => $row['release_year'] !== null ? (int) $row['release_year'] : null,
            'clasificacion' => $row['clasificacion'],
            'calificacion'  => (float) $row['calificacion'],
        ];
    }

    private function formatItems(array $rows): array
    {
        return array_map([$this, 'formatItem'], $rows);
    }
}
