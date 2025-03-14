import { Injectable, OnModuleInit } from '@nestjs/common';
import {
	AwardIntervalDto,
	IMovieRecord,
	ProducerIntervalDto,
} from '@movie/dto';
import MovieRepository from '@movie/movie.repository';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';

@Injectable()
export default class MovieService implements OnModuleInit {
	constructor(private readonly movieRepository: MovieRepository) {}

	importCsvData(): IMovieRecord[] {
		const fileName = 'movielist.csv';
		const csvFilePath = path.resolve(__dirname, '..', 'assets', fileName);

		try {
			const csvContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

			const records: IMovieRecord[] = parse(csvContent, {
				columns: true,
				delimiter: ';',
				skip_empty_lines: true,
				trim: true,
			}) as IMovieRecord[];

			return records;
		} catch (error) {
			console.error('Erro ao ler arquivo CSV:', error);
			throw error;
		}
	}

	async loadMoviesFromCSV() {
		try {
			const records = this.importCsvData();

			for (const record of records) {
				const existingMovie = await this.movieRepository.getMovie(
					record.title,
					parseInt(record.year),
				);

				if (!existingMovie) {
					await this.movieRepository.createMovie({
						title: record.title,
						year: parseInt(record.year),
						studios: record.studios,
						producers: record.producers,
						winner: record?.winner === 'yes' ? true : false,
					});
				}
			}
		} catch (error) {
			console.error('Error during seed:', error);
			throw error;
		}
	}

	async onModuleInit() {
		await this.loadMoviesFromCSV();
	}

	async getWinnersProducers(): Promise<{ [key: string]: number[] }> {
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

		return producerWins;
	}

	getIntervalBetweenWins(producerWins: {
		[key: string]: number[];
	}): ProducerIntervalDto[] {
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

		return intervals;
	}

	async getProducerAwardIntervals(): Promise<AwardIntervalDto> {
		const producerWins = await this.getWinnersProducers();
		const intervals = this.getIntervalBetweenWins(producerWins);

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
