<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "content_genre".
 *
 * @property int $content_id
 * @property int $genre_id
 *
 * @property Content $content
 * @property Genre $genre
 */
class ContentGenre extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'content_genres';
    }

    public static function primaryKey()
{
    return ['content_id', 'genre_id'];
}

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['content_id', 'genre_id'], 'required'],
            [['content_id', 'genre_id'], 'integer'],
            [['content_id', 'genre_id'], 'unique', 'targetAttribute' => ['content_id', 'genre_id']],
            [['content_id'], 'exist', 'skipOnError' => true, 'targetClass' => Content::class, 'targetAttribute' => ['content_id' => 'content_id']],
            [['genre_id'], 'exist', 'skipOnError' => true, 'targetClass' => Genre::class, 'targetAttribute' => ['genre_id' => 'genre_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'content_id' => 'Content ID',
            'genre_id' => 'Genre ID',
        ];
    }

    /**
     * Gets query for [[Content]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getContent()
    {
        return $this->hasOne(Content::class, ['content_id' => 'content_id']);
    }

    /**
     * Gets query for [[Genre]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getGenre()
    {
        return $this->hasOne(Genre::class, ['genre_id' => 'genre_id']);
    }

}
