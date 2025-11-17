import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './create-article.dto';
import { UpdateArticleDto } from './update-article.dto';
import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';
import type { RequestWithUser } from '../authentication/request-with-user';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() article: CreateArticleDto, @Req() request: RequestWithUser) {
    return this.articlesService.create(article);
  }

  @Get()
  getAll() {
    return this.articlesService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.articlesService.delete(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() article: UpdateArticleDto,
  ) {
    return this.articlesService.update(id, article);
  }
}
