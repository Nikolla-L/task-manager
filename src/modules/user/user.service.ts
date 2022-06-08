import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { User } from 'src/entities/user.entity';
import { AddUserDto } from './dto/add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sendConfrimCode, sendRegistrationWelcome } from 'src/utils/mailer';
import { ConfirmCode } from 'src/entities/confirm-code.entity';
import { ConfirmCodeDto } from './dto/confirm-code.dto';
import { CodeDto } from './dto/code.dto';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(ConfirmCode) private confirmCodeRepository: Repository<ConfirmCode>
  ) { }

  async register(user: AddUserDto): Promise<User | undefined> {
    const newUser =  await this.usersRepository.save({
			...user,
			password: await bcrypt.hash(user.password, 12)
		});
    if(newUser) {
      await sendRegistrationWelcome(user.email);
      return newUser;
    }
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
    await this.usersRepository.delete({id});
  }

  async getCode(confirmCodeDto: ConfirmCodeDto): Promise<any> {
    const userExists = await this.findByEmail(confirmCodeDto.email);
    if(userExists) {
      throw new BadRequestException('User already exists with this email');
    }

    try {
      let code = '';
      let characters = '0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random()*charactersLength));
      }

      const confirmCode =  await this.confirmCodeRepository.save({code});
      await sendConfrimCode(confirmCodeDto.email, code);
      return await {codeId: confirmCode.id};
    } catch (error) {
      throw new InternalServerErrorException('Please try later');
    }
  }

  async confirmCode(codeDto: CodeDto): Promise<boolean> {
    let codeExists = await this.confirmCodeRepository.findOne({where:{id: codeDto.id}});
    return codeExists?.code == codeDto.code;
  }
}
