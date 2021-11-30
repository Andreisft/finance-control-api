import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const noAuth = !!this.reflector.get<boolean | undefined>(
      'noAuth',
      context.getHandler(),
    );

    if (!noAuth) return false;

    return true;
  }
}
