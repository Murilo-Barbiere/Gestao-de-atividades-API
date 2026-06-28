import { UserEntity } from "../entity/user.entity";
import { UserCreateData } from "./data/user.create.data";

export interface IUserRepository{
    findById(id: number): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity | null>;
    create(data: UserCreateData): Promise<UserEntity>;
    update(id: number, data: UserCreateData): Promise<UserEntity>;
    delete(id: number): Promise<void>;    
}