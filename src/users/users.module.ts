import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  controllers: [UsersController],
  providers: [UsersService, TasksService],
  imports: [TypeOrmModule.forFeature([User, Task])]
})
export class UsersModule {}
