import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { ConfirmCode } from 'src/entities/confirm-code.entity';

@Module({
  imports: [
		TypeOrmModule.forFeature([User, ConfirmCode])
	],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
