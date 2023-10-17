import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey
} from 'typeorm';

export class CreateJobTable1695342330304 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'job',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
					},
					{
						name: 'candidate_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'price',
						type: 'float',
					},
					{
						name: 'description',
						type: 'text',
					},
					{
						name: 'category',
						type: 'varchar',
					},
					{
						name: 'status',
						type: 'varchar',
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
			'job',
			new TableForeignKey({
				columnNames: ['candidate_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'candidate',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.dropForeignKey("job", "candidate_id");
		await queryRunner.dropTable('job');
	}
}
