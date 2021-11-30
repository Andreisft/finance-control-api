import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '@commom/entities/abstract.entity';

import { Entry } from '@entries/entities/entry.entity';

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

  @OneToMany(() => Entry, (entry) => entry.category, { nullable: true })
  entries: Array<Entry>;
}
