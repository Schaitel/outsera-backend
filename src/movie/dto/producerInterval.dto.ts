import { ApiProperty } from '@nestjs/swagger';

export default class ProducerInterval {
  @ApiProperty({
    required: true,
    type: String,
  })
  producer: string;
  @ApiProperty({
    required: true,
    type: Number,
  })
  interval: number;
  @ApiProperty({
    required: true,
    type: Number,
  })
  previousWin: number;
  @ApiProperty({
    required: true,
    type: Number,
  })
  followingWin: number;
}
