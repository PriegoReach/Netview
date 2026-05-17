<?php

namespace app\controllers;

use Yii;
use yii\rest\Controller;
use yii\web\Response;
use webvimark\modules\UserManagement\models\User;

class AuthController extends Controller
{
    public $enableCsrfValidation = false;

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:8100'],
                'Access-Control-Request-Method'    => ['POST', 'OPTIONS'],
                'Access-Control-Request-Headers'   => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age'           => 600,
            ],
        ];

        return $behaviors;
    }

    // ── POST /auth/login ──────────────────────────────────────────────────
    public function actionLogin()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        try {
            $params   = Yii::$app->request->getBodyParams();
            $username = $params['username'] ?? '';
            $password = $params['password'] ?? '';

            if ($username === '' || $password === '') {
                Yii::$app->response->statusCode = 400;
                return ['error' => 'Faltan credenciales'];
            }

            $user = User::findOne(['username' => $username]);
            if (!$user) {
                Yii::$app->response->statusCode = 401;
                return ['error' => 'Usuario no encontrado'];
            }

            $valido = Yii::$app->security->validatePassword($password, $user->password_hash);
            if (!$valido) {
                Yii::$app->response->statusCode = 401;
                return ['error' => 'Contraseña incorrecta'];
            }

            $roles = (new \yii\db\Query())
                ->select('item_name')
                ->from('auth_assignment')
                ->where(['user_id' => $user->id])
                ->column();

            $rol     = $roles[0] ?? 'cliente';
            $esAdmin = ($user->superadmin == 1) || in_array('Admin', $roles);

            return [
                'token'    => $user->auth_key,
                'username' => $user->username,
                'nombre'   => $user->username,
                'rol'      => $rol,
                'es_admin' => $esAdmin,
            ];

        } catch (\Throwable $e) {
            Yii::$app->response->statusCode = 500;
            return [
                'error'   => 'Error interno',
                'message' => $e->getMessage(),
                'file'    => $e->getFile(),
                'line'    => $e->getLine(),
            ];
        }
    }

    // ── POST /auth/registrar ─────────────────────────────────────────────
    public function actionRegistrar()
    {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $db = Yii::$app->db;
        $tx = $db->beginTransaction();

        try {
            $params   = Yii::$app->request->getBodyParams();
            $username = trim($params['username'] ?? '');
            $password = $params['password']     ?? '';
            $email    = trim($params['email']   ?? '');

            // Validaciones básicas
            if ($username === '' || $password === '' || $email === '') {
                Yii::$app->response->statusCode = 400;
                return ['error' => 'Todos los campos son requeridos'];
            }

            if (strlen($password) < 6) {
                Yii::$app->response->statusCode = 422;
                return ['error' => 'La contraseña debe tener al menos 6 caracteres'];
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                Yii::$app->response->statusCode = 422;
                return ['error' => 'Email inválido'];
            }

            // Verificar duplicados
            $existe = User::findOne(['username' => $username]);
            if ($existe) {
                Yii::$app->response->statusCode = 422;
                return ['error' => 'El usuario ya existe'];
            }

            $existeEmail = User::findOne(['email' => $email]);
            if ($existeEmail) {
                Yii::$app->response->statusCode = 422;
                return ['error' => 'El email ya está registrado'];
            }

            // 1. Crear en tabla `user` (webvimark)
            $authKey      = Yii::$app->security->generateRandomString(32);
            $passwordHash = Yii::$app->security->generatePasswordHash($password);
            $now          = time();

            $db->createCommand()->insert('user', [
                'username'        => $username,
                'auth_key'        => $authKey,
                'password_hash'   => $passwordHash,
                'email'           => $email,
                'status'          => 1,
                'superadmin'      => 0,
                'email_confirmed' => 1,
                'created_at'      => $now,
                'updated_at'      => $now,
            ])->execute();

            $userId = $db->getLastInsertID();

            // 2. Crear en tabla `users` (perfil de Netview)
            $db->createCommand()->insert('users', [
                'user_id' => $userId,
            ])->execute();

            // 3. Asignar rol "cliente" en auth_assignment
            $db->createCommand()->insert('auth_assignment', [
                'item_name'  => 'cliente',
                'user_id'    => $userId,
                'created_at' => $now,
            ])->execute();

            // 4. Crear perfil principal automático
            $db->createCommand()->insert('profiles', [
                'user_id'      => $userId,
                'profile_name' => $username,
                'is_kids'      => 0,
            ])->execute();

            $tx->commit();

            return [
                'token'    => $authKey,
                'username' => $username,
                'nombre'   => $username,
                'rol'      => 'cliente',
                'es_admin' => false,
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
}
