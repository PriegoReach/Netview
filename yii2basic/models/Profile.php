<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "profile".
 *
 * @property int $profile_id
 * @property int $user_id
 * @property string $profile_name
 * @property int|null $kid
 *
 * @property Content[] $contents
 * @property Favorite[] $favorites
 * @property Rating[] $ratings
 * @property User $user
 * @property WatchHistory[] $watchHistories
 */
class Profile extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'profiles';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['is_kids'], 'default', 'value' => 0],
            [['user_id', 'profile_name'], 'required'],
            [['user_id', 'is_kids'], 'integer'],
            [['profile_name'], 'string', 'max' => 50],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => \webvimark\modules\UserManagement\models\User::class, 'targetAttribute' => ['user_id' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'profile_id' => 'Profile ID',
            'user_id' => 'User ID',
            'profile_name' => 'Profile Name',
            'is_kids' => 'is_kids',
        ];
    }

    /**
     * Gets query for [[Contents]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getContents()
    {
        return $this->hasMany(Content::class, ['content_id' => 'content_id'])->viaTable('favorite', ['profile_id' => 'profile_id']);
    }

    /**
     * Gets query for [[Favorites]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getFavorites()
    {
        return $this->hasMany(Favorite::class, ['profile_id' => 'profile_id']);
    }

    /**
     * Gets query for [[Ratings]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getRatings()
    {
        return $this->hasMany(Rating::class, ['profile_id' => 'profile_id']);
    }

    /**
     * Gets query for [[User]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::class, ['user_id' => 'user_id']);
    }

    /**
     * Gets query for [[WatchHistories]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getWatchHistories()
    {
        return $this->hasMany(WatchHistory::class, ['profile_id' => 'profile_id']);
    }

}
