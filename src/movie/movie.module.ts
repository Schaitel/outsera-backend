import { Module } from '@nestjs/common';
import MovieController from '@movie/movie.controller';
import MovieService from '@movie/movie.service';
import MovieRepository from '@movie/movie.repository';
import PrismaModule from '@db/prisma.module';

@Module({
	imports: [PrismaModule],
	controllers: [MovieController],
	providers: [MovieService, MovieRepository],
	exports: [MovieService, MovieRepository],
})
export default class MovieModule {}
