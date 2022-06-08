import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { Base } from './base.entity';
import { User } from './user.entity';

export enum Status {
	TODO = 'TODO',
	PROGRESS = 'PROGRESS',
	DONE = 'DONE'
}
@Entity('tasks')
export class Task extends Base {

	@Column()
	title: string;

	@Column()
	description: string;

	@Column({
		type: 'timestamp'
	})
	dueDate: Date;

	@Column({
		type: 'enum',
		enum: Status,
		enumName: 'status',
		default: Status.TODO
	})
	status: Status;

    @ManyToMany(() => User)
    @JoinTable()
    assignee: User[];

}