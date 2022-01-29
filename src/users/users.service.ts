import { HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getAll(): Promise<User[]> {
      this.logger.log('getALl');
    return this.usersRepository.find();
  }

  async getById(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async create(userData: CreateUserDto): Promise<User> {
    const hashPassword = await bcrypt.hash(userData.password, 3);
    const user = new User();
    user.id = uuidv4();
    user.name = userData.name;
    user.login = userData.login;
    user.password = hashPassword;
    await this.usersRepository.save(user);
    return this.getById(user.id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, userData: UpdateUserDto): Promise<User> {
    const user = await this.getById(id);
    if (!user)
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'User with requested ID not found, please check the ID input',
      });
    user.name = userData.name || user.name;
    user.login = userData.login || user.login;
    user.password = userData.password || user.password;
    await this.usersRepository.save(user);

    return this.getById(id);
  }
  async getByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ login });
  }
}
