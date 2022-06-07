import { Column, Entity, Index, JoinTable, ManyToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { Base } from './Base.entity';
import { User } from './user.entity';

@Entity('tasks')
export class Task extends Base {

	@ApiProperty()
	@Column()
	title: string;

	@ApiProperty()
	@Column()
	description: Text;

    @ApiProperty()
	@Column({
		type: 'timestamp'
	})
	dueDate: Date;

    @ManyToMany(() => User)
    @JoinTable()
    assignee: User[];
}