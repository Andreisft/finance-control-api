import { registerDecorator, ValidationOptions } from 'class-validator';

import { EmailExistsValidator } from '@commom/validators/email-exists.validator';

export function EmailExists(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'EmailExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: EmailExistsValidator,
    });
  };
}
