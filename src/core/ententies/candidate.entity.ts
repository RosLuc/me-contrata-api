import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	OneToOne,
	JoinColumn,
	OneToMany,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import { User } from './user.entity';
import { Job } from './job.entity';

@Entity()
export class Candidate {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: string;

	@Column()
	name: string;

	@Column()
	bio: string;

	@Column()
	birth_date: Date;

	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User;

	@OneToMany(() => Job, (job) => job.candidate)
	jobs: Job[];

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
