import { Module } from '@nestjs/common';
import { PrismaService } from './db/prisma.service';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';

@Module({
  imports: [],
  controllers: [MovieController],
  providers: [MovieService, PrismaService],
})
export class AppModule {}
