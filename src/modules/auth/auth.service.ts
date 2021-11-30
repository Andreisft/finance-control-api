import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

// Services

import { UsersService } from '@users/users.service';
import { verify } from 'argon2';

// Dto's

import { SignInDto } from '@auth/dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInPayloadDto } from './dto/sign-in-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInPayloadDto> {
    const { username, password } = signInDto;

    const user = await this.usersService.findByUsername(username);

    if (!user) throw new NotFoundException('User does not exist');

    const samePassword = await verify(user.password, password);

    if (!samePassword) throw new BadRequestException('Incorrect password');

    const token = this.jwtService.sign({ sub: user.id });

    return { user, token };
  }
}
