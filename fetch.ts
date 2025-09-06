import Database from 'better-sqlite3';
import { readFileSync, writeFileSync } from 'fs';
import * as cheerio from 'cheerio';
import { plainify } from './src/lib/utils.ts';

const db = new Database('data/jihacheol.db');
db.exec('PRAGMA journal_mode = WAL');

// We will use more comprehensive line IDs in database.
const SVG_ID_TABLE: Record<string, string> = {
	// 왜 그러신건가요?
	'2-1': '1',
	'3-2': '2',
	'4-3': '3',
	'5-4': '4',
	'6-5': '5',
	'7-6': '6',
	'8-7': '7',
	'9-8': '8',
	'10-9': '9',
	// I1 하지
	I: 'incheon1',
	I2: 'incheon2',
	B: 'suinbundang',
	S: 'sinbundang',
	K: 'gyeonguijungang',
	A: 'arex',
	G: 'gyeongchun',
	U: 'uijeongbu',
	E: 'everline',
	KK: 'gyeongang',
	W: 'uilrt',
	SH: 'seohae',
	KP: 'gimpo',
	SL: 'sillim',
	'1-GA': 'gtx-a'
};

db.exec(
	'CREATE TABLE IF NOT EXISTS Stops(id TEXT PRIMARY KEY, name TEXT, plain_name TEXT, lines TEXT)'
);

const cyberStationHTML = readFileSync('cyberStation.html', { encoding: 'utf-8' });
const $ = cheerio.load(cyberStationHTML);

const stops = $('svg text');

const addStop = db.prepare('INSERT OR IGNORE INTO Stops VALUES (?,?,?,?)');

stops.each(function () {
	const elm = $(this);
	const id = elm.attr('id');
	const linesRaw = elm.attr('lineid');
	if (!id || !linesRaw) return;
	const lines = linesRaw.split(' ').map((l) => SVG_ID_TABLE[l]);
	let name = '';
	elm.children('tspan').each(function () {
		name += $(this).text().trim();
	});
	const plainName = plainify(name);
	addStop.run(id, name, plainName, lines.join(','));
});

// SVG MAP SAVE;

const svg = $('svg').first();

svg.find('text').remove();
svg.find('path, rect, g, line, circle').each(function () {
	// Remove accessibility red indicators
	if ($(this).attr('id')?.startsWith('A')) return void $(this).remove();
	$(this).attr('style', 'opacity: 1');
});

writeFileSync('src/assets/map.svelte', svg.toString());
