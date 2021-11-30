import { PaginationDto } from '@commom/dto/pagination.dto';
import { PartialType } from '@nestjs/mapped-types';

export class FindAllAbstractPayloadDto<T> extends PartialType(PaginationDto) {
  data: Array<T>;
  total: number;
}
