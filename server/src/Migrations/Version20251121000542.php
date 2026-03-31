<?php

declare(strict_types=1);

namespace App\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20251121000542 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Test Migration';
    }

    public function up(Schema $schema): void
    {
        $testTable = $schema->createTable('test_table');
        $testTable->addColumn('id', 'integer', ['autoincrement' => true]);
        $testTable->addColumn('name', 'string', ['length' => 255]);
        $testTable->setPrimaryKey(['id']);
    }

    public function down(Schema $schema): void
    {
        $schema->dropTable('test_table');
    }
}
