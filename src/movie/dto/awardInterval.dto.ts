import { ApiProperty } from '@nestjs/swagger';
import { ProducerInterval } from '@movie/dto';

export default class AwardInterval {
  @ApiProperty({
    required: true,
    type: ProducerInterval,
    isArray: true,
  })
  min: ProducerInterval[];
  @ApiProperty({
    required: true,
    type: ProducerInterval,
    isArray: true,
  })
  max: ProducerInterval[];
}
