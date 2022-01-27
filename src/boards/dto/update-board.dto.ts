import { ColumnInterface } from "../board.interface"

export class UpdateBoardDto {
    title?: string
    columns?: ColumnInterface[]   
}