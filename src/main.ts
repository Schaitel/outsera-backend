import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	app.use(json());

	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 204,
	});

	app.useStaticAssets(join(__dirname, '..', 'assets'));

	await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
	console.error('Error starting app', err);
});
