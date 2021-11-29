import { PaginationDto } from '@commom/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';

export class FindAllCategoriesDto extends PartialType(PaginationDto) {
  textSearch?: string;
}
