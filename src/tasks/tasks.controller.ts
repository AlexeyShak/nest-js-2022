import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from './task.interfaces';
import { TasksService } from './tasks.service';

@Controller('boards/:boardId/tasks')
export class TasksController {
    constructor(private readonly taskServise: TasksService, private readonly boardsServise: BoardsService ){}


    @Get()
        getAll(
            @Param('boardId') boardId: string
        ):ITask[] {

            return this.taskServise.getAll(boardId);
        }
    @Get(':taskId')
    getById( 
        @Param('boardId') boardId: string,
        @Param('taskId') id: string
    ): ITask {
        return this.taskServise.getById(boardId, id);
    }

    @Post()
    createBoard(
        @Param('boardId') boardId: string,
        @Body() createTask: CreateTaskDto
    ): ITask{
        return this.taskServise.create(boardId, createTask)
    }

    @Put(':boardId')
    updateUser(
        @Param('boardId') boardId: string,
        @Param('taskId') id: string,
        @Body() updateTask: UpdateTaskDto
    ){
        return this.taskServise.update(boardId, id, updateTask);
    }

    @Delete(':boardId')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeUser(
        @Param('taskId') id: string
    ): void {
        this.boardsServise.remove(id)
    }
}
