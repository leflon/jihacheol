import { json, type RequestHandler } from '@sveltejs/kit';
import { getStopData } from '$lib/db';
import type { GuessEntry } from '$lib/models/guess.model';

function distanceAndAngle(geo1: [number, number], geo2: [number, number]): [number, number] {
	const [lon1, lat1] = geo1;
	const [lon2, lat2] = geo2;

	const R = 6371000; // Earth's radius in meters
	const toRad = (deg: number) => (deg * Math.PI) / 180;
	const toDeg = (rad: number) => (rad * 180) / Math.PI;

	const dLat = toRad(lat2 - lat1);
	const dLon = toRad(lon2 - lon1);

	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	// Calculate bearing (angle from North)
	const y = Math.sin(dLon) * Math.cos(toRad(lat2));
	const x =
		Math.cos(toRad(lat1)) * Math.sin(toRad(lat2)) -
		Math.sin(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.cos(dLon);
	let bearing = Math.atan2(y, x);
	bearing = (toDeg(bearing) + 360) % 360; // Normalize to 0-360

	return [distance, bearing];
}

export const GET: RequestHandler = async ({ url }) => {
	const guess = url.searchParams.get('guess');
	const correct = url.searchParams.get('correct');
	if (!guess || !correct) {
		return json({ error: 'Missing guess or correct query parameter' }, { status: 400 });
	}

	const guessedStop = getStopData(guess);
	if (!guessedStop) {
		return json({ error: 'Guessed stop not found' }, { status: 404 });
	}

	const correctStop = getStopData(correct);
	if (!correctStop) {
		return json({ error: 'Correct stop not found' }, { status: 404 });
	}

	const name: GuessEntry = {
		value: guessedStop.stop.name,
		correct: guessedStop.stop.id === correctStop.stop.id ? 'correct' : 'incorrect'
	};

	/* Compute lines correctness value
	 * If the guessed stop has exactly the same lines as the correct stop, it's correct
	 * If the guessed stop has some lines that are in the correct stop, it's partial
	 * Else, it's incorrect
	 */
	const guessedLines = guessedStop.stop.lines;
	const correctLines = correctStop.stop.lines;

	const lines: GuessEntry<string[]> = {
		value: guessedStop.stop.lines,
		correct:
			guessedLines.length === correctLines.length &&
			guessedLines.every((line) => correctLines.includes(line))
				? 'correct'
				: guessedLines.some((line) => correctLines.includes(line))
					? 'partial'
					: 'incorrect'
	};

	console.log({
		name,
		lines,
		direction: {
			value: 360,
			correct: guess === correct ? 'correct' : 'partial'
		},
		isCorrect: guess === correct
	});
	return json({
		name,
		lines,
		direction: {
			value: 360,
			correct: guess === correct ? 'correct' : 'partial'
		},
		isCorrect: guess === correct
	});
};
