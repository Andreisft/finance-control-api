import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@commom/entities/abstract.entity';

@Entity({ name: 'categories' })
export class Category extends AbstractEntity {
  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
  })
  description?: string;
}
