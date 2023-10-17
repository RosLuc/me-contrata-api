import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	ManyToOne,
	BeforeInsert,
	BeforeUpdate
} from 'typeorm';
import { User } from './user.entity';
import { Company } from './company.entity';

@Entity()
export class Employee {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: number;

	@Column()
	company_id: number;

	@Column()
	name: string;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@ManyToOne(() => Company, (company) => company.employees)
	@JoinColumn({ name: 'company_id' })
	company: Company;

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
