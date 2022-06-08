import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class ConfirmCodeDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

}