export class CreateTaskDto {
    id?: string
    readonly title: string
    readonly order: number
    readonly description: string
    readonly userId: string | null
    boardId: string
    readonly columnId: string | null
}