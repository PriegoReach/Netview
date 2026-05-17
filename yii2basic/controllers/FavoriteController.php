<?php
namespace app\controllers;
use app\models\Favorite;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class FavoriteController extends ActiveController
{
    public $modelClass = 'app\models\Favorite';

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['http://localhost:8100'],
                'Access-Control-Request-Method'    => ['GET', 'POST', 'PUT', 'DELETE'],
                'Access-Control-Request-Headers'   => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age'           => 600
            ]
        ];
        return $behaviors;
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['view']);
        return $actions;
    }

    public function actionTotal($text = '')
    {
        return Favorite::find()->count();
    }

    public function actionBuscar($text)
    {
        $provider = new ActiveDataProvider([
            'query' => Favorite::find()->where(['like', 'profile_id', $text]),
            'pagination' => ['pageSize' => 20],
        ]);
        return $provider->getModels();
    }
    public function actionView($profile_id = null, $content_id = null, $id = null)
{
    return Favorite::findOne([
        'profile_id' => $profile_id,
        'content_id' => $content_id
    ]);
}

    public function actionEliminar($profile_id, $content_id)
{
    $model = Favorite::findOne([
        'profile_id' => $profile_id,
        'content_id' => $content_id
    ]);
    if ($model) {
        $model->delete();
        \Yii::$app->response->statusCode = 204;
        return null;
    }
    \Yii::$app->response->statusCode = 404;
    return ['message' => 'No encontrado'];
}
 }
