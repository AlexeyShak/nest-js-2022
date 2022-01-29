import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  name?: string;

  @IsNotEmpty()
  login?: string;

  @IsNotEmpty()
  @MinLength(3)
  password?: string;
}
