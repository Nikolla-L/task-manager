import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { AuthModule } from '../auth/auth.module';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [
		TypeOrmModule.forFeature([Task, User]),
    AuthModule
	],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
