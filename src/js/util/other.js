"use strict";

export function isFunction(obj) {
	return (typeof obj === 'function');
}
export function isUndefined(obj) {
	return (typeof obj === 'undefined');
}
export function isNull(obj) {
	return (obj === null);
}
export function is(obj) {
	if (typeof obj === 'object' && Array.isArray(obj)) {
		if (isUndefined(obj) || isNull(obj)) {
			return false;		
		} else {
			return (obj.length === 0) ? false : true;
		}
	} else {
		return (!isUndefined(obj) && !isNull(obj));
	}	
}
export function isBoolean(obj) {
	return (typeof obj === 'boolean');
}


export function randomNumberBetween(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function sleep(duration) {
	return new Promise((resolve) => {
		setTimeout(resolve, duration);
	});
}

export function memoize(cb) {
	const cache = new Map();
	return (...args) => {
		const key = JSON.stringify(args);
		if (cache.has(key)) return cache.get(key);

		const result = cb(...args);
		cache.set(key, result);
		return result;
	};
}

export function isTouchEnabled() {
	return (
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
}

/*!
 * Run a callback function after scrolling has stopped
 * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com - https://gomakethings.com/detecting-when-a-visitor-has-stopped-scrolling-with-vanilla-javascript/
 * @param  {Function} callback The callback function to run after scrolling
 * @param  {Integer}  refresh  How long to wait between scroll events [optional]
 */
export function scrollStop (callback, refresh = 66) {

	// Make sure a valid callback was provided
	if (!callback || typeof callback !== 'function') return;

	// Setup scrolling variable
	let isScrolling;

	// Listen for scroll events
	window.addEventListener('scroll', function (event) {

		// Clear our timeout throughout the scroll
		window.clearTimeout(isScrolling);

		// Set a timeout to run after scrolling ends
		isScrolling = setTimeout(callback, refresh);

	}, false);

}