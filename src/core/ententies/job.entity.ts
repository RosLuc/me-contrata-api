import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	CreateDateColumn,
	ManyToOne,
	JoinColumn,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import { Candidate } from './candidate.entity';

@Entity()
export class Job {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	candidate_id: number;

	@Column()
	name: string;

	@Column()
	price: number;

	@Column()
	description: string;

	@Column()
	category: string;

	@Column()
	status: string;

	@ManyToOne(() => Candidate, (candidate) => candidate.jobs)
	@JoinColumn({ name: 'candidate_id' })
	candidate: Candidate;

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
