import { Injectable } from '@nestjs/common';
import { AwardIntervalDto, ProducerIntervalDto } from '@movie/dto';
import MovieRepository from '@movie/movie.repository';

@Injectable()
export default class MovieService {
	constructor(private readonly movieRepository: MovieRepository) {}

	async getProducerAwardIntervals(): Promise<AwardIntervalDto> {
		const winners = await this.movieRepository.getWinnersMovies();

		const producerWins: { [key: string]: number[] } = {};

		winners.forEach((movie) => {
			const producers = movie.producers
				.split(/,| and /)
				.map((p) => p.trim())
				.filter((p) => p);

			producers.forEach((producer) => {
				if (!producerWins[producer]) {
					producerWins[producer] = [];
				}
				producerWins[producer].push(movie.year);
			});
		});

		const intervals: ProducerIntervalDto[] = [];

		Object.entries(producerWins).forEach(([producer, years]) => {
			if (years.length >= 2) {
				for (let i = 1; i < years.length; i++) {
					intervals.push({
						producer,
						interval: years[i] - years[i - 1],
						previousWin: years[i - 1],
						followingWin: years[i],
					});
				}
			}
		});

		const sortedIntervals = intervals.sort((a, b) => a.interval - b.interval);
		const minInterval = sortedIntervals[0]?.interval || 0;
		const maxInterval =
			sortedIntervals[sortedIntervals.length - 1]?.interval || 0;

		return {
			min: sortedIntervals.filter((value) => value.interval === minInterval),
			max: sortedIntervals.filter((value) => value.interval === maxInterval),
		};
	}
}
