import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Company {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	number_employees: number;

	@Column()
	sector: string;

	@OneToMany(() => Employee, (employee) => employee.company)
	employees: Employee[];

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
