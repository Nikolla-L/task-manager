import { PartialType } from '@nestjs/swagger';
import { AddUserDto } from './add-user.dto';

export class UpdateUserDto extends PartialType(AddUserDto) {}