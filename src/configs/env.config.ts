import { ConfigModuleOptions } from '@nestjs/config';

export const ConfigModuleCustomOptions: ConfigModuleOptions = {
  isGlobal: true,
  envFilePath: '.env',
};
