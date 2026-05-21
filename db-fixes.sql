-- ============================================================
-- NETVIEW - Correcciones de datos previas a la entrega
-- Ejecutar en phpMyAdmin sobre la base de datos de NETVIEW.
-- Orden recomendado: revisar el SELECT de comprobacion antes y despues.
-- ============================================================

-- ------------------------------------------------------------
-- #4  Imagenes con http://localhost -> host de Azure
--     Cambia SOLO la linea de abajo por tu IP o dominio de Azure.
--     (Es el mismo cambio que hacia el `sed` del despliegue.)
-- ------------------------------------------------------------
SET @host_azure = 'http://20.62.100.70';


UPDATE `content`
SET `image_url` = REPLACE(`image_url`, 'http://localhost', @host_azure)
WHERE `image_url` LIKE 'http://localhost%';

-- Nota: las URLs de picsum.photos y filmaffinity (ids 13, 14, 21 segun el
-- informe) son externas/temporales y NO se tocan aqui. Si quieres que sean
-- fiables, sube esas imagenes a /imagenes/contenidos/ y actualizalas a mano.


-- ------------------------------------------------------------
-- #3  Rellenar campos NULL de "The Dark Knight"
--     Datos reales de la pelicula: estreno 2008, calificacion PG-13 (+13).
-- ------------------------------------------------------------
UPDATE `content`
SET `release_year`  = 2008,
    `clasificacion` = '+13'
WHERE `title` = 'The Dark Knight'
  AND (`release_year` IS NULL OR `clasificacion` IS NULL);


-- ------------------------------------------------------------
-- #2  Unificar el formato de clasificacion al sistema "+N"
--     Pasa "16" -> "+16", "14" -> "+14", y traduce G / PG.
--     (G y PG se mapean a un equivalente del sistema "+";
--      ajusta los valores si tu criterio es otro.)
-- ------------------------------------------------------------
-- 2a. Valores puramente numericos: anteponer el "+"
UPDATE `content`
SET `clasificacion` = CONCAT('+', `clasificacion`)
WHERE `clasificacion` REGEXP '^[0-9]+$';

-- 2b. Sistema americano -> equivalente "+"
UPDATE `content` SET `clasificacion` = '+0'  WHERE `clasificacion` = 'G';
UPDATE `content` SET `clasificacion` = '+7'  WHERE `clasificacion` = 'PG';
UPDATE `content` SET `clasificacion` = '+13' WHERE `clasificacion` IN ('PG-13', 'PG13');


-- ------------------------------------------------------------
-- #5  Limpiar la tabla de tracking user_visit_log
--     (la genera webvimark; NO se borra la tabla, solo sus filas)
-- ------------------------------------------------------------
DELETE FROM `user_visit_log`;
ALTER TABLE `user_visit_log` AUTO_INCREMENT = 1;


-- ============================================================
-- Comprobaciones (ejecutar para verificar el resultado)
-- ============================================================
-- SELECT content_id, title, release_year, clasificacion, image_url FROM `content`;
-- SELECT DISTINCT clasificacion FROM `content`;
-- SELECT COUNT(*) AS filas_tracking FROM `user_visit_log`;
