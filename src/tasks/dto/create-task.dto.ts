import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTaskDto {
  id?: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  order: number;

  @IsNotEmpty()
  description: string;

  userId: string | null;

  @IsUUID()
  boardId: string;

  columnId: string | null;
}
