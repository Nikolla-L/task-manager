import {IsNotEmpty} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
	@ApiProperty({default: 'nlukava2002@gmail.com'})
	@IsNotEmpty()
	email: string;

	@ApiProperty({default: 1234})
	@IsNotEmpty()
	password: string;
}
