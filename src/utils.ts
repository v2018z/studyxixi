export const delay = (time: number) => {
  return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}

export const domContentLoaded = (callback = () => {}) => {
	document.addEventListener('DOMContentLoaded', () => {
		callback();
	});
}

export const getRandomElement = (elements: any[]) => {
	if (elements.length === 0) return {};
	return elements[Math.floor(Math.random() * elements.length)];
}

export const getRandomNumberBetween = (begin: number, end: number) => {
	return Math.random() * (end - begin) + begin;
}

export const getStrCount = (scrStr: string, armStr: string): number => {
	let count=0;
	while(scrStr.indexOf(armStr) !== -1) {
		scrStr = scrStr.replace(armStr, '');
		count++;    
	}
	return count;
}

export const notify = (params: { body: string }) => {
	// tslint:disable-next-line:no-unused-expression
	return new Notification('温馨提示', {
		silent: false,
		icon:'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
		...params,
	});
}