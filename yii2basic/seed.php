<?php
/**
 * seed.php — Datos de prueba para Netview
 * Uso: php yii2basic/seed.php
 *      (desde la raíz del proyecto, donde está docker-compose.yml)
 *
 * O desde dentro de yii2basic/:
 *      php seed.php
 */

defined('YII_DEBUG') or define('YII_DEBUG', true);
defined('YII_ENV')   or define('YII_ENV', 'dev');

// Bootstrap Yii2
$yiiDir = __DIR__;
require $yiiDir . '/vendor/autoload.php';
require $yiiDir . '/vendor/yiisoft/yii2/Yii.php';

$config = require __DIR__ . '/config/console.php';
// En CLI no hay request/response web completos; eliminamos lo que rompe
unset($config['components']['request']['cookieValidationKey']);
(new yii\console\Application($config))->run(); 

$db = Yii::$app->db;

echo "=== Netview Seed ===\n\n";

// ================================================================
//  1. USUARIOS DE PRUEBA (tabla webvimark `user`)
//     Contraseña en claro: Test1234  (hash bcrypt)
// ================================================================
echo "[ 1/6 ] Insertando usuarios...\n";

$passwordHash = '$2y$13$MhlYe12xkGFnSeK0sO2up.Y9kAD9Ct6JS1i9VLP7YAqd1dFsSylz2'; // "admin"

$users = [
    [
        'username'     => 'carlos_basico',
        'auth_key'     => 'token_carlos_basico_12345678901',
        'password_hash' => $passwordHash,
        'email'        => 'carlos@netview.test',
        'status'       => 1,
        'superadmin'   => 0,
        'created_at'   => time(),
        'updated_at'   => time(),
    ],
    [
        'username'     => 'sofia_estandar',
        'auth_key'     => 'token_sofia_estandar_123456789',
        'password_hash' => $passwordHash,
        'email'        => 'sofia@netview.test',
        'status'       => 1,
        'superadmin'   => 0,
        'created_at'   => time(),
        'updated_at'   => time(),
    ],
    [
        'username'     => 'miguel_premium',
        'auth_key'     => 'token_miguel_premium_12345678901',
        'password_hash' => $passwordHash,
        'email'        => 'miguel@netview.test',
        'status'       => 1,
        'superadmin'   => 0,
        'created_at'   => time(),
        'updated_at'   => time(),
    ],
];

$userIds = [];
foreach ($users as $u) {
    // Evitar duplicados
    $existing = $db->createCommand('SELECT id FROM `user` WHERE username = :u', [':u' => $u['username']])->queryScalar();
    if ($existing) {
        $userIds[] = (int) $existing;
        echo "   (usuario '{$u['username']}' ya existe, id=$existing)\n";
        continue;
    }
    $db->createCommand()->insert('user', $u)->execute();
    $id = (int) $db->getLastInsertID();
    $userIds[] = $id;
    echo "   Creado usuario '{$u['username']}' id=$id\n";
}

// ================================================================
//  2. USUARIOS NETVIEW (tabla `users`)
// ================================================================
echo "[ 2/6 ] Creando entradas en tabla `users`...\n";

foreach ($userIds as $uid) {
    $exists = $db->createCommand('SELECT user_id FROM `users` WHERE user_id = :id', [':id' => $uid])->queryScalar();
    if (!$exists) {
        $db->createCommand()->insert('users', ['user_id' => $uid])->execute();
    }
}

// ================================================================
//  3. SUSCRIPCIONES
// ================================================================
echo "[ 3/6 ] Creando suscripciones...\n";

$planMap = [0 => 1, 1 => 2, 2 => 3]; // carlos=Básico, sofia=Estándar, miguel=Premium
foreach ($userIds as $i => $uid) {
    $exists = $db->createCommand('SELECT subscription_id FROM subscriptions WHERE user_id = :uid LIMIT 1', [':uid' => $uid])->queryScalar();
    if (!$exists) {
        $db->createCommand()->insert('subscriptions', [
            'user_id'    => $uid,
            'plan_id'    => $planMap[$i] ?? 1,
            'start_date' => date('Y-m-d', strtotime('-30 days')),
            'end_date'   => date('Y-m-d', strtotime('+335 days')),
        ])->execute();
    }
}

// ================================================================
//  4. PERFILES
// ================================================================
echo "[ 4/6 ] Creando perfiles...\n";

$profileIds = [];
$profileNames = ['Carlos', 'Sofía', 'Miguel'];
foreach ($userIds as $i => $uid) {
    $pid = $db->createCommand('SELECT profile_id FROM profiles WHERE user_id = :uid LIMIT 1', [':uid' => $uid])->queryScalar();
    if (!$pid) {
        $db->createCommand()->insert('profiles', [
            'user_id'      => $uid,
            'profile_name' => $profileNames[$i] ?? 'Usuario',
            'is_kids'      => 0,
        ])->execute();
        $pid = (int) $db->getLastInsertID();
    }
    $profileIds[$uid] = (int) $pid;
}

// ================================================================
//  5. CONTENIDOS (15 títulos: 10 películas + 5 series)
// ================================================================
echo "[ 5/6 ] Insertando contenidos...\n";

$contentsData = [
    // Películas
    ['El origen',                    'Un ladrón experto en el arte del robo dentro de los sueños.',                          'https://picsum.photos/seed/c1/400/600',  2010, '+13', 'Movie',  148, [1,5]],
    ['La Matrix',                    'Un hacker descubre que la realidad es una simulación.',                                 'https://picsum.photos/seed/c2/400/600',  1999, '+13', 'Movie',  136, [1,5]],
    ['Toy Story',                    'Juguetes que cobran vida cuando los humanos no los miran.',                             'https://picsum.photos/seed/c3/400/600',  1995, 'G',   'Movie',   81, [6,3]],
    ['Titanic',                      'Un amor imposible a bordo del barco más famoso de la historia.',                       'https://picsum.photos/seed/c4/400/600',  1997, '+13', 'Movie',  195, [2,8]],
    ['El padrino',                   'La saga de la familia mafiosa Corleone.',                                              'https://picsum.photos/seed/c5/400/600',  1972, '+18', 'Movie',  175, [2,1]],
    ['Parásitos',                    'Una familia pobre se infiltra en la vida de una familia adinerada.',                   'https://picsum.photos/seed/c6/400/600',  2019, '+15', 'Movie',  132, [2,3]],
    ['Interstellar',                 'Astronautas viajan a través de un agujero de gusano en busca de un nuevo hogar.',      'https://picsum.photos/seed/c7/400/600',  2014, '+13', 'Movie',  169, [5,2]],
    ['El conjuro',                   'Una pareja de investigadores paranormales ayuda a una familia aterrorizada.',          'https://picsum.photos/seed/c8/400/600',  2013, '+15', 'Movie',  112, [4]],
    ['Shrek',                        'Un ogro gruñón emprende una aventura para rescatar a una princesa.',                   'https://picsum.photos/seed/c9/400/600',  2001, 'PG',  'Movie',   90, [6,3]],
    ['Dune',                         'El hijo de una familia noble es elegido para liderar a un pueblo desierto.',           'https://picsum.photos/seed/c10/400/600', 2021, '+13', 'Movie',  155, [5,1]],
    // Series
    ['Breaking Bad',                 'Un profesor de química se convierte en fabricante de metanfetamina.',                 'https://picsum.photos/seed/c11/400/600', 2008, '+18', 'Series',  47, [2,3]],
    ['Stranger Things',              'Un grupo de niños investiga fenómenos sobrenaturales en su ciudad.',                  'https://picsum.photos/seed/c12/400/600', 2016, '+13', 'Series',  51, [5,4]],
    ['La Casa de Papel',             'Un misterioso cerebro planea el mayor robo de la historia de España.',                'https://picsum.photos/seed/c13/400/600', 2017, '+16', 'Series',  70, [1,2]],
    ['Dark',                         'Las desapariciones de niños en un pequeño pueblo revelan misterios sobre el tiempo.', 'https://picsum.photos/seed/c14/400/600', 2017, '+16', 'Series',  60, [5,2,4]],
    ['Avatar: La leyenda de Aang',   'Un joven maestro de los cuatro elementos debe salvar al mundo.',                     'https://picsum.photos/seed/c15/400/600', 2005, 'G',   'Series',  23, [1,6,5]],
];

$contentIds = [];
foreach ($contentsData as $c) {
    [$title, $desc, $img, $year, $clasif, $type, $dur, $genres] = $c;

    $existing = $db->createCommand('SELECT content_id FROM content WHERE title = :t', [':t' => $title])->queryScalar();
    if ($existing) {
        $contentIds[] = (int) $existing;
        echo "   (contenido '$title' ya existe)\n";
        continue;
    }

    $db->createCommand()->insert('content', [
        'title'            => $title,
        'description'      => $desc,
        'image_url'        => $img,
        'release_year'     => $year,
        'clasificacion'    => $clasif,
        'content_type'     => $type,
        'duration_minutes' => $dur,
    ])->execute();
    $cid = (int) $db->getLastInsertID();
    $contentIds[] = $cid;
    echo "   Contenido '$title' id=$cid\n";

    // Géneros
    foreach ($genres as $gid) {
        $gExists = $db->createCommand('SELECT 1 FROM content_genres WHERE content_id = :c AND genre_id = :g', [':c' => $cid, ':g' => $gid])->queryScalar();
        if (!$gExists) {
            $db->createCommand()->insert('content_genres', ['content_id' => $cid, 'genre_id' => $gid])->execute();
        }
    }
}

// ================================================================
//  5b. TEMPORADAS Y EPISODIOS para las 5 series (índices 10-14)
// ================================================================
echo "     Creando temporadas y episodios...\n";

$seriesStructure = [
    // [seasons => [[num, episodes_count, ep_duration], ...]]
    10 => ['seasons' => [[1, 7, 47], [2, 13, 47], [3, 13, 47]]],
    11 => ['seasons' => [[1, 8, 51], [2, 9, 55], [3, 8, 52]]],
    12 => ['seasons' => [[1, 9, 70], [2, 16, 68], [3, 8, 71]]],
    13 => ['seasons' => [[1, 8, 60], [2, 8, 62], [3, 8, 58]]],
    14 => ['seasons' => [[1, 20, 23], [2, 20, 23], [3, 21, 23]]],
];

foreach ($seriesStructure as $idx => $def) {
    if (!isset($contentIds[$idx])) {
        continue;
    }
    $cid = $contentIds[$idx];
    foreach ($def['seasons'] as [$sNum, $epCount, $epDur]) {
        $sid = $db->createCommand('SELECT season_id FROM seasons WHERE content_id = :c AND season_number = :s', [':c' => $cid, ':s' => $sNum])->queryScalar();
        if (!$sid) {
            $db->createCommand()->insert('seasons', ['content_id' => $cid, 'season_number' => $sNum])->execute();
            $sid = (int) $db->getLastInsertID();
        }
        for ($e = 1; $e <= $epCount; $e++) {
            $epExists = $db->createCommand('SELECT 1 FROM episodes WHERE season_id = :s AND episode_number = :e', [':s' => $sid, ':e' => $e])->queryScalar();
            if (!$epExists) {
                $db->createCommand()->insert('episodes', [
                    'season_id'        => $sid,
                    'episode_number'   => $e,
                    'duration_minutes' => $epDur,
                ])->execute();
            }
        }
    }
}

// ================================================================
//  6. HISTORIAL DE VISUALIZACIÓN + RATINGS (para miguel_premium)
// ================================================================
echo "[ 6/6 ] Creando historial y ratings...\n";

// Usamos el perfil del tercer usuario (miguel_premium)
$miguelUserId  = $userIds[2] ?? null;
$miguelProfile = $miguelUserId ? ($profileIds[$miguelUserId] ?? null) : null;

if ($miguelProfile && !empty($contentIds)) {
    // Historial: 8 contenidos vistos con distintos progresos
    $watchData = [
        [$contentIds[0],  3600],  // El origen  — 3600 s vistos
        [$contentIds[1],  5000],  // La Matrix
        [$contentIds[3],  8000],  // Titanic
        [$contentIds[6],  7200],  // Interstellar
        [$contentIds[10], 1800],  // Breaking Bad
        [$contentIds[11], 2400],  // Stranger Things
        [$contentIds[12], 3000],  // La Casa de Papel
        [$contentIds[9],  4000],  // Dune
    ];
    foreach ($watchData as [$cid, $secs]) {
        $exists = $db->createCommand('SELECT 1 FROM watch_history WHERE profile_id = :p AND content_id = :c', [':p' => $miguelProfile, ':c' => $cid])->queryScalar();
        if (!$exists) {
            $db->createCommand()->insert('watch_history', [
                'profile_id'      => $miguelProfile,
                'content_id'      => $cid,
                'episode_id'      => null,
                'watched_seconds' => $secs,
            ])->execute();
        }
    }

    // Ratings: puntajes para 10 contenidos
    $ratingsData = [
        [$contentIds[0],  5], [$contentIds[1], 5], [$contentIds[2], 4],
        [$contentIds[3],  4], [$contentIds[4], 5], [$contentIds[5], 5],
        [$contentIds[6],  5], [$contentIds[7], 3], [$contentIds[8], 4],
        [$contentIds[10], 5],
    ];
    foreach ($ratingsData as [$cid, $score]) {
        $exists = $db->createCommand('SELECT 1 FROM ratings WHERE profile_id = :p AND content_id = :c', [':p' => $miguelProfile, ':c' => $cid])->queryScalar();
        if (!$exists) {
            $db->createCommand()->insert('ratings', [
                'profile_id' => $miguelProfile,
                'content_id' => $cid,
                'score'      => $score,
            ])->execute();
        }
    }
    echo "   Historial y ratings insertados para miguel_premium (perfil id=$miguelProfile)\n";
}

echo "\n=== Seed completado ===\n";
echo "\nTokens Bearer de prueba:\n";
echo "  carlos_basico   -> token_carlos_basico_12345678901\n";
echo "  sofia_estandar  -> token_sofia_estandar_123456789\n";
echo "  miguel_premium  -> token_miguel_premium_12345678901\n";
