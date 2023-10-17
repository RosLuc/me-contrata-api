import {
	MigrationInterface,
	QueryRunner,
	Table
} from 'typeorm';

export class CreateCompanyTable1695342330305 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'company',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'number_employees',
						type: 'int',
					},
					{
						name: 'sector',
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
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.dropTable('company');
	}
}
