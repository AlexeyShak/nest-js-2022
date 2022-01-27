import { IsNotEmpty, MinLength } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    readonly login: string

    @IsNotEmpty()
    @MinLength(3)
    readonly password: string
}