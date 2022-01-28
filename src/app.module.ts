import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Board, ColumnEntity } from './boards/boards.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '111',
      database: 'postgres',
      entities: [User, Board, Task, ColumnEntity],
      synchronize: true
    }),
    UsersModule, 
    BoardsModule, 
    TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
