import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class TagsUpdateDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name!: string;
}