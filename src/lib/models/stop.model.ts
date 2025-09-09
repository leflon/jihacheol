export type Stop = {
	id: string;
	name: string;
	/* Name without accents */
	plain_name: string;
	lines: string[];
	x: number;
	y: number;
};
