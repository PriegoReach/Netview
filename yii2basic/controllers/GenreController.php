<?php
namespace app\controllers;

use yii\web\NotFoundHttpException;
use app\models\Genre;
use yii\rest\ActiveController;
use yii\web\Response;

class GenreController extends ActiveController
{
    public $modelClass = 'app\models\Genre';
    
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['corsFilter'] = [
            'class' => \yii\filters\Cors::className(),
            'cors' => [
                'Origin' => ['http://localhost:8100'],
                'Access-Control-Request-Method'    => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
                'Access-Control-Request-Headers'   => ['*'],
                'Access-Control-Allow-Credentials' => true,
                'Access-Control-Max-Age'           => 600
            ]
        ];
        return $behaviors;
    }
    public function actionTotal()
    {
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    return Genre::find()->count();
    }
    public function actionBuscar($text)
    {
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    $generos = Genre::find()
        ->where(['like', 'genre_name', $text])
        ->all();
    return $generos;
    }

    public function actionEliminar($id)
    {
        $model = \app\models\Genre::findOne($id);
        if ($model) {
            $model->delete();
            \Yii::$app->response->statusCode = 200;
            return ['success' => true, 'message' => 'Género eliminado correctamente'];
        }
        \Yii::$app->response->statusCode = 404;
        return ['success' => false, 'message' => 'Género no encontrado'];
    }
}