import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersService } from '@users/users.service';

@ValidatorConstraint({ name: 'EmailExists', async: true })
@Injectable()
export class EmailExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string): Promise<boolean> {
    const user = await this.usersService.findByEmail(email);

    if (user) return false;

    return true;
  }

  defaultMessage?(): string {
    return 'Email exists!';
  }
}
