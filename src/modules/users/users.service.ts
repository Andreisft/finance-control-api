import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';
import { Connection } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly connection: Connection) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;
      const passwordHash = await hash(password);

      const { identifiers } = await this.connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
          ...rest,
          password: passwordHash,
        })
        .execute();

      console.log(createUserDto);

      return { ...createUserDto, id: identifiers[0].id };
    } catch (error) {
      throw new BadRequestException(
        'Ocorreu um erro ao tentar criar o usuário',
      );
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // migrate to generics (in the future)

  async findByEmail(email: string) {
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async findByUsername(username: string) {
    return this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }
}
