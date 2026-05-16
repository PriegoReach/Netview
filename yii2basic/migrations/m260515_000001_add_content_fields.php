<?php

use yii\db\Migration;

class m260515_000001_add_content_fields extends Migration
{
    public function safeUp()
    {
        $this->addColumn('content', 'image_url',    $this->string(255)->null()->after('description'));
        $this->addColumn('content', 'release_year', $this->integer()->null()->after('image_url'));
        $this->addColumn('content', 'clasificacion', $this->string(10)->null()->after('release_year'));
    }

    public function safeDown()
    {
        $this->dropColumn('content', 'clasificacion');
        $this->dropColumn('content', 'release_year');
        $this->dropColumn('content', 'image_url');
    }
}
