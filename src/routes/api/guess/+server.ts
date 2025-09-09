import { json, type RequestHandler } from '@sveltejs/kit';
import { getStopData } from '$lib/db';
import type { GuessEntry } from '$lib/models/guess.model';

function angle(point1: [number, number], point2: [number, number]): number {
	const dx = point1[0] - point2[0];
	const dy = point1[1] - point2[1];
	const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
	return angle;
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
	return json({
		name,
		lines,
		direction: {
			value: angle(
				[correctStop.stop.x, correctStop.stop.y],
				[guessedStop.stop.x, guessedStop.stop.y]
			),
			correct: guess === correct ? 'correct' : 'partial'
		},
		isCorrect: guess === correct
	});
};
