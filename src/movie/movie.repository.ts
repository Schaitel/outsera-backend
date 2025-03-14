import { Injectable } from '@nestjs/common';
import PrismaService from '@db/prisma.service';
import { MovieDto } from 'prisma/dto';
import { MovieRecordDto } from '@movie/dto';

@Injectable()
export default class MovieRepository {
	constructor(private readonly prisma: PrismaService) {}

	async createMovie(movie: MovieRecordDto): Promise<MovieDto> {
		return this.prisma.movie.create({
			data: {
				title: movie.title,
				year: movie.year,
				studios: movie.studios,
				producers: movie.producers,
				winner: movie.winner,
			},
		});
	}

	async getMovie(title: string, year: number): Promise<MovieDto | null> {
		return this.prisma.movie.findFirst({
			where: { title, year },
		});
	}

	async getWinnersMovies(): Promise<MovieDto[]> {
		return this.prisma.movie.findMany({
			where: { winner: true },
			orderBy: { year: 'asc' },
		});
	}
}
