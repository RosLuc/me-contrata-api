import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	type: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@BeforeInsert()
	setCreateDate() {
		this.created_at = new Date();
		this.updated_at = new Date();
	}

	@BeforeUpdate()
	setUpdateDate() {
		this.updated_at = new Date();
	}
}
