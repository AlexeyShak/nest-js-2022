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
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import {PG_USER, PG_DATABASE, PG_PASSWORD, PG_PORT} from './config/config'
import { UsersService } from './users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'nest-js-2022_database_1',
      port: PG_PORT,
      username: 'postgres',
      password: '111',
      database: 'postgres',
      entities: [User, Board, Task, ColumnEntity],
      synchronize: true,
    }),
    ConfigModule.forRoot(),
    UsersModule,
    BoardsModule,
    TasksModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
