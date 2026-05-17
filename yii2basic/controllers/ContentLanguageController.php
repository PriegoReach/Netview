<?php
namespace app\controllers;
use app\models\ContentLanguage;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class ContentLanguageController extends ActiveController
{
    public $modelClass = 'app\models\ContentLanguage';

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
        unset($actions['delete']);
        return $actions;
    }

    public function actionTotal($text = '')
    {
        return ContentLanguage::find()->count();
    }

    public function actionBuscar($text)
    {
        $provider = new ActiveDataProvider([
            'query' => ContentLanguage::find()->where(['like', 'content_id', $text]),
            'pagination' => ['pageSize' => 20],
        ]);
        return $provider->getModels();
    }

    public function actionView($content_id = null, $language_id = null, $language_type = null)
    {
        return ContentLanguage::findOne([
            'content_id'    => $content_id,
            'language_id'   => $language_id,
            'language_type' => $language_type
        ]);
    }

    public function actionEliminar($content_id, $language_id, $language_type)
    {
        $model = ContentLanguage::findOne([
            'content_id'    => $content_id,
            'language_id'   => $language_id,
            'language_type' => $language_type
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