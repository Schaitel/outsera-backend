import { Injectable } from '@nestjs/common';
import { AwardInterval } from '@movie/dto';
import { MovieRepository } from '@movie/movie.repository';

@Injectable()
export default class MovieService {
	constructor(private readonly movieRepository: MovieRepository) {}

	async getProducerAwardIntervals(): Promise<AwardInterval> {
		const producers = await this.movieRepository.getProducers();

		return Promise.resolve({
			min: [],
			max: [],
		});
	}
}
