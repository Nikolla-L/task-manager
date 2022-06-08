import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Status } from 'src/entities/task.entity';

export class FilterTaskDto {

    @ApiProperty({required: false})
    @IsEnum(Status)
    @IsOptional()
    status: Status;

    @ApiProperty({required: false})
    @IsNumber()
    @IsOptional()
    userId: number;

    @ApiProperty({required: false})
    @IsOptional()
    dueDate: Date;

}