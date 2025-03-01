import { ApiProperty } from '@nestjs/swagger';
import { ProducerIntervalDto } from '@movie/dto';
import { ValidateNested } from 'class-validator';
import { IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export default class AwardInterval {
	@ApiProperty({
		description:
			'Produtores com menor intervalo entre dois prêmios consecutivos',
		type: [ProducerIntervalDto],
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ProducerIntervalDto)
	min: ProducerIntervalDto[];

	@ApiProperty({
		description:
			'Produtores com maior intervalo entre dois prêmios consecutivos',
		type: [ProducerIntervalDto],
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ProducerIntervalDto)
	max: ProducerIntervalDto[];
}
