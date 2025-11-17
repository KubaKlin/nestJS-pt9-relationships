import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ArticleDto } from './article.dto';
import { Prisma } from '../../generated/prisma';
import { PrismaError } from '../database/prisma-error.enum';
import { ArticleNotFoundException } from './article-not-fount.exception';

@Injectable()
export class ArticlesService {
  constructor(private readonly prismaService: PrismaService) {}

  create(article: ArticleDto) {
    return this.prismaService.article.create({
      data: article,
    });
  }

  getAll() {
    return this.prismaService.article.findMany();
  }

  async getById(id: number) {
    const article = await this.prismaService.article.findUnique({
      where: {
        id,
      },
    });
    if (!article) {
      throw new ArticleNotFoundException(id);
    }
    return article;
  }

  async delete(id: number) {
    try {
      return await this.prismaService.article.delete({
        where: {
          id,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ArticleNotFoundException(id);
      }
      throw error;
    }
  }

  async update(id: number, article: ArticleDto) {
    try {
      return await this.prismaService.article.update({
        data: {
          ...article,
          id: undefined,
        },
        where: {
          id,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new ArticleNotFoundException(id);
      }
      throw error;
    }
  }
}
