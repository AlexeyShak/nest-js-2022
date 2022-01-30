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
import { BoardsService } from 'src/boards/boards.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard('jwt'))
@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly taskServise: TasksService) {}

  @Get()
  async getAll(@Param('boardId') boardId: string): Promise<Task[]> {
    return this.taskServise.getAll(boardId);
  }
  @Get(':taskId')
  async getById(
    @Param('boardId') boardId: string,
    @Param('taskId') id: string
  ): Promise<Task> {
    return this.taskServise.getById(boardId, id);
  }

  @Post()
  async createTask(
    @Param('boardId') boardId: string,
    @Body() createTask: CreateTaskDto
  ): Promise<Task> {
    return this.taskServise.create(boardId, createTask);
  }

  @Put(':taskId')
  async updateTask(
    @Param('boardId') boardId: string,
    @Param('taskId') id: string,
    @Body() updateTask: UpdateTaskDto
  ): Promise<Task> {
    return await this.taskServise.update(boardId, id, updateTask);
  }

  @Delete(':taskId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTask(
    @Param('boardId') boardId: string,
    @Param('taskId') id: string
    ): Promise<void> {
    this.taskServise.remove(boardId, id);
  }
}
