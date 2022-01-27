import {  Injectable} from '@nestjs/common';
import {  IBoard } from './board.interface';
import {v4 as uuidv4 } from 'uuid';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';



let boards = [{
    id: "11111111-1111-1111-1111-111111111111" ,
    title: 'board 1',
    columns: [
        { title: 'Backlog', order: 1 },
        { title: 'Sprint', order: 2 }
      ]
}]

@Injectable()
export class BoardsService {

    getAll():IBoard[] {
        boards.forEach(b => {
            b.columns.sort((col1, col2) => {
                return (col1.order - col2.order);
            })
        })
        return boards;
    }

    getById(id: string): IBoard {
        const board = boards.find(b => b.id === id);
        return board;
    }

    create(boardData: CreateBoardDto ): IBoard{
        const board = boardData as unknown as IBoard;
        board.id = uuidv4();
        boards.push(board);
        return this.getById(board.id);
        
    }

    remove(id: string): void {

        boards = boards.filter(b => b.id !== id);
    }

    update(id: string, boardData: UpdateBoardDto){
        let board = this.getById(id);
        board.title = boardData.title || board.title;
        board.columns = boardData.columns || board.columns;
        return board
    }

}
