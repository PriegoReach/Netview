<?php

namespace app\models;

use Yii;

/**
 * @property int $content_id
 * @property string $title
 * @property string|null $description
 * @property string|null $image_url
 * @property int|null $release_year
 * @property string|null $clasificacion
 * @property int $duration_minutes
 * @property string $content_type
 *
 * @property ContentGenre[] $contentGenres
 * @property ContentLanguage[] $contentLanguages
 * @property Favorite[] $favorites
 * @property Genre[] $genres
 * @property Rating[] $ratings
 * @property Season[] $seasons
 * @property WatchHistory[] $watchHistories
 */
class Content extends \yii\db\ActiveRecord
{
    const CONTENT_TYPE_MOVIE = 'Movie';
    const CONTENT_TYPE_SERIES = 'Series';

    public $imagenArchivo;

    public static function tableName()
    {
        return 'content';
    }

    public function rules()
    {
        return [
            [['description', 'image_url', 'release_year', 'clasificacion'], 'default', 'value' => null],
            [['title', 'duration_minutes', 'content_type'], 'required'],
            [['description', 'content_type', 'image_url', 'clasificacion'], 'string'],
            [['duration_minutes', 'release_year'], 'integer'],
            [['title'], 'string', 'max' => 150],
            [['image_url'], 'string', 'max' => 255],
            [['clasificacion'], 'string', 'max' => 10],
            ['content_type', 'in', 'range' => array_keys(self::optsContentType())],
            [['imagenArchivo'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png, jpg, jpeg, webp', 'maxSize' => 5 * 1024 * 1024],
        ];
    }

    public function attributeLabels()
    {
        return [
            'content_id'       => 'ID',
            'title'            => 'Título',
            'description'      => 'Descripción',
            'image_url'        => 'Imagen URL',
            'release_year'     => 'Año de estreno',
            'clasificacion'    => 'Clasificación',
            'duration_minutes' => 'Duración (min)',
            'content_type'     => 'Tipo',
        ];
    }

    public function getContentGenres()
    {
        return $this->hasMany(ContentGenre::class, ['content_id' => 'content_id']);
    }

    public function getContentLanguages()
    {
        return $this->hasMany(ContentLanguage::class, ['content_id' => 'content_id']);
    }

    public function getFavorites()
    {
        return $this->hasMany(Favorite::class, ['content_id' => 'content_id']);
    }

    public function getGenres()
    {
        return $this->hasMany(Genre::class, ['genre_id' => 'genre_id'])
            ->viaTable('content_genres', ['content_id' => 'content_id']);
    }

    public function getRatings()
    {
        return $this->hasMany(Rating::class, ['content_id' => 'content_id']);
    }

    public function getSeasons()
    {
        return $this->hasMany(Season::class, ['content_id' => 'content_id'])
            ->orderBy(['season_number' => SORT_ASC]);
    }

    public function getWatchHistories()
    {
        return $this->hasMany(WatchHistory::class, ['content_id' => 'content_id']);
    }

    public function extraFields()
    {
        return [
            'genres',
            'languages' => 'contentLanguages',
        ];
    }

    public static function optsContentType()
    {
        return [
            self::CONTENT_TYPE_MOVIE  => 'Película',
            self::CONTENT_TYPE_SERIES => 'Serie',
        ];
    }

    public function isContentTypeMovie()
    {
        return $this->content_type === self::CONTENT_TYPE_MOVIE;
    }

    public function isContentTypeSeries()
    {
        return $this->content_type === self::CONTENT_TYPE_SERIES;
    }
}
