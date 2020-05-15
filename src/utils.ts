export const delay = (time: number) => {
  return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}

export const domContentLoaded = (callback = () => {}) => {
	if ('loading' === document.readyState) {
		return new Promise((resolve) => {
			document.addEventListener('DOMContentLoaded', () => resolve(callback()));
		});
	}
	callback();
}

export const getRandomElement = (elements: any[]) => {
	if (elements.length === 0) return {};
	return elements[Math.floor(Math.random() * elements.length)];
}

export const getRandomNumberBetween = (begin: number, end: number) => {
	return Math.random() * (end - begin) + begin;
}