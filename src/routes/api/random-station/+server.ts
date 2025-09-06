import { json, type RequestHandler } from '@sveltejs/kit';
import { getRandomStop } from '$lib/db';

export const GET: RequestHandler = async ({ url }) => {
	const station = getRandomStop();
	return json(station);
};
