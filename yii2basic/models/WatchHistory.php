<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "watch_history".
 *
 * @property int $history_id
 * @property int $profile_id
 * @property int $content_id
 * @property int|null $episode_id
 * @property int|null $watched_seconds
 *
 * @property Content $content
 * @property Episode $episode
 * @property Profile $profile
 */
class WatchHistory extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'watch_history';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['episode_id'], 'default', 'value' => null],
            [['watched_seconds'], 'default', 'value' => 0],
            [['profile_id', 'content_id'], 'required'],
            [['profile_id', 'content_id', 'episode_id', 'watched_seconds'], 'integer'],
            [['profile_id'], 'exist', 'skipOnError' => true, 'targetClass' => Profile::class, 'targetAttribute' => ['profile_id' => 'profile_id']],
            [['content_id'], 'exist', 'skipOnError' => true, 'targetClass' => Content::class, 'targetAttribute' => ['content_id' => 'content_id']],
            [['episode_id'], 'exist', 'skipOnError' => true, 'targetClass' => Episode::class, 'targetAttribute' => ['episode_id' => 'episode_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'history_id' => 'History ID',
            'profile_id' => 'Profile ID',
            'content_id' => 'Content ID',
            'episode_id' => 'Episode ID',
            'watched_seconds' => 'Watched Second',
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
     * Gets query for [[Episode]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEpisode()
    {
        return $this->hasOne(Episode::class, ['episode_id' => 'episode_id']);
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
