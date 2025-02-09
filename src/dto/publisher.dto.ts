import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { StatusEnum } from './../database/entities/base/base.entity';

export class CreatePublisherDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;
}

export class UpdatePublisherDTO {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsEnum(StatusEnum)
    status: keyof typeof StatusEnum;
}