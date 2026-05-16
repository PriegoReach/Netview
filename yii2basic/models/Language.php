<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "language".
 *
 * @property int $language_id
 * @property string $language_name
 *
 * @property ContentLanguage[] $contentLanguages
 */
class Language extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'languages';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['language_name'], 'required'],
            [['language_name'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'language_id' => 'Language ID',
            'language_name' => 'Language Name',
        ];
    }

    /**
     * Gets query for [[ContentLanguages]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getContentLanguages()
    {
        return $this->hasMany(ContentLanguage::class, ['language_id' => 'language_id']);
    }

}
