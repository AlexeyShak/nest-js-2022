import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { BoardsController } from './boards.controller';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Board])],
  controllers: [BoardsController],
  providers: [BoardsService, UsersService]
})
export class BoardsModule {}
