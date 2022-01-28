import { IsNotEmpty, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    login: string

    @IsNotEmpty()
    @MinLength(3)
    password: string
}