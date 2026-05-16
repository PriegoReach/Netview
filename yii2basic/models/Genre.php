<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "genre".
 *
 * @property int $genre_id
 * @property string $genre_name
 *
 * @property ContentGenre[] $contentGenres
 * @property Content[] $contents
 */
class Genre extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'genres';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['genre_name'], 'required'],
            [['genre_name'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'genre_id' => 'Genre ID',
            'genre_name' => 'Genre Name',
        ];
    }

    /**
     * Gets query for [[ContentGenres]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getContentGenres()
    {
        return $this->hasMany(ContentGenre::class, ['genre_id' => 'genre_id']);
    }

    /**
     * Gets query for [[Contents]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getContents()
    {
        return $this->hasMany(Content::class, ['content_id' => 'content_id'])->viaTable('content_genre', ['genre_id' => 'genre_id']);
    }

}
