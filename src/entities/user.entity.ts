import { Column, Entity } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { Base } from './base.entity';

@Entity('users')
export class User extends Base {

	@Column()
	email: string;

	@Column()
	fullName: string;

	@Column()
	password: string;

}