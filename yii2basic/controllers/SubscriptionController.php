<?php
namespace app\controllers;
use app\models\Subscription;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class SubscriptionController extends ActiveController
{
    public $modelClass = 'app\models\Subscription';

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
        $query = Subscription::find();
        if ($text != '') {
            $query->where(['like', 'user_id', $text]);
        }
        return $query->count();
    }

    public function actionBuscar($text)
    {
        $provider = new ActiveDataProvider([
            'query' => Subscription::find()->where(['like', 'user_id', $text]),
            'pagination' => ['pageSize' => 20],
        ]);
        return $provider->getModels();
    }
}