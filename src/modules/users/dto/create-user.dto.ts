import { EmailExists } from '@commom/decorators/email-exists.decorator';
import { UsernameExists } from '@commom/decorators/username-exists.decorator';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  // @UsernameExists()
  username: string;

  // @IsEmail()
  @EmailExists()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4, {
    message:
      'Password too short. The minimum is $constraint1 characters, but it currently has $value',
  })
  @MaxLength(20, {
    message:
      'Big too password. The most is $constraint1 characters, but it currently has $value',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
