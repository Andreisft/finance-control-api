import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

// Configs

import {
  TypeOrmModuleCustomOptions,
  ConfigModuleCustomOptions,
} from '@configs';

// Modules

import { CategoriesModule } from '@categories/categories.module';
import { UsersModule } from '@users/users.module';

// Validators

import { EmailExistsValidator } from '@commom/validators/email-exists.validator';
import { UsernameExistsValidator } from '@commom/validators/username-exists.validator';

// Guards

import { JwtAuthGuard } from '@commom/guards/jwt-auth.guard';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleCustomOptions),
    TypeOrmModule.forRoot(TypeOrmModuleCustomOptions),

    CategoriesModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },

    // EmailExistsValidator,
    // UsernameExistsValidator,
  ],
})
export class AppModule {}
