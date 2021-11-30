import { PartialType } from '@nestjs/mapped-types';
import { PaginationDto } from './pagination.dto';

export abstract class FindAllAbstractDto extends PartialType(PaginationDto) {
  textSearch?: string;
}
