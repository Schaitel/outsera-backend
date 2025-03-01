import { Module } from '@nestjs/common';
import MovieController from '@movie/movie.controller';
import MovieService from '@movie/movie.service';
import PrismaService from '@db/prisma.service';
import MovieRepository from '@movie/movie.repository';

@Module({
	controllers: [MovieController],
	providers: [MovieService, MovieRepository, PrismaService],
	exports: [MovieService, MovieRepository],
})
export default class MovieModule {}
