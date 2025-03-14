import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AwardIntervalDto } from '../src/movie/dto';

describe('MovieController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	afterEach(async () => {
		await app.close();
	});

	describe('GET /producers/awards-interval', () => {
		it('should return correct producer with minimum interval between wins', async () => {
			const response = await request(app.getHttpServer())
				.get('/movies/awards/intervals')
				.expect(200);

			const result = response.body as AwardIntervalDto;

			expect(result.min).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						producer: expect.any(String) as string,
						interval: expect.any(Number) as number,
						previousWin: expect.any(Number) as number,
						followingWin: expect.any(Number) as number,
					}),
				]),
			);

			result.min.forEach((producer) => {
				expect(producer.interval).toBe(
					producer.followingWin - producer.previousWin,
				);
			});

			const minInterval = Math.min(...result.min.map((p) => p.interval));
			result.min.forEach((producer) => {
				expect(producer.interval).toBe(minInterval);
			});
		});

		it('should return correct producer with maximum interval between wins', async () => {
			const response = await request(app.getHttpServer())
				.get('/movies/awards/intervals')
				.expect(200);

			const result = response.body as AwardIntervalDto;

			expect(result.max).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						producer: expect.any(String) as string,
						interval: expect.any(Number) as number,
						previousWin: expect.any(Number) as number,
						followingWin: expect.any(Number) as number,
					}),
				]),
			);

			result.max.forEach((producer) => {
				expect(producer.interval).toBe(
					producer.followingWin - producer.previousWin,
				);
			});

			const maxInterval = Math.max(...result.max.map((p) => p.interval));
			result.max.forEach((producer) => {
				expect(producer.interval).toBe(maxInterval);
			});
		});

		it('should validate data consistency with known examples', async () => {
			const response = await request(app.getHttpServer())
				.get('/movies/awards/intervals')
				.expect(200);

			const result = response.body as AwardIntervalDto;

			expect(result.min.length).toBeGreaterThan(0);
			expect(result.max.length).toBeGreaterThan(0);

			const currentYear = new Date().getFullYear();

			[...result.min, ...result.max].forEach((producer) => {
				expect(producer.previousWin).toBeGreaterThan(1900);
				expect(producer.previousWin).toBeLessThanOrEqual(currentYear);
				expect(producer.followingWin).toBeGreaterThan(1900);
				expect(producer.followingWin).toBeLessThanOrEqual(currentYear);
			});

			[...result.min, ...result.max].forEach((producer) => {
				expect(producer.interval).toBeGreaterThanOrEqual(0);
			});

			const minInterval = Math.min(...result.min.map((p) => p.interval));
			const maxInterval = Math.max(...result.max.map((p) => p.interval));
			expect(maxInterval).toBeGreaterThan(minInterval);
		});

		it('should handle producers with multiple wins correctly', async () => {
			const response = await request(app.getHttpServer())
				.get('/movies/awards/intervals')
				.expect(200);

			const result = response.body as AwardIntervalDto;

			[...result.min, ...result.max].forEach((producer) => {
				expect(producer.followingWin).toBeGreaterThan(producer.previousWin);
			});

			const uniqueProducersMin = new Set(
				result.min.map(
					(p) => `${p.producer}-${p.previousWin}-${p.followingWin}`,
				),
			);
			expect(uniqueProducersMin.size).toBe(result.min.length);

			const uniqueProducersMax = new Set(
				result.max.map(
					(p) => `${p.producer}-${p.previousWin}-${p.followingWin}`,
				),
			);
			expect(uniqueProducersMax.size).toBe(result.max.length);
		});

		it('should return the exact expected object from default file', async () => {
			const expectedResponse = {
				min: [
					{
						producer: 'Joel Silver',
						interval: 1,
						previousWin: 1990,
						followingWin: 1991,
					},
				],
				max: [
					{
						producer: 'Matthew Vaughn',
						interval: 13,
						previousWin: 2002,
						followingWin: 2015,
					},
				],
			};

			const response = await request(app.getHttpServer())
				.get('/movies/awards/intervals')
				.expect(200);

			const result = response.body as AwardIntervalDto;

			expect(result).toEqual(expectedResponse);
		});
	});
});
