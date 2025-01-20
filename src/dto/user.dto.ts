import { IsNotEmpty, IsString, IsEnum, Length, IsOptional } from 'class-validator';
import { StatusEnum } from './../database/entities/base/base.entity';
import { PersonTypeEnum } from './../database/entities/entity/user.entity';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Length(100)
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(100)
    identification: string;

    @IsNotEmpty()
    @IsString()
    @Length(100)
    carnet_number: string;

    @IsNotEmpty()
    @IsEnum(PersonTypeEnum)
    person_type: keyof typeof PersonTypeEnum;
}

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    @Length(100)
    username: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    @Length(100)
    identification: string;

    @IsOptional()
    @IsString()
    @Length(100)
    carnet_number: string;

    @IsOptional()
    @IsEnum(PersonTypeEnum)
    person_type: keyof typeof PersonTypeEnum;

    @IsOptional()
    @IsEnum(StatusEnum)
    state: keyof typeof StatusEnum;
}