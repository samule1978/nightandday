'use strict';

export function addGlobalEventListener(
	type,
	selector,
	callback,
	options,
	parent = document
) {
	parent.addEventListener(
		type,
		(e) => {
			if (e.target.matches(selector)) callback(e);
		},
		options
	);
}

export function elemsByTag(selector, parent = document) {
	return parent.getElementsByTagName(selector);
}

export function qs(selector, parent = document) {
	return parent.querySelector(selector);
}

export function qsa(selector, parent = document) {
	return [...parent.querySelectorAll(selector)];
}

export function createElement(type, options = {}) {
	const element = document.createElement(type);
	Object.entries(options).forEach(([key, value]) => {
		if (key === "classList") {
			element.classList.add(value);
			return;
		}

		if (key === "dataset") {
			Object.entries(value).forEach(([dataKey, dataValue]) => {
				element.dataset[dataKey] = dataValue;
			});
			return;
		}

		if (key === "text") {
			element.textContent = value;
			return;
		}

		if (key === "innerHTML") {
			element.innerHTML = value;
			return;
		}

		if (key === "attr" && typeof(value) === "object") {
			Object.entries(value).forEach(([key, value]) => {
				element.setAttribute(key, value);
			});
			return;
		}


		element.setAttribute(key, value);
	});
	return element;
}

export function addCss(fileName, elem = document.head) {
	let link = document.createElement("link");

	link.type = "text/css";
	link.rel = "stylesheet";
	link.href = fileName;

	elem.append(link);

	return link;
}

export function addJs(fileName, module = false, elem = document.head) {	
	let script = document.createElement("script");
	script.src = fileName;
	if (module == true) {		
		script.type = "module";
	}	
	script.async = false;

	elem.insertBefore(script, elem.firstElementChild);

	return script;
}

export function getCssPropertyValue(elem, property) {
	let value = getComputedStyle(elem).getPropertyValue(property);

	return value;
}
export function setCssPropertyValue(elem, property, value) {
	elem.style.setProperty(property, value);
}
