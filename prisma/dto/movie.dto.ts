import { ApiProperty } from '@nestjs/swagger';

export class MovieDto {
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	id: number;
	@ApiProperty({
		type: 'string',
	})
	title: string;
	@ApiProperty({
		type: 'integer',
		format: 'int32',
	})
	year: number;
	@ApiProperty({
		type: 'string',
	})
	studios: string;
	@ApiProperty({
		type: 'string',
	})
	producers: string;
	@ApiProperty({
		type: 'boolean',
	})
	winner: boolean;
}
