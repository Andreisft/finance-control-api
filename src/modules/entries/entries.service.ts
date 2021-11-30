import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEntryDto } from '@entries/dto/create-entry.dto';
import { UpdateEntryDto } from '@entries/dto/update-entry.dto';
import { Entry } from '@entries/entities/entry.entity';
import { Connection } from 'typeorm';
import { FindAllEntriesDto } from './dto/find-all-entries.dto';
import { FindAllEntriesPayloadDto } from './dto/find-all-entries-payload.dto';

@Injectable()
export class EntriesService {
  constructor(private readonly connection: Connection) {}

  async create(createEntryDto: CreateEntryDto) {
    try {
      const { categoryId, ...rest } = createEntryDto;
      const { identifiers } = await this.connection
        .createQueryBuilder()
        .insert()
        .into(Entry)
        .values({
          ...rest,
          category: { id: categoryId },
        })
        .execute();

      return { ...createEntryDto, id: identifiers[0].id };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        'Ocorreu um erro ao tentar criar um lançamento',
      );
    }
  }

  async findAll(
    findAllEntriesDto?: FindAllEntriesDto,
  ): Promise<FindAllEntriesPayloadDto> {
    const query = this.connection
      .getRepository(Entry)
      .createQueryBuilder('entry');

    if (findAllEntriesDto) {
      console.log(findAllEntriesDto);
      const { textSearch, limit, offset } = findAllEntriesDto;

      if (limit) query.limit(+limit);

      if (offset) query.offset(+offset);

      if (textSearch) {
        query.andWhere('LOWER(entry.name) like :name', {
          name: `%${textSearch.toLowerCase()}%`,
        });
      }
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      limit: +findAllEntriesDto.limit,
      offset: +findAllEntriesDto.offset,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} entry`;
  }

  update(id: number, updateEntryDto: UpdateEntryDto) {
    return `This action updates a #${id} entry`;
  }

  remove(id: number) {
    return `This action removes a #${id} entry`;
  }
}
