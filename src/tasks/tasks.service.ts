import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async getAll(boardId: string): Promise<Task[]> {
    const boardTasks = await this.tasksRepository.find({ boardId: boardId });
    console.log(boardTasks);
    return boardTasks;
  }

  async getById(boardId: string, id: string): Promise<Task> {
    const boardTasks = await this.tasksRepository.find({ boardId: boardId });
    const task = boardTasks.find((t) => t.id === id);
    return task;
  }

  async create(boardId: string, taskData: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.id = uuidv4();
    task.title = taskData.title;
    task.order = taskData.order;
    task.description = taskData.description;
    task.userId = taskData.userId;
    task.boardId = boardId;
    task.columnId = taskData.columnId;
    await this.tasksRepository.save(task);
    return this.getById(boardId, task.id);
  }

  async remove(id: string): Promise<void> {
    this.tasksRepository.delete(id);
  }

  async update(
    boardId: string,
    id: string,
    taskData: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.getById(boardId, id);
    task.title = taskData.title || task.title;
    task.order = taskData.order || task.order;
    task.description = taskData.description || task.description;
    task.boardId = taskData.boardId || task.boardId;
    task.userId = taskData.userId || task.userId;
    task.columnId = taskData.columnId || task.columnId;

    await this.tasksRepository.save(task);
    return task;
  }
}
