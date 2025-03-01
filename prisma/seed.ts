import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const prisma = new PrismaClient();

interface MovieRecord {
	year: string;
	title: string;
	studios: string;
	producers: string;
	winner?: string;
}

async function main() {
	console.log('Starting seed...');

	try {
		const csvFilePath = path.join(__dirname, '../movielist.csv');
		const csvContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

		const records = parse(csvContent, {
			columns: true,
			delimiter: ';',
			skip_empty_lines: true,
			trim: true,
		}) as MovieRecord[];

		console.log(`Found ${records.length} records in CSV file`);

		for (const record of records) {
			const existingMovie = await prisma.movie.findFirst({
				where: {
					title: record.title,
					year: parseInt(record.year),
				},
			});

			if (!existingMovie) {
				await prisma.movie.create({
					data: {
						year: parseInt(record.year),
						title: record.title,
						studios: record.studios,
						producers: record.producers,
						winner: record.winner?.toLowerCase() === 'yes',
					},
				});
			}
		}

		console.log('Seed completed successfully');
	} catch (error) {
		console.error('Error during seed:', error);
		throw error;
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
