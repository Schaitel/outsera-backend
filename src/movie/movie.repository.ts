import { PrismaService } from '@db/prisma.service';
import { MovieDto } from 'prisma/dto';

export class MovieRepository {
	constructor(private readonly prisma: PrismaService) {}

	async getProducers(): Promise<MovieDto[]> {
		return this.prisma.movie.findMany();
	}
}
