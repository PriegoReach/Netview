<?php
namespace app\controllers;
use app\models\Language;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class LanguageController extends ActiveController
{
    public $modelClass = 'app\models\Language';

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

    public function actionTotal($text = '')
    {
        $query = Language::find();
        if ($text != '') {
            $query->where(['like', 'language_name', $text]);
        }
        return $query->count();
    }

    public function actionBuscar($text)
    {
        $provider = new ActiveDataProvider([
            'query' => Language::find()->where(['like', 'language_name', $text]),
            'pagination' => ['pageSize' => 20],
        ]);
        return $provider->getModels();
    }
}