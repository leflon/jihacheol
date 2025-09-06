export const LINE_NAMES_BY_ID: Record<string, string> = {
	'1': '1호선',
	'2': '2호선',
	'3': '3호선',
	'4': '4호선',
	'5': '5호선',
	'6': '6호선',
	'7': '7호선',
	'8': '8호선',
	'9': '9호선',
	incheon1: '인천1호선',
	incheon2: '인천2호선',
	suinbundang: '수인분당선',
	sinbundang: '신분당',
	gyeonguijungang: '경의중앙',
	arex: '공항철도',
	gyeongchun: '경춘선',
	uijeongbu: '의정부경전철',
	everline: '용인경전철',
	gyeongang: '경강선',
	uilrt: '우이신설선경전철',
	seohae: '서해선',
	gimpo: '김포도시철도',
	sillim: '신림선',
	'gtx-a': 'GTX-A'
};

export function plainify(str: string): string {
	return str.replace(/[ \-\(\)\[\]']/g, '');
}

export function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | null = null;

	return function (this: any, ...args: Parameters<T>): void {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			func.apply(this, args);
		}, delay);
	};
}
