import { IsString, IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    dueDate: Date;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    userIds: any[];

}