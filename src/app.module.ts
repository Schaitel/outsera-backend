import { Module } from '@nestjs/common';
import MovieModule from '@movie/movie.module';
import PrismaService from '@db/prisma.service';
import PrismaModule from '@db/prisma.module';

@Module({
	imports: [MovieModule, PrismaModule],
	providers: [PrismaService],
})
export class AppModule {}
