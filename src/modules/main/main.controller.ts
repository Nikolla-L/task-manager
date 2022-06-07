import {Controller, Get, Param} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Test')
@Controller()
export class MainController {

	@Get('ping')
	get(@Param() id: number): string {
		return 'pong';
	}
}