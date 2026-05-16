<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "subscription".
 *
 * @property int $subscription_id
 * @property int $user_id
 * @property int $plan_id
 * @property string $start_date
 * @property string|null $end_date
 *
 * @property SubscriptionPlan $plan
 * @property User $user
 */
class Subscription extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'subscriptions';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['end_date'], 'default', 'value' => null],
            [['user_id', 'plan_id', 'start_date'], 'required'],
            [['user_id', 'plan_id'], 'integer'],
            [['start_date', 'end_date'], 'safe'],
            [['user_id'], 'exist', 'skipOnError' => true, 'targetClass' => \webvimark\modules\UserManagement\models\User::class, 'targetAttribute' => ['user_id' => 'id']],
            [['plan_id'], 'exist', 'skipOnError' => true, 'targetClass' => SubscriptionPlan::class, 'targetAttribute' => ['plan_id' => 'plan_id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'subscription_id' => 'Subscription ID',
            'user_id' => 'User ID',
            'plan_id' => 'Plan ID',
            'start_date' => 'Start Date',
            'end_date' => 'End Date',
        ];
    }

    /**
     * Gets query for [[Plan]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getPlan()
    {
        return $this->hasOne(SubscriptionPlan::class, ['plan_id' => 'plan_id']);
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

}
