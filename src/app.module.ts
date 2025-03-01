import { Module } from '@nestjs/common';
import MovieModule from '@movie/movie.module';
import PrismaService from '@db/prisma.service';

@Module({
	imports: [MovieModule],
	providers: [PrismaService],
})
export class AppModule {}
