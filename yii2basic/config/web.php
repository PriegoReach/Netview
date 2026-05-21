<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id'       => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'language' => 'es-ES',

    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],

    'modules' => [
        'user-management' => [
            'class' => 'webvimark\modules\UserManagement\UserManagementModule',

            'on beforeAction' => function (yii\base\ActionEvent $event) {

                if ($event->action->uniqueId === 'user-management/auth/login') {
                    $event->action->controller->layout = 'loginLayout.php';
                }
            },
        ],
    ],

    'components' => [

        'request' => [
            'cookieValidationKey' => 'uky0_bHNi6Q4Dx6ijSoQrlMkop7wdWw_',

            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ],
        ],

        'response' => [
            'format' => yii\web\Response::FORMAT_JSON,
            'charset' => 'UTF-8',

            'on beforeSend' => function ($event) {

                $response = $event->sender;

                $response->headers->set(
                    'Access-Control-Allow-Origin',
		    'http://localhost:8100'
                );

                $response->headers->set(
                    'Access-Control-Allow-Methods',
                    'GET, POST, PUT, DELETE, OPTIONS'
                );

                $response->headers->set(
                    'Access-Control-Allow-Headers',
                    'Content-Type, Authorization, X-Requested-With'
                );

                $response->headers->set(
                    'Access-Control-Allow-Credentials',
                    'true'
                );

                if (\Yii::$app->request->method === 'OPTIONS') {
                    $response->statusCode = 200;
                }
            },
        ],

        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],

        'user' => [
            'class'         => 'webvimark\modules\UserManagement\components\UserConfig',
            'enableSession' => true,   // sesión activa para el panel web; REST usa Bearer por request

            'on afterLogin' => function ($event) {
                \webvimark\modules\UserManagement\models\UserVisitLog::newVisitor(
                    $event->identity->id
                );
            }
        ],

        'errorHandler' => [
            'errorAction' => 'site/error',
        ],

        'mailer' => [
            'class' => \yii\symfonymailer\Mailer::class,
            'viewPath' => '@app/mail',
            'useFileTransport' => true,
        ],

        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,

            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],

        'db' => $db,

        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,

            'rules' => [

                // =========================================================
                // NETVIEW — Endpoints para app Ionic
                // =========================================================

                // Tab 1 & 2 — Contenidos (públicos)
                'GET contenidos/destacado'   => 'contenido/destacado',
                'GET contenidos/categorias'  => 'contenido/categorias',
                'GET contenidos/buscar'      => 'contenido/buscar',
                'GET contenidos/total'       => 'contenido/total',
                [
                    'class'   => 'yii\web\UrlRule',
                    'pattern' => 'contenidos/buscar/<text:.*>',
                    'route'   => 'contenido/buscar',
                    'verb'    => ['GET'],
                ],
                [
                    'class'   => 'yii\web\UrlRule',
                    'pattern' => 'contenidos/total/<text:.*>',
                    'route'   => 'contenido/total',
                    'verb'    => ['GET'],
                ],
                'GET contenidos/<id:\d+>' => 'contenido/view',

                // Tab 3 — Usuario (requiere Bearer token)
                'GET usuario/perfil'            => 'usuario/perfil',
                'GET usuario/continuar-viendo'  => 'usuario/continuar-viendo',

                // =========================================================
                // GENRE
                // =========================================================

                'GET genre/total' => 'genre/total',
                'PUT genre/<id:\d+>' => 'genre/update',
                'GET genre/buscar/<text:.*>' => 'genre/buscar',
                'genre/eliminar/<id:\d+>' => 'genre/eliminar',

                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'genre',
                    'pluralize' => false,
                    'only' => ['index', 'create', 'view', 'update', 'delete']
                ],

                // =========================
                // CONTENT GENRE
                // =========================

                // Content Genre
                    'DELETE content-genre/eliminar/<content_id:\d+>/<genre_id:\d+>' => 'content-genre/eliminar',
                    'GET content-genre/buscar/<content_id:\d+>/<genre_id:\d+>' => 'content-genre/view',
                    'GET content-genre/buscar/<text:.*>' => 'content-genre/buscar',
                    ['class' => 'yii\web\UrlRule', 'pattern' => 'content-genre/total/<text:.*>', 'route' => 'content-genre/total'],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'content-genre',
                    'pluralize' => false,
                    'only' => ['index', 'create'],
                ],
                        // =========================
                        // CONTENT
                        // =========================

                [
                    'class' => 'yii\web\UrlRule',
                    'pattern' => 'content/buscar/<text:.*>',
                    'route' => 'content/buscar'
                ],
                [
                    'class' => 'yii\web\UrlRule',
                    'pattern' => 'content/total/<text:.*>',
                    'route' => 'content/total'
                ],
                // Endpoint para subir imagen de contenido
                ['class' => 'yii\web\UrlRule', 'pattern' => 'content/subir-imagen/<id:\d+>', 'route' => 'content/subir-imagen', 'verb' => 'POST'],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'content',
                    'pluralize' => false,
                ],
                
                // Episode
                ['class' => 'yii\web\UrlRule', 'pattern' => 'episode/buscar/<text:.*>', 'route' => 'episode/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'episode/total/<text:.*>', 'route' => 'episode/total'],

                // Season
                ['class' => 'yii\web\UrlRule', 'pattern' => 'season/buscar/<text:.*>', 'route' => 'season/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'season/total/<text:.*>', 'route' => 'season/total'],

                // Profile
                ['class' => 'yii\web\UrlRule', 'pattern' => 'profile/buscar/<text:.*>', 'route' => 'profile/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'profile/total/<text:.*>', 'route' => 'profile/total'],

                // Subscription Plan
                ['class' => 'yii\web\UrlRule', 'pattern' => 'subscription-plan/buscar/<text:.*>', 'route' => 'subscription-plan/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'subscription-plan/total/<text:.*>', 'route' => 'subscription-plan/total'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'subscription/buscar/<text:.*>', 'route' => 'subscription/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'subscription/total/<text:.*>', 'route' => 'subscription/total'],
                // =========================
                // REST CONTROLLERS
                // =========================
                ['class' => 'yii\rest\UrlRule', 'controller' => 'permiso',            'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'watch-history',      'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'user',               'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'subscription-plan',  'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'subscription',       'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'season',             'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'rating',             'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'profile',            'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'language',           'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'episode',            'pluralize' => false],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'content-language',   'pluralize' => false],
            
                // Language

                ['class' => 'yii\web\UrlRule', 'pattern' => 'language/buscar/<text:.*>', 'route' => 'language/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'language/total/<text:.*>', 'route' => 'language/total'],
                // Favorite
                ['class' => 'yii\web\UrlRule', 'pattern' => 'favorite/<profile_id:\d+>/<content_id:\d+>', 'route' => 'favorite/view', 'verb' => ['GET']],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'favorite/<profile_id:\d+>/<content_id:\d+>', 'route' => 'favorite/eliminar', 'verb' => ['DELETE']],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'favorite/buscar/<text:.*>', 'route' => 'favorite/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'favorite/total/<text:.*>', 'route' => 'favorite/total'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'favorite/total/<text:.*>', 'route' => 'favorite/total'],
                [
                    'class'      => 'yii\rest\UrlRule',
                    'controller' => 'favorite',
                    'pluralize'  => false,
                    'only'       => ['index', 'create'],
                ],

                // Auth
                ['class' => 'yii\web\UrlRule', 'pattern' => 'auth/login', 'route' => 'auth/login', 'verb' => 'POST'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'auth/registrar', 'route' => 'auth/registrar', 'verb' => 'POST'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'usuario/perfil', 'route' => 'usuario/actualizar-perfil', 'verb' => 'PUT'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'usuario/subir-avatar', 'route' => 'usuario/subir-avatar', 'verb' => 'POST'],

                // Rating
                ['class' => 'yii\web\UrlRule', 'pattern' => 'rating/buscar/<text:.*>', 'route' => 'rating/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'rating/total/<text:.*>', 'route' => 'rating/total'],
                // watch history
                ['class' => 'yii\web\UrlRule', 'pattern' => 'watch-history/buscar/<text:.*>', 'route' => 'watch-history/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'watch-history/total/<text:.*>', 'route' => 'watch-history/total'],
                // Content Language
                ['class' => 'yii\web\UrlRule', 'pattern' => 'content-language/<content_id:\d+>/<language_id:\d+>/<language_type:\w+>', 'route' => 'content-language/view', 'verb' => ['GET']],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'content-language/<content_id:\d+>/<language_id:\d+>/<language_type:\w+>', 'route' => 'content-language/eliminar', 'verb' => ['DELETE']],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'content-language/buscar/<text:.*>', 'route' => 'content-language/buscar'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'content-language/total/<text:.*>', 'route' => 'content-language/total'],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'content-language',
                    'pluralize' => false,
                    'only' => ['index', 'create'],
                ],
                // Permiso
                ['class' => 'yii\web\UrlRule', 'pattern' => 'permiso/lista-permisos', 'route' => 'permiso/lista-permisos'],
                // Usuario Favoritos
                ['class' => 'yii\web\UrlRule', 'pattern' => 'usuario/favoritos',                'route' => 'usuario/favoritos',        'verb' => 'GET'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'usuario/favoritos',                'route' => 'usuario/agregar-favorito', 'verb' => 'POST'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'usuario/favoritos/<content_id:\d+>', 'route' => 'usuario/quitar-favorito',  'verb' => 'DELETE'],

                // Usuario Rating e Historial (cliente)
                ['class' => 'yii\web\UrlRule', 'pattern' => 'usuario/calificar',                    'route' => 'usuario/calificar',           'verb' => 'POST'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'usuario/calificacion/<content_id:\d+>', 'route' => 'usuario/mi-calificacion',     'verb' => 'GET'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'usuario/historial',                    'route' => 'usuario/registrar-historial', 'verb' => 'POST'],
                ['class' => 'yii\web\UrlRule', 'pattern' => 'usuario/historial/<content_id:\d+>',   'route' => 'usuario/mi-historial',        'verb' => 'GET'],
            ],
        ],
    ],

    'params' => $params,
];

if (YII_ENV_DEV) {

    $config['bootstrap'][] = 'debug';

    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
    ];

    $config['bootstrap'][] = 'gii';

    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
    ];
}

return $config;
