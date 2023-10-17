import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey
} from 'typeorm';

export class CreateEmployeeTable1695342330310 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'employee',
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
						name: 'company_id',
						type: 'int',
						isNullable: false,
					},
					{
						name: 'name',
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

		await Promise.all([
			queryRunner.createForeignKey(
				'employee',
				new TableForeignKey({
					columnNames: ['user_id'],
					referencedColumnNames: ['id'],
					referencedTableName: 'user',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				}),
			),
			queryRunner.createForeignKey(
				'employee',
				new TableForeignKey({
					columnNames: ['company_id'],
					referencedColumnNames: ['id'],
					referencedTableName: 'company',
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				}),
			)
		]);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await Promise.all([
			queryRunner.dropForeignKey("employee", "user_id"),
			queryRunner.dropForeignKey("employee", "company_id")
		]);
		await queryRunner.dropTable('employee');
	}
}
