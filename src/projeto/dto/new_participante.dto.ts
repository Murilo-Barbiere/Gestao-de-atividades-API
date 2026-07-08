import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class NewParticipanteDto{
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email!: string;
}