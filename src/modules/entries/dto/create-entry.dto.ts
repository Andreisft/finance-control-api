import { EntryType } from '@entries/enums/entry-type.enum';
import {
  IsBoolean,
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateEntryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  paid: boolean;

  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;

  @IsDateString()
  @IsOptional()
  writeOffDate: Date;

  @IsDateString()
  @IsNotEmpty()
  expectedDate: Date;

  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  type: EntryType;
}
