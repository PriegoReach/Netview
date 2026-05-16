<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "season".
 *
 * @property int $season_id
 * @property int $content_id
 * @property int $season_number
 *
 * @property Content $content
 * @property Episode[] $episodes
 */
class Season extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'seasons';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['content_id', 'season_number'], 'required'],
            [['content_id', 'season_number'], 'integer'],
            [['content_id'], 'exist', 'skipOnError' => true, 'targetClass' => Content::class, 'targetAttribute' => ['content_id' => 'content_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'season_id' => 'Season ID',
            'content_id' => 'Content ID',
            'season_number' => 'Season Number',
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
     * Gets query for [[Episodes]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getEpisodes()
    {
        return $this->hasMany(Episode::class, ['season_id' => 'season_id']);
    }

}
