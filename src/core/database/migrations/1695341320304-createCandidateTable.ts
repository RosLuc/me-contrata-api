import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey
} from 'typeorm';

export class CreateCandidateTable1695341320304 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'candidate',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
					},
					{
						name: 'user_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'bio',
						type: 'text',
					},
					{
						name: 'birth_date',
						type: 'date',
					},
					{
						name: 'created_at',
						type: 'date',
					},
					{
						name: 'updated_at',
						type: 'date',
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			'candidate',
			new TableForeignKey({
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'user',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.dropForeignKey("candidate", "user_id");
		await queryRunner.dropTable('candidate');
	}
}
