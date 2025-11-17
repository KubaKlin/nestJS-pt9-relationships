import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './create-comment.dto';
import { UpdateCommentDto } from './update-comment.dto';
import { JwtAuthenticationGuard } from '../authentication/jwt-authentication.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() commentData: CreateCommentDto) {
    return this.commentsService.create(commentData);
  }

  @Get()
  getAll() {
    return this.commentsService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.getById(id);
  }

  @Get('article/:articleId')
  getByArticleId(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.commentsService.getByArticleId(articleId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() commentData: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, commentData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.commentsService.delete(id);
  }
}

