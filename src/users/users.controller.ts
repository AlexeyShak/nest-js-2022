import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomFilter } from 'src/custom.filter';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@UseGuards(AuthGuard('jwt'))
@UseFilters(new CustomFilter())
@Controller('users')
export class UsersController {
  constructor(private readonly usersServise: UsersService) {}
  @Get()
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersServise.getAll();
    return users;
  }

  @Get('/:userId')
  async getById(@Param('userId') id: string): Promise<User> {
    const user = await this.usersServise.getById(id);
    return user;
  }

  @Post()
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.usersServise.create(createUser);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') id: string,
    @Body() updateUser: UpdateUserDto
  ): Promise<User> {
    return await this.usersServise.update(id, updateUser);
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeUser(@Param('userId') id: string): Promise<void> {
    return await this.usersServise.remove(id);
  }
}
