import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { StatusEnum } from './../database/entities/base/base.entity';

export class CreateBibliographyTypeDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string;
}

export class UpdateBibliographyTypeDTO {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsOptional()
    @IsEnum(StatusEnum)
    state: keyof typeof StatusEnum;
}