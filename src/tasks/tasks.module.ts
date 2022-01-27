import { Module } from '@nestjs/common';
import { BoardsService } from 'src/boards/boards.service';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TasksController],
  providers: [TasksService, BoardsService]
})
export class TasksModule {}
