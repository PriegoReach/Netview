<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "subscription_plan".
 *
 * @property int $plan_id
 * @property string $plan_name
 * @property float $price
 *
 * @property Subscription[] $subscriptions
 */
class SubscriptionPlan extends \yii\db\ActiveRecord
{


    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'subscription_plans';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['plan_name', 'price'], 'required'],
            [['price'], 'number'],
            [['plan_name'], 'string', 'max' => 50],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'plan_id' => 'Plan ID',
            'plan_name' => 'Plan Name',
            'price' => 'Price',
        ];
    }

    /**
     * Gets query for [[Subscriptions]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getSubscriptions()
    {
        return $this->hasMany(Subscription::class, ['plan_id' => 'plan_id']);
    }

}
