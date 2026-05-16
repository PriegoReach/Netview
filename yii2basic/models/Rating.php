<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "rating".
 *
 * @property int $rating_id
 * @property int $profile_id
 * @property int $content_id
 * @property int $score
 *
 * @property Content $content
 * @property Profile $profile
 */
class Rating extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'ratings';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['profile_id', 'content_id', 'score'], 'required'],
            [['profile_id', 'content_id', 'score'], 'integer'],
            [['profile_id'], 'exist', 'skipOnError' => true, 'targetClass' => Profile::class, 'targetAttribute' => ['profile_id' => 'profile_id']],
            [['content_id'], 'exist', 'skipOnError' => true, 'targetClass' => Content::class, 'targetAttribute' => ['content_id' => 'content_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'rating_id' => 'Rating ID',
            'profile_id' => 'Profile ID',
            'content_id' => 'Content ID',
            'score' => 'Score',
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
     * Gets query for [[Profile]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProfile()
    {
        return $this->hasOne(Profile::class, ['profile_id' => 'profile_id']);
    }

}
