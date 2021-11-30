import { FindAllAbstractPayloadDto } from '@commom/dto/find-all-abstract-payload.dto';
import { EntryDto } from './entry.dto';

export class FindAllEntriesPayloadDto extends FindAllAbstractPayloadDto<EntryDto> {}
