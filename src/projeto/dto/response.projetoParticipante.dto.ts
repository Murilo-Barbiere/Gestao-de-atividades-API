import { UserResponseDto } from "src/users/dto/user.response.dto";

export class ResponseProjetoParticipanteDto {
    id!: number;
    nome!: string;
    participantes!: UserResponseDto[];
}
