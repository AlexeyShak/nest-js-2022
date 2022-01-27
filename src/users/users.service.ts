import { HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';
import { IUser, IUserCreate } from './user.interface';

let users = [{
    id: '11111111-0000-0000-0000-000000000000',
    name: 'admin',
    login: 'admin',
    password: 'admin'
}]

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async getAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async getById(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    
         
    }

    async create(userData:CreateUserDto ): Promise<User> {
        const hashPassword = await bcrypt.hash(userData.password, 3);
        const user = new User();
        user.id = uuidv4();
        user.name = userData.name;
        user.login = userData.login;
        user.password = hashPassword;
        await this.usersRepository.save(user);
        return this.getById(user.id);
        
    }

    // remove(id: string): void {

    //     users = users.filter(u => u.id !== id);
    // }

    // update(id: string, userData: UpdateUserDto ){
    //     let user = this.getById(id);
    //     if(!user) throw new NotFoundException({
    //         status: HttpStatus.NOT_FOUND,
    //         error: 'User with requested ID not found, please check the ID input'
    //     })
    //     user.name = userData.name || user.name;
    //     user.login = userData.login || user.login;
    //     user.password = userData.password || user.password;
    //     return user;
        
    // }
}
