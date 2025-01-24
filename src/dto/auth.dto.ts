import { Expose } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"

export class SignInDTO {
    @IsNotEmpty()
    @IsString()
    @Expose()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string
}