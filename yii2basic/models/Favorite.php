<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "favorite".
 *
 * @property int $profile_id
 * @property int $content_id
 *
 * @property Content $content
 * @property Profile $profile
 */
class Favorite extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'favorites';
    }


    public static function primaryKey()
{
    return ['profile_id', 'content_id'];
}       
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['profile_id', 'content_id'], 'required'],
            [['profile_id', 'content_id'], 'integer'],
            [['profile_id', 'content_id'], 'unique', 'targetAttribute' => ['profile_id', 'content_id']],
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
            'profile_id' => 'Profile ID',
            'content_id' => 'Content ID',
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
