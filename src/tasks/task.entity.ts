import 'reflect-metadata';
import { Board, ColumnEntity } from 'src/boards/boards.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ nullable: true })
  userId!: string;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @Column({ nullable: true })
  boardId!: string;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'columnId' })
  column!: ColumnEntity;

  @Column({ nullable: true })
  columnId!: string;

  toResponse() {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId ? this.userId : null,
      boardId: this.boardId ? this.boardId : null,
      columnId: this.columnId ? this.columnId : null,
    };
  }
}
