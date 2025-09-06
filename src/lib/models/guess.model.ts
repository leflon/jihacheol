type Correctness = 'correct' | 'incorrect' | 'partial';

export type GuessEntry<T = string> = {
	value: T;
	correct: Correctness;
};

export type Guess = {
	name: GuessEntry;
	lines: GuessEntry<string[]>;
	direction: GuessEntry<number>;
	isCorrect: boolean;
};
