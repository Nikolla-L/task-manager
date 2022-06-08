import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { UserModule } from '../user/user.module';
import { TaskModule } from '../task/task.module';
import { AuthModule } from '../auth/auth.module';
import { DBModule } from 'src/configuration/db.module';

@Module({
	imports: [
		DBModule,
		AuthModule,
		UserModule,
		TaskModule
	],
	controllers: [MainController]
})
export class MainModule { }
