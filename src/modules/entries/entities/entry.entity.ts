import { Category } from '@categories/entities/category.entity';
import { AbstractEntity } from '@commom/entities/abstract.entity';
import { EntryType } from '@entries/enums/entry-type.enum';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'entries' })
export class Entry extends AbstractEntity {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({ default: false })
  isPaid: boolean;

  @ManyToOne(() => Category, (category) => category.entries, {
    nullable: false,
  })
  category: Category;

  @Column({
    type: 'date',
  })
  dueDate: Date;

  @Column({
    type: 'date',
  })
  expectedDate: Date;

  @Column({
    type: 'date',
    nullable: true,
  })
  writeOffDate: Date;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: EntryType,
  })
  type: EntryType;
}
