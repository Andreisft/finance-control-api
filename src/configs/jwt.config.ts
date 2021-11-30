import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtModuleCustomOptions: JwtModuleOptions = {
  secret: process.env.SECRET_KEY,
  signOptions: {
    expiresIn: '3h',
  },
};
