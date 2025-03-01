import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MovieTitleYearUniqueInputDto {
	@ApiProperty({
		type: 'string',
	})
	@IsNotEmpty()
	@IsString()
	title: string;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	@IsNotEmpty()
	@IsInt()
	year: number;
}

@ApiExtraModels(MovieTitleYearUniqueInputDto)
export class ConnectMovieDto {
	@ApiProperty({
		type: 'integer',
		format: 'int32',
		required: false,
		nullable: true,
	})
	@IsOptional()
	@IsInt()
	id?: number;
	@ApiProperty({
		type: MovieTitleYearUniqueInputDto,
		required: false,
		nullable: true,
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => MovieTitleYearUniqueInputDto)
	title_year?: MovieTitleYearUniqueInputDto;
}
