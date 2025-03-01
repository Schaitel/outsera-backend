import { Injectable } from '@nestjs/common';
import PrismaService from '@db/prisma.service';
import { MovieDto } from 'prisma/dto';

@Injectable()
export default class MovieRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getWinnersMovies(): Promise<MovieDto[]> {
		return this.prisma.movie.findMany({
			where: { winner: true },
			orderBy: { year: 'asc' },
		});
	}
}
