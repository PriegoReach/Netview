SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. Tablas Maestras (Sin dependencias)
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `genre`;
CREATE TABLE `genre` (
  `genre_id` int(11) NOT NULL AUTO_INCREMENT,
  `genre_name` varchar(50) NOT NULL,
  PRIMARY KEY (`genre_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

INSERT INTO `genre` VALUES (4, 'Musicales'), (6, 'Acción'), (10, 'Ciencia Ficción'), (11, 'Romance'), (14, 'Turcas');

DROP TABLE IF EXISTS `language`;
CREATE TABLE `language` (
  `language_id` int(11) NOT NULL AUTO_INCREMENT,
  `language_name` varchar(50) NOT NULL,
  PRIMARY KEY (`language_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `subscription_plan`;
CREATE TABLE `subscription_plan` (
  `plan_id` int(11) NOT NULL AUTO_INCREMENT,
  `plan_name` varchar(50) NOT NULL,
  `price` decimal(8, 2) NOT NULL,
  PRIMARY KEY (`plan_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `content`;
CREATE TABLE `content` (
  `content_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` text NULL,
  `duration_minute` int(11) NOT NULL,
  `content_type` enum('Movie','Series') NOT NULL,
  PRIMARY KEY (`content_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

INSERT INTO `content` VALUES (1, 'Avengers', 'Superhéroes salvan el mundo', 180, 'Movie');
INSERT INTO `content` VALUES (2, 'The Office', 'Serie de comedia en oficina', 22, 'Series');
INSERT INTO `content` VALUES (3, 'Interstellar', 'Viaje al espacio', 169, 'Movie');

-- 2. Tablas con Dependencias Simples
DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `profile_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `profile_name` varchar(50) NOT NULL,
  `kid` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`profile_id`) USING BTREE,
  CONSTRAINT `fk_profile_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `season`;
CREATE TABLE `season` (
  `season_id` int(11) NOT NULL AUTO_INCREMENT,
  `content_id` int(11) NOT NULL,
  `season_number` int(11) NOT NULL,
  PRIMARY KEY (`season_id`) USING BTREE,
  CONSTRAINT `fk_season_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `subscription`;
CREATE TABLE `subscription` (
  `subscription_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NULL DEFAULT NULL,
  PRIMARY KEY (`subscription_id`) USING BTREE,
  CONSTRAINT `fk_sub_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `fk_sub_plan` FOREIGN KEY (`plan_id`) REFERENCES `subscription_plan` (`plan_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- 3. Tablas de Relación y Detalle
DROP TABLE IF EXISTS `episode`;
CREATE TABLE `episode` (
  `episode_id` int(11) NOT NULL AUTO_INCREMENT,
  `season_id` int(11) NOT NULL,
  `episode_number` int(11) NOT NULL,
  `duration_minute` int(11) NOT NULL,
  PRIMARY KEY (`episode_id`) USING BTREE,
  CONSTRAINT `fk_episode_season` FOREIGN KEY (`season_id`) REFERENCES `season` (`season_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `content_genre`;
CREATE TABLE `content_genre` (
  `content_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  PRIMARY KEY (`content_id`, `genre_id`) USING BTREE,
  CONSTRAINT `fk_cg_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`),
  CONSTRAINT `fk_cg_genre` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

INSERT INTO `content_genre` VALUES (2, 11), (1, 14);

DROP TABLE IF EXISTS `content_language`;
CREATE TABLE `content_language` (
  `content_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `language_type` enum('audio','subtitle') NOT NULL,
  PRIMARY KEY (`content_id`, `language_id`, `language_type`) USING BTREE,
  CONSTRAINT `fk_cl_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`),
  CONSTRAINT `fk_cl_lang` FOREIGN KEY (`language_id`) REFERENCES `language` (`language_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `favorite`;
CREATE TABLE `favorite` (
  `profile_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  PRIMARY KEY (`profile_id`, `content_id`) USING BTREE,
  CONSTRAINT `fk_fav_profile` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`),
  CONSTRAINT `fk_fav_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `rating`;
CREATE TABLE `rating` (
  `rating_id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`rating_id`) USING BTREE,
  CONSTRAINT `fk_rat_profile` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`),
  CONSTRAINT `fk_rat_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

DROP TABLE IF EXISTS `watch_history`;
CREATE TABLE `watch_history` (
  `history_id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_id` int(11) NOT NULL,
  `content_id` int(11) NOT NULL,
  `episode_id` int(11) NULL DEFAULT NULL,
  `watched_second` int(11) NULL DEFAULT 0,
  PRIMARY KEY (`history_id`) USING BTREE,
  CONSTRAINT `fk_wh_profile` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`),
  CONSTRAINT `fk_wh_content` FOREIGN KEY (`content_id`) REFERENCES `content` (`content_id`),
  CONSTRAINT `fk_wh_episode` FOREIGN KEY (`episode_id`) REFERENCES `episode` (`episode_id`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;