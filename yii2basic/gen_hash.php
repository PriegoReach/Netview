<?php
// gen_hash.php - colócalo en la raíz de yii2basic (al lado de seed.php)
// Uso: docker exec -it netview_php bash -c "cd /var/www/html && php gen_hash.php"

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/vendor/yiisoft/yii2/Yii.php';

$config = require __DIR__ . '/config/console.php';
new yii\console\Application($config);

$passwordPlano = 'Test1234';
$nuevoHash = Yii::$app->security->generatePasswordHash($passwordPlano);

echo "Contraseña:   {$passwordPlano}\n";
echo "Hash generado: {$nuevoHash}\n\n";

// Actualizar los 3 usuarios
$updated = Yii::$app->db->createCommand()
    ->update('user',
        ['password_hash' => $nuevoHash],
        ['in', 'username', ['carlos_basico', 'sofia_estandar', 'miguel_premium']]
    )
    ->execute();

echo "Usuarios actualizados: {$updated}\n";
echo "Listo. Prueba el login con cualquiera de los 3 usuarios y la contraseña '{$passwordPlano}'.\n";
