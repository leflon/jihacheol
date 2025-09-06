import Database from 'better-sqlite3';
import { plainify } from './utils';
import type { Completion } from './models/completion.model';
import type { Stop } from '$lib/models/stop.model';

export const db = new Database('data/jihacheol.db');
db.exec('PRAGMA journal_mode = WAL');

export function getRandomStop(): { id: string } {
	const query = db.prepare(
		`SELECT id FROM Stops
			ORDER BY RANDOM()
			LIMIT 1`
	);
	const res = query.get();
	return res as { id: string };
}

const completionsQuery = db.prepare(
	'SELECT id, name, plain_name FROM Stops WHERE plain_name LIKE ? ORDER BY LENGTH(name) LIMIT 10'
);

export function getCompletions(input: string): Completion[] {
	input = plainify(input);
	return completionsQuery.all(`%${input}%`) as Completion[];
}

const fullStopQuery = db.prepare('SELECT * FROM Stops WHERE id = ?');
export function getStopData(id: string): { stop: Stop } | null {
	const stop: Stop = fullStopQuery.get(id) as Stop;
	if (!stop) return null;

	stop.lines = (stop.lines as any as string).split(',');
	return { stop };
}
