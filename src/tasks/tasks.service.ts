import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { ITask } from './task.interfaces';
import {v4 as uuidv4 } from 'uuid';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

let tasks = [
    {
        id: '00000000-0000-0000-0000-000000000000' ,
        title: 'task 1',
        order: 1,
        description: 'task description',
        userId: '11111111-0000-0000-0000-000000000000',
        boardId: "11111111-1111-1111-1111-111111111111",
        columnId: null
    }
] as ITask[]

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>) {}

    async getAll(boardId: string):Promise<Task[]> {
        const boardTasks = await this.tasksRepository.find({boardId: boardId});
        return boardTasks;
    }

    async getById(boardId: string, id: string): Promise<Task> {
        const boardTasks = await this.tasksRepository.find({boardId: boardId});
        const task = boardTasks.find(t => t.id === id);
        return task;
    }

    // create(boardId: string, taskData: CreateTaskDto ): ITask {
    //     const task = taskData;
    //     task.id = uuidv4();
    //     if(task.boardId === null){
    //         task.boardId = boardId;
    //     }
    //     tasks.push(task);
    //     return this.getById(boardId, task.id);
        
    // }

    // remove( id: string): void {

    //     tasks = tasks.filter(t => t.id !== id);
    // }

    // update(boardId: string, id: string, taskData: UpdateTaskDto ): ITask{
    //     let task = this.getById(boardId, id);
    //     task.title = taskData.title || task.title;
    //     task.order = taskData.order || task.order;
    //     task.description = taskData.description || task.description;
    //     task.boardId = taskData.boardId || task.boardId;
    //     task.userId = taskData.userId || task.userId;
    //     task.columnId = taskData.columnId || task.columnId
    //     return task;
        
    // }
        
    // nullUserId(userId: string):void {
    //     tasks.forEach(t => {
    //         if(t.userId === userId){
    //             t.userId = null;
    //         }
    //     })
    // }
}
