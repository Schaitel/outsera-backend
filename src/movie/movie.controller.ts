import { Controller, Get } from '@nestjs/common';
import { AwardInterval } from '@movie/dto';
import MovieService from '@movie/movie.service';

@Controller('movies')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('awards/intervals')
	getProducerAwardIntervals(): Promise<AwardInterval> {
		return this.movieService.getProducerAwardIntervals();
	}
}
