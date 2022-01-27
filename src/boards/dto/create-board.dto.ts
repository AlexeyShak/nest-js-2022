import { ColumnInterface } from "../board.interface"

export class CreateBoardDto {
    id?: string
    readonly title: string
    readonly columns: ColumnInterface   
}