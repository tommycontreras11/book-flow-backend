import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

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
}