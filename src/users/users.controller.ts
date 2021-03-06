import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { Console } from 'console';
import { TasksService } from 'src/tasks/tasks.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { IUser, IUserCreate } from './user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersServise: UsersService,
        private readonly taskServise: TasksService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        const users = await this.usersServise.getAll();
        return users;
    }

    @Get('/:userId')
    async getById( 
        @Param('userId') id: string
    ): Promise<User> {
        const user = await this.usersServise.getById(id);
        return user;
    }

    @Post()
    async createUser(
        @Body() createUser: CreateUserDto
    ): Promise<User> {
        return await this.usersServise.create(createUser);
        
    }

    // @Put('/:userId')
    // updateUser(
    //     @Param('userId') id: string,
    //     @Body() updateUser: UpdateUserDto
    // ){
    //     console.log('ID: ', id)
    //     console.log('DATA', updateUser)
    //     return this.usersServise.update(id, updateUser);
    // }

    // @Delete(':userId')
    // @HttpCode(HttpStatus.NO_CONTENT)
    // removeUser(
    //     @Param('userId') id: string
    // ): void {
    //     this.usersServise.remove(id);
    //     this.taskServise.nullUserId(id)

    // }
    
}
