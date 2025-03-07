import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(json());

	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
	});

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
