import { Column, Entity } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { Base } from './base.entity';

@Entity('users')
export class User extends Base {

	@ApiProperty()
	@Column()
	email: string;

	@ApiProperty()
	@Column()
	fullName: string;

    @ApiProperty()
	@Column()
	password: string;

}