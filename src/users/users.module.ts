import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repository/user.repository';
import { IUserRepository } from './repository/iuser.repository';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, 
        {                                                                                                                 
            provide: IUserRepository,                                                
            useClass: UserRepository,                                       
        }, 
    ],
    exports: [UsersService, IUserRepository],
})
export class UsersModule {}
