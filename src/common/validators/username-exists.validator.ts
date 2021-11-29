import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UsersService } from '@users/users.service';

@ValidatorConstraint({ name: 'UsernameExists', async: true })
@Injectable()
export class UsernameExistsValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(username: string): Promise<boolean> {
    const user = await this.usersService.findByUsername(username);

    if (user) return false;

    return true;
  }

  defaultMessage?(): string {
    return 'Username exists!';
  }
}
