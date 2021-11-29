import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_INTERCEPTOR } from '@nestjs/core';

// Configs

import {
  TypeOrmModuleCustomOptions,
  ConfigModuleCustomOptions,
} from '@configs';

// Modules

import { CategoriesModule } from '@categories/categories.module';
import { UsersModule } from './modules/users/users.module';

// Validators

import { EmailExistsValidator } from '@commom/validators/email-exists.validator';
import { UsernameExistsValidator } from '@commom/validators/username-exists.validator';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleCustomOptions),
    TypeOrmModule.forRoot(TypeOrmModuleCustomOptions),
    CategoriesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    EmailExistsValidator,
    UsernameExistsValidator,
  ],
})
export class AppModule {}
