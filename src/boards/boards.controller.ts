import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import { IBoard } from './board.interface';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsServise: BoardsService ){}


    @Get()
        getAll():IBoard[] {
            return this.boardsServise.getAll();
        }
    @Get('/:boardId')
    getById( 
        @Param('boardId') id: string
    ): IBoard {
        return this.boardsServise.getById(id);
    }

    @Post()
    createBoard(
        @Body() createBoard: CreateBoardDto
    ): IBoard {
        return this.boardsServise.create(createBoard)
    }

    @Put(':boardId')
    updateUser(
        @Param('boardId') id: string,
        @Body() updateBoard: UpdateBoardDto
    ){
        return this.boardsServise.update(id, updateBoard);
    }

    @Delete(':boardId')
    @HttpCode(HttpStatus.NO_CONTENT)
    removeUser(
        @Param('boardId') id: string
    ): void {
        this.boardsServise.remove(id)
    }
}
