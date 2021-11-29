import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Configs

import {
  TypeOrmModuleCustomOptions,
  ConfigModuleCustomOptions,
} from '@configs';

// Modules

import { CategoriesModule } from '@categories/categories.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleCustomOptions),
    TypeOrmModule.forRoot(TypeOrmModuleCustomOptions),
    CategoriesModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
