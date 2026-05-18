<?php
namespace app\controllers;
use app\models\WatchHistory;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class WatchHistoryController extends ActiveController
{
    public $modelClass = 'app\models\WatchHistory';

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
        return WatchHistory::find()->count();
    }

    public function actionBuscar($text)
    {
        $provider = new ActiveDataProvider([
            'query' => WatchHistory::find()->where(['like', 'profile_id', $text]),
            'pagination' => ['pageSize' => 20],
        ]);
        return $provider->getModels();
    }
}