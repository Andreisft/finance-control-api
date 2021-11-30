import { CategoryDto } from '@categories/dto/category.dto';
import { EntryType } from '@entries/enums/entry-type.enum';

export class EntryDto {
  id: string;
  name: string;
  description: string;
  isPaid: boolean;
  category: CategoryDto;
  dueDate: Date;
  expectedDate: Date;
  writeOffDate: Date;
  amount: number;
  type: EntryType;
}
