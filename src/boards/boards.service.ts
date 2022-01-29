import {  Injectable} from '@nestjs/common';
import {v4 as uuidv4 } from 'uuid';
import { UpdateBoardDto } from './dto/update-board.dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board, ColumnEntity } from './boards.entity';
import { Repository } from 'typeorm';



// let boards = [{
//     id: "11111111-1111-1111-1111-111111111111" ,
//     title: 'board 1',
//     columns: [
//         { title: 'Backlog', order: 1 },
//         { title: 'Sprint', order: 2 }
//       ]
// }]

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardsRepository: Repository<Board>,
        
        @InjectRepository(ColumnEntity)
        private columnReporitory: Repository<ColumnEntity>
        ) {}
        

    async getAll():Promise<Board[]> {
        let allBoards = await this.boardsRepository.find({relations: ['columns']})
        allBoards.forEach(board => {
            board.columns.sort((col1, col2) => {
                return (col1.order - col2.order);
            })
        })
        
        return allBoards;
    }

    async getById(id: string): Promise<Board> {
        const board = await this.boardsRepository.findOne({id: id}, { relations: ['columns']});
        board.columns.sort((col1, col2) => {
            return (col1.order - col2.order);
        })
        return board;
    }

    async create(boardData: CreateBoardDto ): Promise<Board>{
       const board = new Board();
       board.id = uuidv4();
       board.title = boardData.title;
       const modCol = boardData.columns.map(({title, order}) => { 
            const newColEnt = new ColumnEntity();
            newColEnt.id = uuidv4();
            newColEnt.title = title;
            newColEnt.order = order;
            return newColEnt;   
        })
        for(const el of modCol) {
            await this.columnReporitory.save(el);
        }
        board.columns = modCol;
    
        await this.boardsRepository.save(board);
        return board;
    }

    async remove(id: string): Promise<void> {
        await this.boardsRepository.delete(id);
    }

    async update(id: string, boardData: UpdateBoardDto){
      const board = await this.boardsRepository.findOne({id: id}, { relations: ['columns']});
      board.title = boardData.title || board.title;
      if(boardData.columns?.length){
        const modCol = boardData.columns.map(({id, title, order}) => { 
            const newColEnt = new ColumnEntity();
            if(!id){
                newColEnt.id = uuidv4()
            }else{
                newColEnt.id = id;
            }
            newColEnt.title = title;
            newColEnt.order = order; 
            return newColEnt;
        })
        for(const el of modCol) {
            await this.columnReporitory.save(el);
        }
        board.columns = modCol;
    }

    await this.boardsRepository.save(board);

    return board;
    }

}
