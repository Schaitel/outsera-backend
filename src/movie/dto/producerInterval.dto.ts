import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { IsString } from 'class-validator';

export default class ProducerIntervalDto {
	@ApiProperty({
		description: 'Nome do produtor',
		example: 'Producer 1',
	})
	@IsString()
	producer: string;

	@ApiProperty({
		description: 'Intervalo entre vitórias consecutivas',
		example: 1,
	})
	@IsNumber()
	interval: number;

	@ApiProperty({
		description: 'Ano da vitória anterior',
		example: 2008,
	})
	@IsNumber()
	previousWin: number;

	@ApiProperty({
		description: 'Ano da vitória seguinte',
		example: 2009,
	})
	@IsNumber()
	followingWin: number;
}
