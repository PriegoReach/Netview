<?php

namespace app\models;

use Yii;

/**
 * @property int    $per_id    ID
 * @property string $per_vista Nombre de la vista
 * @property string $per_rol   Roles permitidos (separados por coma)
 */
class Permiso extends \yii\db\ActiveRecord
{
    public static function tableName()
    {
        return 'permiso';
    }

    public function rules()
    {
        return [
            [['per_vista', 'per_rol'], 'required'],
            [['per_vista'], 'string', 'max' => 100],
            [['per_rol'],   'string', 'max' => 150],
        ];
    }

    public function attributeLabels()
    {
        return [
            'per_id'    => 'ID',
            'per_vista' => 'Nombre de la vista',
            'per_rol'   => 'Roles permitidos',
        ];
    }
}