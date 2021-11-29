import { PaginationDto } from '@commom/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CategoryDto } from './category.dto';

export class FindAllCategoriesPayloadDto extends PartialType(PaginationDto) {
  data: Array<CategoryDto>;
  total: number;
}
