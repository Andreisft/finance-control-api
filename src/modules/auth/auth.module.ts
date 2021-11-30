import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@users/users.module';

// Services

import { AuthService } from '@auth/auth.service';

// Controllers

import { AuthController } from '@auth/auth.controller';

// Configs

import { JwtModuleCustomOptions } from '@configs';

// Strategies

import { JwtStrategy } from '@commom/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register(JwtModuleCustomOptions),
    UsersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
