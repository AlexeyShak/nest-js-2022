import { IsArray, IsNotEmpty } from 'class-validator';
import { ColumnInterface } from '../board.interface';

export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsArray()
  columns: ColumnInterface[];
}
