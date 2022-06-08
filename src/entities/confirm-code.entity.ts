import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";


@Entity('codes')
export class ConfirmCode {

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	code: string;

}