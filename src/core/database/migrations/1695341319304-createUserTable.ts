import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUserTable1695341319304 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.createTable(
			new Table({
				name: "user",
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
					},
					{
						name: 'username',
						type: 'varchar',
						isUnique: true
					},
					{
						name: 'email',
						type: 'varchar',
						isUnique: true
					},
					{
						name: 'password',
						type: 'varchar'
					},
					{
						name: 'type',
						type: 'varchar'
					},
					{
						name: 'created_at',
						type: 'date'
					},
					{
						name: 'updated_at',
						type: 'date'
					}
				]
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.dropTable('user');
	}

}
