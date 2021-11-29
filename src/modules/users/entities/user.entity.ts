import { AbstractEntity } from '@commom/entities/abstract.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({ unique: true })
  username: string;

  @Column({
    select: false,
  })
  @Exclude()
  password: string;

  @Column({ unique: true })
  email: string;
}
