<?php

namespace app\controllers;

use app\models\Content;
use Yii;
use yii\data\ActiveDataProvider;
use yii\rest\ActiveController;

class ContentController extends ActiveController
{
    public $modelClass = 'app\models\Content';

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

    public function actionBuscar($text)
    {
        $consulta = Content::find()->where([
            'like', 'title', $text
        ]);
        $provider = new ActiveDataProvider([
            'query' => $consulta,
            'pagination' => ['pageSize' => 20],
        ]);
        return $provider->getModels();
    }

    public function actionTotal($text = '')
    {
        $total = Content::find();
        if ($text != '') {
            $total = $total->where(['like', 'title', $text]);
        }
        return $total->count();
    }

    public function actionSubirImagen($id)
{
    \Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
 
    try {
        $model = \app\models\Content::findOne(['content_id' => $id]);
        if (!$model) {
            Yii::$app->response->statusCode = 404;
            return ['success' => false, 'message' => 'Contenido no encontrado'];
        }
 
        // El campo del FormData debe llamarse "imagen"
        $archivo = \yii\web\UploadedFile::getInstanceByName('imagen');
        if (!$archivo) {
            Yii::$app->response->statusCode = 400;
            return ['success' => false, 'message' => 'No se recibió ningún archivo'];
        }

        if ($archivo->error !== UPLOAD_ERR_OK) {
            Yii::$app->response->statusCode = 400;
            $mensajesError = [
                UPLOAD_ERR_INI_SIZE   => 'El archivo excede el límite del servidor. Máximo permitido: 10MB.',
                UPLOAD_ERR_FORM_SIZE  => 'El archivo excede el límite del formulario.',
                UPLOAD_ERR_PARTIAL    => 'El archivo se subió de forma incompleta.',
                UPLOAD_ERR_NO_FILE    => 'No se seleccionó ningún archivo.',
                UPLOAD_ERR_NO_TMP_DIR => 'Error de configuración: falta directorio temporal.',
                UPLOAD_ERR_CANT_WRITE => 'Error de escritura en el servidor.',
                UPLOAD_ERR_EXTENSION  => 'Una extensión de PHP bloqueó la subida.',
            ];
            return ['success' => false, 'message' => $mensajesError[$archivo->error] ?? 'Error desconocido al subir el archivo.'];
        }

        // Validar extensión
        $extensionesPermitidas = ['png', 'jpg', 'jpeg', 'webp'];
        if (!in_array(strtolower($archivo->extension), $extensionesPermitidas)) {
            Yii::$app->response->statusCode = 422;
            return ['success' => false, 'message' => 'Formato no permitido. Usa PNG, JPG o WEBP.'];
        }
 
        // Validar tamaño (10MB máx)
        if ($archivo->size > 10 * 1024 * 1024) {
            Yii::$app->response->statusCode = 422;
            return ['success' => false, 'message' => 'La imagen excede 10MB.'];
        }
 
        // Crear carpeta destino si no existe
        $carpeta = \Yii::getAlias('@app/web/imagenes/contenidos/');
        if (!is_dir($carpeta)) {
            mkdir($carpeta, 0777, true);
        }
 
        // Nombre único: contenido_{id}_{timestamp}.{ext}
        $nombreArchivo = 'contenido_' . $model->content_id . '_' . time() . '.' . $archivo->extension;
        $rutaCompleta  = $carpeta . $nombreArchivo;
 
        if (!$archivo->saveAs($rutaCompleta)) {
            Yii::$app->response->statusCode = 500;
            return ['success' => false, 'message' => 'No se pudo guardar el archivo'];
        }
 
        // Construir URL pública absoluta para que el frontend la use directamente
        $baseUrl = \Yii::$app->request->hostInfo;
        $urlPublica = $baseUrl . '/imagenes/contenidos/' . $nombreArchivo;
 
        // Actualizar el campo image_url del contenido
        $model->image_url = $urlPublica;
        if (!$model->save(false)) {
            Yii::$app->response->statusCode = 500;
            return [
                'success' => false,
                'message' => 'Archivo guardado pero no se actualizó la BD',
            ];
        }
 
        return [
            'success'   => true,
            'message'   => 'Imagen subida correctamente',
            'image_url' => $urlPublica,
            'archivo'   => $nombreArchivo,
        ];
 
    } catch (\Throwable $e) {
        \Yii::$app->response->statusCode = 500;
        return [
            'success' => false,
            'message' => $e->getMessage(),
        ];
    }
}
}