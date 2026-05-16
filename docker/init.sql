-- ============================================================
--  Netview - Base de datos completa
--  Incluye: webvimark (autenticación), permiso (guards), 
--           y tablas propias del proyecto
--  Para usar con Docker (init.sql)
-- ============================================================

SET FOREIGN_KEY_CHECKS=0;
SET NAMES utf8;

-- ============================================================
--  1. WEBVIMARK - Sistema de autenticación y roles
--     (Requerido por el módulo UserManagement de Yii2)
-- ============================================================

-- ----------------------------
-- auth_rule
-- ----------------------------
DROP TABLE IF EXISTS `auth_rule`;
CREATE TABLE `auth_rule` (
  `name`       varchar(64) NOT NULL,
  `data`       text         DEFAULT NULL,
  `created_at` int(11)      DEFAULT NULL,
  `updated_at` int(11)      DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- auth_item_group
-- ----------------------------
DROP TABLE IF EXISTS `auth_item_group`;
CREATE TABLE `auth_item_group` (
  `code`       varchar(64)  NOT NULL,
  `name`       varchar(255) NOT NULL,
  `created_at` int(11)      DEFAULT NULL,
  `updated_at` int(11)      DEFAULT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `auth_item_group` VALUES ('userCommonPermissions', 'User common permission', '1426062189', '1426062189');
INSERT INTO `auth_item_group` VALUES ('userManagement',        'User management',        '1426062189', '1426062189');

-- ----------------------------
-- auth_item
-- ----------------------------
DROP TABLE IF EXISTS `auth_item`;
CREATE TABLE `auth_item` (
  `name`       varchar(64) NOT NULL,
  `type`       int(11)     NOT NULL,
  `description` text       DEFAULT NULL,
  `rule_name`  varchar(64) DEFAULT NULL,
  `data`       text        DEFAULT NULL,
  `created_at` int(11)     DEFAULT NULL,
  `updated_at` int(11)     DEFAULT NULL,
  `group_code` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `rule_name`           (`rule_name`),
  KEY `idx-auth_item-type`  (`type`),
  KEY `fk_auth_item_group_code` (`group_code`),
  CONSTRAINT `auth_item_ibfk_1` FOREIGN KEY (`rule_name`)  REFERENCES `auth_rule`       (`name`)  ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `auth_item_ibfk_2` FOREIGN KEY (`group_code`) REFERENCES `auth_item_group` (`code`)  ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `auth_item` VALUES ('Admin',                  '1', 'Admin',                   null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('cliente',                '1', 'Cliente',                 null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('assignRolesToUsers',     '2', 'Assign roles to users',   null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('bindUserToIp',           '2', 'Bind user to IP',         null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('changeOwnPassword',      '2', 'Change own password',     null, null, '1426062189', '1426062189', 'userCommonPermissions');
INSERT INTO `auth_item` VALUES ('changeUserPassword',     '2', 'Change user password',    null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('commonPermission',       '2', 'Common permission',       null, null, '1426062188', '1426062188', null);
INSERT INTO `auth_item` VALUES ('createUsers',            '2', 'Create users',            null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('deleteUsers',            '2', 'Delete users',            null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('editUserEmail',          '2', 'Edit user email',         null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('editUsers',              '2', 'Edit users',              null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('viewRegistrationIp',     '2', 'View registration IP',    null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('viewUserEmail',          '2', 'View user email',         null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('viewUserRoles',          '2', 'View user roles',         null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('viewUsers',              '2', 'View users',              null, null, '1426062189', '1426062189', 'userManagement');
INSERT INTO `auth_item` VALUES ('viewVisitLog',           '2', 'View visit log',          null, null, '1426062189', '1426062189', 'userManagement');
-- Rutas webvimark (necesarias para el módulo UserManagement)
INSERT INTO `auth_item` VALUES ('/*',                                              '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/*',                              '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/auth/*',                         '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/auth/login',                     '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/auth/logout',                    '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/auth/change-own-password',       '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/auth/registration',              '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/*',                         '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/index',                     '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/view',                      '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/create',                    '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/update',                    '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/delete',                    '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/bulk-activate',             '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/bulk-deactivate',           '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/bulk-delete',               '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/change-password',           '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/grid-page-size',            '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/grid-sort',                 '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user/toggle-attribute',          '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user-permission/*',              '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user-permission/set',            '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user-permission/set-roles',      '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user-visit-log/*',               '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user-visit-log/index',           '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user-visit-log/view',            '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/user-visit-log/grid-page-size',  '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/role/*',                         '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/role/index',                     '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/role/create',                    '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/role/update',                    '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/role/delete',                    '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/permission/*',                   '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/user-management/permission/index',               '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/site/*',                                         '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/site/index',                                     '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/site/login',                                     '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/site/logout',                                    '3', null, null, null, '1426062189', '1426062189', null);
INSERT INTO `auth_item` VALUES ('/site/error',                                     '3', null, null, null, '1426062189', '1426062189', null);

-- ----------------------------
-- auth_item_child
-- ----------------------------
DROP TABLE IF EXISTS `auth_item_child`;
CREATE TABLE `auth_item_child` (
  `parent` varchar(64) NOT NULL,
  `child`  varchar(64) NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`),
  CONSTRAINT `auth_item_child_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auth_item_child_ibfk_2` FOREIGN KEY (`child`)  REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `auth_item_child` VALUES ('Admin', 'assignRolesToUsers');
INSERT INTO `auth_item_child` VALUES ('Admin', 'changeOwnPassword');
INSERT INTO `auth_item_child` VALUES ('Admin', 'changeUserPassword');
INSERT INTO `auth_item_child` VALUES ('Admin', 'createUsers');
INSERT INTO `auth_item_child` VALUES ('Admin', 'deleteUsers');
INSERT INTO `auth_item_child` VALUES ('Admin', 'editUsers');
INSERT INTO `auth_item_child` VALUES ('Admin', 'viewUsers');
INSERT INTO `auth_item_child` VALUES ('assignRolesToUsers', '/user-management/user-permission/set');
INSERT INTO `auth_item_child` VALUES ('assignRolesToUsers', '/user-management/user-permission/set-roles');
INSERT INTO `auth_item_child` VALUES ('assignRolesToUsers', 'viewUserRoles');
INSERT INTO `auth_item_child` VALUES ('assignRolesToUsers', 'viewUsers');
INSERT INTO `auth_item_child` VALUES ('changeOwnPassword',  '/user-management/auth/change-own-password');
INSERT INTO `auth_item_child` VALUES ('changeUserPassword', '/user-management/user/change-password');
INSERT INTO `auth_item_child` VALUES ('changeUserPassword', 'viewUsers');
INSERT INTO `auth_item_child` VALUES ('createUsers',  '/user-management/user/create');
INSERT INTO `auth_item_child` VALUES ('createUsers',  'viewUsers');
INSERT INTO `auth_item_child` VALUES ('deleteUsers',  '/user-management/user/bulk-delete');
INSERT INTO `auth_item_child` VALUES ('deleteUsers',  '/user-management/user/delete');
INSERT INTO `auth_item_child` VALUES ('deleteUsers',  'viewUsers');
INSERT INTO `auth_item_child` VALUES ('editUserEmail','viewUserEmail');
INSERT INTO `auth_item_child` VALUES ('editUsers',    '/user-management/user/bulk-activate');
INSERT INTO `auth_item_child` VALUES ('editUsers',    '/user-management/user/bulk-deactivate');
INSERT INTO `auth_item_child` VALUES ('editUsers',    '/user-management/user/update');
INSERT INTO `auth_item_child` VALUES ('editUsers',    'viewUsers');
INSERT INTO `auth_item_child` VALUES ('viewUsers',    '/user-management/user/grid-page-size');
INSERT INTO `auth_item_child` VALUES ('viewUsers',    '/user-management/user/index');
INSERT INTO `auth_item_child` VALUES ('viewUsers',    '/user-management/user/view');
INSERT INTO `auth_item_child` VALUES ('viewVisitLog', '/user-management/user-visit-log/grid-page-size');
INSERT INTO `auth_item_child` VALUES ('viewVisitLog', '/user-management/user-visit-log/index');
INSERT INTO `auth_item_child` VALUES ('viewVisitLog', '/user-management/user-visit-log/view');

-- ----------------------------
-- user  (tabla de webvimark)
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id`                 int(11)      NOT NULL AUTO_INCREMENT,
  `username`           varchar(255) NOT NULL,
  `auth_key`           varchar(32)  NOT NULL,
  `password_hash`      varchar(255) NOT NULL,
  `confirmation_token` varchar(255) DEFAULT NULL,
  `status`             int(11)      NOT NULL DEFAULT 1,
  `superadmin`         smallint(1)  DEFAULT 0,
  `created_at`         int(11)      NOT NULL,
  `updated_at`         int(11)      NOT NULL,
  `registration_ip`    varchar(15)  DEFAULT NULL,
  `bind_to_ip`         varchar(255) DEFAULT NULL,
  `email`              varchar(128) DEFAULT NULL,
  `email_confirmed`    smallint(1)  NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Usuario superadmin por defecto (contraseña: admin)
INSERT INTO `user` VALUES (
  '1', 'superadmin',
  'kz2px152FAWlkHbkZoCiXgBAd-S8SSjF',
  '$2y$13$MhlYe12xkGFnSeK0sO2up.Y9kAD9Ct6JS1i9VLP7YAqd1dFsSylz2',
  null, '1', '1',
  '1426062188', '1426062188',
  null, null, null, '0'
);

-- ----------------------------
-- auth_assignment
-- ----------------------------
DROP TABLE IF EXISTS `auth_assignment`;
CREATE TABLE `auth_assignment` (
  `item_name`  varchar(64) NOT NULL,
  `user_id`    int(11)     NOT NULL,
  `created_at` int(11)     DEFAULT NULL,
  PRIMARY KEY (`item_name`, `user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `auth_assignment_ibfk_1` FOREIGN KEY (`item_name`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auth_assignment_ibfk_2` FOREIGN KEY (`user_id`)   REFERENCES `user`      (`id`)   ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Asignamos rol Admin al superadmin
INSERT INTO `auth_assignment` VALUES ('Admin', '1', '1426062188');

-- ----------------------------
-- user_visit_log
-- ----------------------------
DROP TABLE IF EXISTS `user_visit_log`;
CREATE TABLE `user_visit_log` (
  `id`         int(11)      NOT NULL AUTO_INCREMENT,
  `token`      varchar(255) NOT NULL,
  `ip`         varchar(15)  NOT NULL,
  `language`   char(2)      NOT NULL,
  `user_agent` varchar(255) NOT NULL,
  `user_id`    int(11)      DEFAULT NULL,
  `visit_time` int(11)      NOT NULL,
  `browser`    varchar(30)  DEFAULT NULL,
  `os`         varchar(20)  DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_visit_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ============================================================
--  2. PERMISO - Control de acceso por vistas (Guards)
-- ============================================================

DROP TABLE IF EXISTS `permiso`;
CREATE TABLE `permiso` (
  `per_id`    int(11)      NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `per_vista` varchar(100) NOT NULL COMMENT 'Nombre de la vista',
  `per_rol`   varchar(150) NOT NULL COMMENT 'Roles permitidos',
  PRIMARY KEY (`per_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Permisos de Netview (adaptar según las rutas reales del proyecto)
-- Formato per_rol: roles separados por coma, sin espacios
INSERT INTO `permiso` VALUES (1, 'tabs/content',         'cliente,Admin');
INSERT INTO `permiso` VALUES (2, 'tabs/content/:id',     'cliente,Admin');
INSERT INTO `permiso` VALUES (3, 'tabs/perfil',          'cliente,Admin');
INSERT INTO `permiso` VALUES (4, 'tabs/admin',           'Admin');
INSERT INTO `permiso` VALUES (5, 'tabs/suscripcion',     'cliente,Admin');

-- ============================================================
--  3. NETVIEW - Tablas propias del proyecto
-- ============================================================

-- ----------------------------
-- users  (usuarios de Netview, vinculados a webvimark)
-- NOTA: La columna user_id coincide con user.id de webvimark
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` INT NOT NULL COMMENT 'Mismo ID que user.id de webvimark',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_users_webvimark` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- subscription_plans
-- ----------------------------
DROP TABLE IF EXISTS `subscription_plans`;
CREATE TABLE `subscription_plans` (
  `plan_id`   INT           NOT NULL AUTO_INCREMENT,
  `plan_name` VARCHAR(50)   NOT NULL,
  `price`     DECIMAL(8,2)  NOT NULL,
  PRIMARY KEY (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `subscription_plans` VALUES (1, 'Básico',   99.00);
INSERT INTO `subscription_plans` VALUES (2, 'Estándar', 149.00);
INSERT INTO `subscription_plans` VALUES (3, 'Premium',  199.00);

-- ----------------------------
-- subscriptions
-- ----------------------------
DROP TABLE IF EXISTS `subscriptions`;
CREATE TABLE `subscriptions` (
  `subscription_id` INT  NOT NULL AUTO_INCREMENT,
  `user_id`         INT  NOT NULL,
  `plan_id`         INT  NOT NULL,
  `start_date`      DATE NOT NULL,
  `end_date`        DATE DEFAULT NULL,
  PRIMARY KEY (`subscription_id`),
  CONSTRAINT `fk_sub_user` FOREIGN KEY (`user_id`) REFERENCES `users`              (`user_id`),
  CONSTRAINT `fk_sub_plan` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans` (`plan_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- profiles
-- ----------------------------
DROP TABLE IF EXISTS `profiles`;
CREATE TABLE `profiles` (
  `profile_id`   INT          NOT NULL AUTO_INCREMENT,
  `user_id`      INT          NOT NULL,
  `profile_name` VARCHAR(50)  NOT NULL,
  `is_kids`      BOOLEAN      DEFAULT FALSE,
  PRIMARY KEY (`profile_id`),
  CONSTRAINT `fk_profile_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- genres
-- ----------------------------
DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `genre_id`   INT         NOT NULL AUTO_INCREMENT,
  `genre_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `genres` VALUES (1, 'Acción');
INSERT INTO `genres` VALUES (2, 'Drama');
INSERT INTO `genres` VALUES (3, 'Comedia');
INSERT INTO `genres` VALUES (4, 'Terror');
INSERT INTO `genres` VALUES (5, 'Ciencia Ficción');
INSERT INTO `genres` VALUES (6, 'Animación');
INSERT INTO `genres` VALUES (7, 'Documental');
INSERT INTO `genres` VALUES (8, 'Romance');

-- ----------------------------
-- languages
-- ----------------------------
DROP TABLE IF EXISTS `languages`;
CREATE TABLE `languages` (
  `language_id`   INT         NOT NULL AUTO_INCREMENT,
  `language_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `languages` VALUES (1, 'Español');
INSERT INTO `languages` VALUES (2, 'Inglés');
INSERT INTO `languages` VALUES (3, 'Portugués');
INSERT INTO `languages` VALUES (4, 'Francés');
INSERT INTO `languages` VALUES (5, 'Japonés');

-- ----------------------------
-- content
-- ----------------------------
DROP TABLE IF EXISTS `content`;
CREATE TABLE `content` (
  `content_id`       INT          NOT NULL AUTO_INCREMENT,
  `title`            VARCHAR(150) NOT NULL,
  `description`      TEXT,
  `duration_minutes` INT          NOT NULL,
  `content_type`     ENUM('Movie','Series') NOT NULL,
  PRIMARY KEY (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- content_genres
-- ----------------------------
DROP TABLE IF EXISTS `content_genres`;
CREATE TABLE `content_genres` (
  `content_id` INT NOT NULL,
  `genre_id`   INT NOT NULL,
  PRIMARY KEY (`content_id`, `genre_id`),
  CONSTRAINT `fk_cg_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`),
  CONSTRAINT `fk_cg_genre`   FOREIGN KEY (`genre_id`)   REFERENCES `genres`  (`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- content_languages
-- ----------------------------
DROP TABLE IF EXISTS `content_languages`;
CREATE TABLE `content_languages` (
  `content_id`    INT  NOT NULL,
  `language_id`   INT  NOT NULL,
  `language_type` ENUM('audio','subtitle') NOT NULL,
  PRIMARY KEY (`content_id`, `language_id`, `language_type`),
  CONSTRAINT `fk_cl_content`  FOREIGN KEY (`content_id`)  REFERENCES `content`   (`content_id`),
  CONSTRAINT `fk_cl_language` FOREIGN KEY (`language_id`) REFERENCES `languages` (`language_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- seasons
-- ----------------------------
DROP TABLE IF EXISTS `seasons`;
CREATE TABLE `seasons` (
  `season_id`     INT NOT NULL AUTO_INCREMENT,
  `content_id`    INT NOT NULL,
  `season_number` INT NOT NULL,
  PRIMARY KEY (`season_id`),
  CONSTRAINT `fk_season_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- episodes
-- ----------------------------
DROP TABLE IF EXISTS `episodes`;
CREATE TABLE `episodes` (
  `episode_id`       INT NOT NULL AUTO_INCREMENT,
  `season_id`        INT NOT NULL,
  `episode_number`   INT NOT NULL,
  `duration_minutes` INT NOT NULL,
  PRIMARY KEY (`episode_id`),
  CONSTRAINT `fk_episode_season` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`season_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- watch_history
-- ----------------------------
DROP TABLE IF EXISTS `watch_history`;
CREATE TABLE `watch_history` (
  `history_id`      INT NOT NULL AUTO_INCREMENT,
  `profile_id`      INT NOT NULL,
  `content_id`      INT NOT NULL,
  `episode_id`      INT NULL,
  `watched_seconds` INT DEFAULT 0,
  PRIMARY KEY (`history_id`),
  CONSTRAINT `fk_wh_profile` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`profile_id`),
  CONSTRAINT `fk_wh_content` FOREIGN KEY (`content_id`) REFERENCES `content`  (`content_id`),
  CONSTRAINT `fk_wh_episode` FOREIGN KEY (`episode_id`) REFERENCES `episodes` (`episode_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- favorites
-- ----------------------------
DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `profile_id` INT NOT NULL,
  `content_id` INT NOT NULL,
  PRIMARY KEY (`profile_id`, `content_id`),
  CONSTRAINT `fk_fav_profile` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`profile_id`),
  CONSTRAINT `fk_fav_content` FOREIGN KEY (`content_id`) REFERENCES `content`  (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- ratings
-- ----------------------------
DROP TABLE IF EXISTS `ratings`;
CREATE TABLE `ratings` (
  `rating_id`  INT NOT NULL AUTO_INCREMENT,
  `profile_id` INT NOT NULL,
  `content_id` INT NOT NULL,
  `score`      INT NOT NULL,
  PRIMARY KEY (`rating_id`),
  CONSTRAINT `fk_rat_profile` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`profile_id`),
  CONSTRAINT `fk_rat_content` FOREIGN KEY (`content_id`) REFERENCES `content`  (`content_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS=1;
