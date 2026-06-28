import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './repository/user.repository';

@Module({
    imports: [],
    controllers: [UsersController],
    providers: [UsersService, UserRepository],
    exports: [UsersService],
})
export class UsersModule {}
