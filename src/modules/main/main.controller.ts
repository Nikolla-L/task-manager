import {Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/jwt/jwt-auth.guard';

@ApiTags('Test')
@Controller()
export class MainController {

	@Public()
	@Get('ping')
	get(): string {
		return 'pong';
	}
}