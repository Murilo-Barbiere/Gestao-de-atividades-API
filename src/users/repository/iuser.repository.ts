import { UserEntity } from "../entity/user.entity";
import { UserCreateDto } from "../dto/user.create.dto";
import { UserUpdataDto } from "../dto/user.update.dto";

export abstract class IUserRepository{
    abstract findById(id: number): Promise<UserEntity>;
    abstract findByEmail(email: string): Promise<UserEntity | null>;
    abstract create(data: UserCreateDto): Promise<UserEntity>;
    abstract update(id: number, data: UserUpdataDto): Promise<UserEntity>;
    abstract delete(id: number): Promise<void>;    
}