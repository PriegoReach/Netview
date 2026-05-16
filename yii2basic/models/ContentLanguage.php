<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "content_language".
 *
 * @property int $content_id
 * @property int $language_id
 * @property string $language_type
 *
 * @property Content $content
 * @property Language $language
 */
class ContentLanguage extends \yii\db\ActiveRecord
{

    /**
     * ENUM field values
     */
    const LANGUAGE_TYPE_AUDIO = 'audio';
    const LANGUAGE_TYPE_SUBTITLE = 'subtitle';

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'content_languages';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['content_id', 'language_id', 'language_type'], 'required'],
            [['content_id', 'language_id'], 'integer'],
            [['language_type'], 'string'],
            ['language_type', 'in', 'range' => array_keys(self::optsLanguageType())],
            [['content_id', 'language_id', 'language_type'], 'unique', 'targetAttribute' => ['content_id', 'language_id', 'language_type']],
            [['content_id'], 'exist', 'skipOnError' => true, 'targetClass' => Content::class, 'targetAttribute' => ['content_id' => 'content_id']],
            [['language_id'], 'exist', 'skipOnError' => true, 'targetClass' => Language::class, 'targetAttribute' => ['language_id' => 'language_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'content_id' => 'Content ID',
            'language_id' => 'Language ID',
            'language_type' => 'Language Type',
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
     * Gets query for [[Language]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getLanguage()
    {
        return $this->hasOne(Language::class, ['language_id' => 'language_id']);
    }


    /**
     * column language_type ENUM value labels
     * @return string[]
     */
    public static function optsLanguageType()
    {
        return [
            self::LANGUAGE_TYPE_AUDIO => 'audio',
            self::LANGUAGE_TYPE_SUBTITLE => 'subtitle',
        ];
    }

    /**
     * @return string
     */
    public function displayLanguageType()
    {
        return self::optsLanguageType()[$this->language_type];
    }

    /**
     * @return bool
     */
    public function isLanguageTypeAudio()
    {
        return $this->language_type === self::LANGUAGE_TYPE_AUDIO;
    }

    public function setLanguageTypeToAudio()
    {
        $this->language_type = self::LANGUAGE_TYPE_AUDIO;
    }

    /**
     * @return bool
     */
    public function isLanguageTypeSubtitle()
    {
        return $this->language_type === self::LANGUAGE_TYPE_SUBTITLE;
    }

    public function setLanguageTypeToSubtitle()
    {
        $this->language_type = self::LANGUAGE_TYPE_SUBTITLE;
    }
}
