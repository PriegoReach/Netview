<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "episode".
 *
 * @property int $episode_id
 * @property int $season_id
 * @property int $episode_number
 * @property int $duration_minutes
 *
 * @property Season $season
 * @property WatchHistory[] $watchHistories
 */
class Episode extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'episodes';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['season_id', 'episode_number', 'duration_minutes'], 'required'],
            [['season_id', 'episode_number', 'duration_minutes'], 'integer'],
            [['season_id'], 'exist', 'skipOnError' => true, 'targetClass' => Season::class, 'targetAttribute' => ['season_id' => 'season_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'episode_id' => 'Episode ID',
            'season_id' => 'Season ID',
            'episode_number' => 'Episode Number',
            'duration_minutes' => 'Duration Minute',
        ];
    }

    /**
     * Gets query for [[Season]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSeason()
    {
        return $this->hasOne(Season::class, ['season_id' => 'season_id']);
    }

    /**
     * Gets query for [[WatchHistories]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getWatchHistories()
    {
        return $this->hasMany(WatchHistory::class, ['episode_id' => 'episode_id']);
    }

}
