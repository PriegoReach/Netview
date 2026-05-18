<?php

namespace app\controllers;

use Yii;
use app\models\Permiso;
use webvimark\modules\UserManagement\models\User;
use yii\filters\auth\CompositeAuth;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\Response;

class PermisoController extends ActiveController
{
    public $enableCsrfValidation = false;
    public $modelClass = 'app\models\Permiso';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        unset($behaviors['authenticator']);

        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::class,
            'cors' => [
                'Origin' => ['http://localhost:8100'],
                'Access-Control-Request-Method'    => ['GET'],
                'Access-Control-Request-Headers'   => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age'           => 600,
            ],
        ];

        $behaviors['authenticator'] = [
            'class'       => CompositeAuth::class,
            'authMethods' => [HttpBearerAuth::class],
            'except'      => ['lista-permisos'],
        ];

        return $behaviors;
    }

    /**
     * GET /permiso/lista-permisos?user=<token>
     * Devuelve la lista de vistas a las que el usuario tiene acceso.
     */
    public function actionListaPermisos($user = '')
    {
        Yii::$app->response->format = Response::FORMAT_JSON;

        $permitidas = [];

        if ($user === '') {
            return $permitidas;
        }

        $userModel = User::findOne(['auth_key' => $user]);

        if (!$userModel) {
            return $permitidas;
        }

        // Obtener roles del usuario desde auth_assignment
        $rolesUsuario = (new \yii\db\Query())
            ->select('item_name')
            ->from('auth_assignment')
            ->where(['user_id' => $userModel->id])
            ->column();

        // Si es superadmin, agrega Admin a sus roles
        if ($userModel->superadmin == 1 && !in_array('Admin', $rolesUsuario)) {
            $rolesUsuario[] = 'Admin';
        }

        // Recorrer todos los permisos definidos
        $permisos = Permiso::find()->all();

        foreach ($permisos as $p) {
            $rolesPermitidos = array_map('trim', explode(',', $p->per_rol));

            if (count(array_intersect($rolesUsuario, $rolesPermitidos)) > 0) {
                $permitidas[] = $p->per_vista;
            }
        }

        return $permitidas;
    }
}