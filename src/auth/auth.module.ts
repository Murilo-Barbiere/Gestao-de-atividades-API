import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth.constants.secret';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ JwtModule.register(
      {
        global: true,
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
      }
    ),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}