import { remote, Notification as Notify } from 'electron';

export const delay = (time: number) => {
  return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(null);
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
	const Notification = remote && remote.Notification || Notify;

	new Notification({
		title: '温馨提示',
		silent: false,
		icon:'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture',
		...params,
	}).show();
}

export const retry = (fn: Function, times: number, delay?: number)=> {
  var err = null;
  return new Promise(function(resolve, reject) {
    var attempt = function() {
      fn().then(resolve).catch(function(err: any) {
        if (0 == times) {
          reject(err);
        } else {
          times--;
					console.log(`还有${times}次机会`);
          setTimeout(function(){
            attempt()
          }, delay || 1);
        }
      });
    };
    attempt();
  });
};
