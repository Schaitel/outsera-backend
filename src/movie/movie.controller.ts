import { Controller, Get } from '@nestjs/common';
import { AwardIntervalDto } from '@movie/dto';
import MovieService from '@movie/movie.service';

@Controller('movies')
export default class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('awards/intervals')
	getProducerAwardIntervals(): Promise<AwardIntervalDto> {
		return this.movieService.getProducerAwardIntervals();
	}
}
