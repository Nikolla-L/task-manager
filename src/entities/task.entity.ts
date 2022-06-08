import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Task extends Base {

	@ApiProperty()
	@Column()
	title: string;

	@ApiProperty()
	@Column()
	description: string;

    @ApiProperty()
	@Column({
		type: 'timestamp'
	})
	dueDate: Date;

	@Column({
		default: 'progress'
	})
	status: string;

    @ManyToMany(() => User)
    @JoinTable()
    assignee: User[];

}