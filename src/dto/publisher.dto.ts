import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePublisherDTO {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string;
}

export class UpdatePublisherDTO {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    description: string;
}