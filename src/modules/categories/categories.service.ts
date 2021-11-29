import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { FindAllCategoriesPayloadDto } from './dto/find-all-categories-payload.dto';
import { FindAllCategoriesDto } from './dto/find-all-categories.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly connection: Connection) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const { identifiers } = await this.connection
        .createQueryBuilder()
        .insert()
        .into(Category)
        .values(createCategoryDto)
        .execute();

      console.log(createCategoryDto, identifiers[0].id);

      return { ...createCategoryDto, id: identifiers[0].id };
    } catch (error) {
      throw new BadRequestException(
        'Ocorreu um erro ao tentar criar  a categoria',
      );
    }
  }

  async findAll(
    findAllCategoriesDto?: FindAllCategoriesDto,
  ): Promise<FindAllCategoriesPayloadDto> {
    const query = this.connection
      .getRepository(Category)
      .createQueryBuilder('category');

    if (findAllCategoriesDto) {
      const { textSearch, limit, offset } = findAllCategoriesDto;

      if (limit) query.limit(+limit);

      if (offset) query.offset(+offset);

      if (textSearch) {
        query.andWhere('LOWER(category.name) like :name', {
          name: `%${textSearch.toLowerCase()}%`,
        });
      }
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      total,
      limit: +findAllCategoriesDto.limit,
      offset: +findAllCategoriesDto.offset,
    };
  }

  async findOne(id: string) {
    const category = await this.connection
      .getRepository(Category)
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();

    if (!category) throw new NotFoundException('Category not found!');

    return category;
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async remove(id: string) {
    return this.connection
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where('id = :id', { id })
      .execute();
  }
}
