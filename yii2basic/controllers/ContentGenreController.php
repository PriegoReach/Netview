<?php
namespace app\controllers;

use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;
use app\models\ContentGenre;

class ContentGenreController extends ActiveController
{
    public $modelClass = 'app\models\ContentGenre';
    
    public function behaviors()
{
    $behaviors = parent::behaviors();
    unset($behaviors['authenticator']);
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

    public function actionDetalle($id)
    {
        $model = ContentGenre::findOne(['content_id' => $id]);
        if ($model === null) {
            throw new NotFoundHttpException("No encontrado");
        }
        return $model;
    }

    public function actionBuscar($id, $genre_id = null)
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    if ($genre_id !== null) {
        $model = ContentGenre::findOne(['content_id' => $id, 'genre_id' => $genre_id]);
    } else {
        $model = ContentGenre::findOne(['content_id' => $id]);
    }
    if ($model === null) {
        throw new \yii\web\NotFoundHttpException("No encontrado");
    }
    return $model;
}
    public function actionActualizar($id)
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
    $model = ContentGenre::findOne(['content_id' => $id]);
    if ($model === null) {
        throw new \yii\web\NotFoundHttpException("No encontrado");
    }
    $model->load(\Yii::$app->request->getBodyParams(), '');
    if ($model->save()) {
        return $model;
    }
    return $model->errors;
}
    
public function actionTotal($text = '')
{
    $query = \app\models\ContentGenre::find();
    if ($text != '') {
        $query->where(['like', 'content_id', $text]);
    }
    return $query->count();
}
public function actions()
{
    $actions = parent::actions();
    unset($actions['view']);
    unset($actions['delete']);
    return $actions;
}

public function actionView($content_id = null, $genre_id = null)
{
    return \app\models\ContentGenre::findOne([
        'content_id' => $content_id,
        'genre_id'   => $genre_id
    ]);
}

public function actionEliminar($content_id, $genre_id)
{
    $model = \app\models\ContentGenre::findOne([
        'content_id' => $content_id,
        'genre_id'   => $genre_id
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
