<?php
namespace app\controllers;
use app\models\Season;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class SeasonController extends ActiveController
{
    public $modelClass = 'app\models\Season';

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
        $query = Season::find();
        if ($text != '') {
            $query->where(['like', 'season_number', $text]);
        }
        return $query->count();
    }

    public function actionBuscar($text)
    {
        $provider = new ActiveDataProvider([
            'query' => Season::find()->where(['like', 'season_number', $text]),
            'pagination' => ['pageSize' => 20],
        ]);
        return $provider->getModels();
    }
}