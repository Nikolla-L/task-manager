import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { IncomingHttpHeaders } from 'http';
import property from 'src/configuration/property';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto): Promise<any> {
    const userData = await this.validateUser(loginDto);
    if(userData) {
        const payload = {
          fullName: userData.fullName,
          sub: userData.id,
          userId: userData.id
        };
        
        let {password, ...user} = userData;
        return {
          user: user,
          access_token: this.jwtService.sign(payload)
        };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateUser(loginDto: LoginDto): Promise<User> {
		const user = await this.usersService.findByEmail(loginDto.email);
    if(user) {
      const isPasswordMatching = await bcrypt.compare(
        loginDto.password,
        user.password
      );

      if(isPasswordMatching) return user;
    }
    return null;
	}

  public getUsersCredentials(headers: IncomingHttpHeaders) {
    if(headers.authorization) {
      let token = headers.authorization.split(' ')[1];
      return this.jwtService.verify(token, {secret: property.JWT_SECRET});
    } else {
      throw new UnauthorizedException();
    }
  }
}
