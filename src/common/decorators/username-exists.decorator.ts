import { registerDecorator, ValidationOptions } from 'class-validator';

import { UsernameExistsValidator } from '@commom/validators/username-exists.validator';

export function UsernameExists(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'UsernameExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UsernameExistsValidator,
    });
  };
}
