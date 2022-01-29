import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    const user = await this.usersService.getByLogin(login);
    if (!user)
      throw new ForbiddenException({
        status: HttpStatus.FORBIDDEN,
        message: 'User with requested login is not found',
      });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Wrong password',
      });
    return user;
  }
  async login(user: any) {
    const payload = { login: user.login, userId: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
