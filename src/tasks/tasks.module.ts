import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from 'src/boards/boards.entity';
import { BoardsService } from 'src/boards/boards.service';
import { User } from 'src/users/user.entity';
import { Task } from './task.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Board, Task, User])],
  controllers: [TasksController],
  providers: [TasksService, BoardsService]
})
export class TasksModule {}
