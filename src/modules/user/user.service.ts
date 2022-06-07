import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { User } from 'src/entities/user.entity';
import { AddUserDto } from './dto/add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  async register(user: AddUserDto): Promise<User> {
    return await this.usersRepository.save({
			...user,
			password: await bcrypt.hash(user.password, 12)
		});
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.createQueryBuilder('u').getMany();
  }

  async findByEmail(email: string): Promise<User | undefined> {
		return await this.usersRepository.findOne({where: {email}});
	}

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
		const existing = await this.usersRepository.findOne({where: {id}});
		return await this.usersRepository.save({
			...existing, ...updateUserDto
		});
  }

  async remove(id: number) {
    await this.usersRepository.softDelete({id});
  }
}
