"use strict";

import { createElement } from "../../util/dom.js";
import { is } from "../../util/other.js";

const DEFAULT_OPTIONS = {
	autoClose: 7000,
	position: "top-right",
	onClose: () => {},
	canClose: true,
	showProgress: true,
	parallax: true,
};

export default class Toast {
	#toastElem;
	#autoCloseInterval;
	#progressInterval;
	#removeBinded;
	#timeVisible = 0;
	#autoClose;
	#isPaused = false;
	#unpause;
	#pause;
	#visibilityChange;
	#shouldUnPause;
	#parallax;

	constructor(options) {
		this.#toastElem = createElement("div", {
			classList: "toast",			
		});
		//this.#toastElem.classList.add("mdx__style--glass");
		requestAnimationFrame(() => {
			this.#toastElem.classList.add("show");
		});
		this.#removeBinded = this.remove.bind(this);
		this.#unpause = () => (this.#isPaused = false);
		this.#pause = () => (this.#isPaused = true);
		this.#visibilityChange = () => {
			this.#shouldUnPause = document.visibilityState === "visible";
		};
		this.update({ ...DEFAULT_OPTIONS, ...options });
	}

	set autoClose(value) {
		this.#autoClose = value;
		this.#timeVisible = 0;
		if (value === false) return;

		let lastTime;
		const func = (time) => {
			if (this.#shouldUnPause) {
				lastTime = null;
				this.#shouldUnPause = false;
			}
			if (lastTime == null) {
				lastTime = time;
				this.#autoCloseInterval = requestAnimationFrame(func);
				return;
			}
			if (!this.#isPaused) {
				this.#timeVisible += time - lastTime;
				if (this.#timeVisible >= this.#autoClose) {
					this.remove();
					return;
				}
			}

			lastTime = time;
			this.#autoCloseInterval = requestAnimationFrame(func);
		};

		this.#autoCloseInterval = requestAnimationFrame(func);
	}

	set position(value) {
		const currentContainer = this.#toastElem.parentElement;
		const selector = `.toast-container[data-position="${value}"]`;
		const container =
			document.querySelector(selector) || createContainer(value);

		container.append(this.#toastElem);

		if (currentContainer == null || currentContainer.hasChildNodes())
			return;
		currentContainer.remove();
	}

	set text(value) {
		const wrapper = createElement("div", {
			classList: "toast-wrapper",
			text: value,
		});

		this.#toastElem.append(wrapper);
	}

	set html(value) {
		const wrapper = createElement("div", {
			classList: "toast-wrapper",
			innerHTML: value,
		});

		this.#toastElem.append(wrapper);
	}

	set canClose(value) {
		this.#toastElem.classList.toggle("can-close", value);
		if (value) {
			this.#toastElem.addEventListener("click", this.#removeBinded);
		} else {
			this.#toastElem.removeEventListener("click", this.#removeBinded);
		}
	}
	set showProgress(value) {
		this.#toastElem.classList.toggle("progress", value);
		this.#toastElem.style.setProperty("--_toast-progress", 1);

		if (value) {
			const func = () => {
				if (!this.#isPaused) {
					this.#toastElem.style.setProperty(
						"--_toast-progress",
						1 - this.#timeVisible / this.#autoClose
					);
				}
				this.#progressInterval = requestAnimationFrame(func);
			};

			this.#progressInterval = requestAnimationFrame(func);
		}
	}

	set parallax(value) {
		this.#parallax = value;

		if (this.#parallax) {
			this.#toastElem.classList.add("fix__ff--3d");

			if (is(VanillaTilt)) {
				VanillaTilt.init(this.#toastElem, {
					scale: 1.07,
					perspective: 2000,
					max: 15,
					glare: true,
					"max-glare": 0.1,
				});
			}
		}
	}

	set pauseOnHover(value) {
		if (value) {
			this.#toastElem.addEventListener("mouseover", this.#pause);
			this.#toastElem.addEventListener("mouseleave", this.#unpause);
		} else {
			this.#toastElem.removeEventListener("mouseover", this.#pause);
			this.#toastElem.removeEventListener("mouseleave", this.#unpause);
		}
	}

	set pauseOnFocusLoss(value) {
		if (value) {
			document.addEventListener(
				"visibilitychange",
				this.#visibilityChange
			);
		} else {
			document.removeEventListener(
				"visibilitychange",
				this.#visibilityChange
			);
		}
	}

	update(options) {
		Object.entries(options).forEach(([key, value]) => {
			this[key] = value;
		});
	}

	remove() {
		cancelAnimationFrame(this.#autoCloseInterval);
		cancelAnimationFrame(this.#progressInterval);
		const container = this.#toastElem.parentElement;
		this.#toastElem.classList.remove("show");

		if (this.#parallax && this.#toastElem.vanillaTilt) {
			this.#toastElem.vanillaTilt.destroy();
			this.#toastElem.style = null;
		}

		this.#toastElem.addEventListener("transitionend", () => {
			this.#toastElem.remove();
			if (container.hasChildNodes()) return;
			container.remove();
		});

		this.onClose();
	}
}

export function alertToast(
	msg,
	position = "center-center",
	parallax = DEFAULT_OPTIONS.parallax,
	duration = DEFAULT_OPTIONS.autoClose
) {
	const toast = new Toast({
		text: msg,
		position: position,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		autoClose: duration,
		parallax: parallax,
	});
}

export function makeToast(
	msg,
	position = "top-right",
	parallax = DEFAULT_OPTIONS.parallax,
	duration = DEFAULT_OPTIONS.autoClose
) {
	const toast = new Toast({
		text: msg,
		position: position,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		autoClose: duration,
		parallax: parallax,
	});
}

export function makeToastHtml(
	msg,
	position = "top-right",
	parallax = DEFAULT_OPTIONS.parallax,
	duration = DEFAULT_OPTIONS.autoClose
) {
	const toast = new Toast({
		html: msg,
		position: position,
		pauseOnHover: true,
		pauseOnFocusLoss: true,
		autoClose: duration,
		parallax: parallax,
	});
}

function createContainer(position) {
	const container = createElement("div", {
		classList: "toast-container",
	});
	container.dataset.position = position;
	document.body.append(container);
	return container;
}
