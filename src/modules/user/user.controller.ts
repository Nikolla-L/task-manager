import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/jwt/jwt-auth.guard';
import { AddUserDto } from './dto/add-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Public()
  @ApiOperation({ summary: 'registration' })
  @Post()
  register(@Body() addUserDto: AddUserDto) {
    return this.userService.register(addUserDto);
  }

  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Put(':userId')
  update(@Param('userId') userId: number, @Body() user: UpdateUserDto) {
    return this.userService.update(userId, user);
  }

  @ApiBearerAuth()
  @Delete(':userId')
  remove(@Param('userId') userId: number) {
    return this.userService.remove(userId);
  }
}
