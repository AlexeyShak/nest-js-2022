import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    if(!task)
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'Task with requested ID not found, please check the ID input',
    });
    return task;
  }

  async create(boardId: string, taskData: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.id = uuidv4();
    task.title = taskData.title;
    task.order = taskData.order;
    task.description = taskData.description;
    task.userId = taskData.userId;
    if(!taskData.boardId){
      task.boardId = boardId
    }
    else {task.boardId = boardId;}
    task.columnId = taskData.columnId;
    await this.tasksRepository.save(task);
    return this.getById(boardId, task.id);
  }

  async remove(boardId: string, id: string): Promise<void> {
    const boardTasks = await this.tasksRepository.find({ boardId: boardId });
    if(!boardTasks)
    throw new NotFoundException({
      status: HttpStatus.NOT_FOUND,
      error: 'No tasks on that board, please check the ID input',
    });
    const task = boardTasks.find((t) => t.id === id);
    if(!task)
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Task with requested ID not found, please check the ID input',
      });
    this.tasksRepository.delete({id:task.id});
  }

  async update(
    boardId: string,
    id: string,
    taskData: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.getById(boardId, id);
    console.log('TASKDATA:', taskData, task);
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
