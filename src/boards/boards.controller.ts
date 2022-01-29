import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsServise: BoardsService) {}

  @Get()
  async getAll(): Promise<Board[]> {
    return await this.boardsServise.getAll();
  }
  @Get('/:boardId')
  async getById(@Param('boardId') id: string): Promise<Board> {
    return await this.boardsServise.getById(id);
  }

  @Post()
  async createBoard(@Body() createBoard: CreateBoardDto): Promise<Board> {
    return await this.boardsServise.create(createBoard);
  }

  @Put(':boardId')
  async updateBoard(
    @Param('boardId') id: string,
    @Body() updateBoard: UpdateBoardDto
  ) {
    return await this.boardsServise.update(id, updateBoard);
  }

  @Delete(':boardId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeBoard(@Param('boardId') id: string): Promise<void> {
    this.boardsServise.remove(id);
  }
}
