"use strict";

import {
	elemsByTag,
	addCss,
	getCssPropertyValue,
	qs,
	qsa,
	createElement,
} from "../util/dom.js";
import { range } from "../util/array.js";
import { is, scrollStop } from "../util/other.js";
import { alertToast } from "../vendor/toast/toast.js";
/**************************************************************************
 * GLOBAL CONSTANTS *
 ***************************************************************************/

/**************************************************************************
 * EVENT LISTENERS *
 ***************************************************************************/
let _getSetting = (setting) => {
	const urlParams = new URLSearchParams(window.location.search);
	const elem = qs(`[${setting}]`);

	let qsSetting = urlParams.get(setting);
	if (is(qsSetting)) {
		if (qsSetting === "true") qsSetting = true;
		if (qsSetting === "false") qsSetting = false;

		elem.setAttribute(setting, qsSetting);
	}

	let htmlSetting = elem.getAttribute(setting);
	if (is(htmlSetting)) {
		if (htmlSetting === "true") htmlSetting = true;
		if (htmlSetting === "false") htmlSetting = false;
	}

	return htmlSetting;
};
export function initSiteConfig() {
	document.addEventListener("DOMContentLoaded", function () {
		const brandOption = _getSetting("mdx-brand-option");

		const siteConfigurable = _getSetting("mdx-site-configurable");
		if (siteConfigurable) {
			addCss("https://fonts.googleapis.com/icon?family=Material+Icons");
			_initSiteConfigPanel();
			_initConfigPanel("brand");
			_observeSiteConfigPanel("brand");
			_initConfigPanel("layout");
			_observeSiteConfigPanel("layout");
			_initConfigPanel("style");
			_observeSiteConfigPanel("style");
			//_initConfigPanel("type");
			//_observeSiteConfigPanel("type");
			_initUXOrder();

			_initOptionsScroller("brand", "ctrl");
			_initOptionsScroller("layout", "alt");
			_initOptionsScroller("style", "shift");
		}
	});
}

/**************************************************************************
 * FUNCTIONS *
 ***************************************************************************/
/*scrollStop(function () {
    console.log( 'Scrolling has stopped.' );
});*/

function _detectMouseWheelDirection(e) {
	var delta = null,
		direction = false;
	if (!e) {
		// if the event is not provided, we get it from the window object
		e = window.event;
	}
	if (e.wheelDelta) {
		// will work in most cases
		delta = e.wheelDelta / 60;
	} else if (e.detail) {
		// fallback for Firefox
		delta = -e.detail / 2;
	}
	if (delta !== null) {
		direction = delta > 0 ? "up" : "down";
	}

	return direction;
}
let _initOptionsScroller = (type, fnKey) => {
	qsa(`[mdx-${type}-id]`).forEach((elem) => {
		elem.addEventListener("wheel", (e) => {
			if (
				(fnKey == "ctrl" && e.ctrlKey) ||
				(fnKey == "alt" && e.altKey) ||
				(fnKey == "shift" && e.shiftKey)
			) {
				e.stopPropagation();
				e.preventDefault();

				const optionSelected = is(elem.attributes[`mdx-${type}-option`])
					? elem.attributes[`mdx-${type}-option`].value
					: getCssPropertyValue(elem, "--_mdx-" + type + "-option");

				if (is(optionSelected)) {
					let id = is(elem.attributes[`mdx-${type}-id`])
						? elem.attributes[`mdx-${type}-id`].value
						: getCssPropertyValue(elem, "--_mdx-" + type + "-id");
					let options = is(
						elem.attributes["mdx-" + type + "-options"]
					)
						? elem.attributes["mdx-" + type + "-options"].value
						: getCssPropertyValue(
								elem,
								"--_mdx-" + type + "-options"
						  );
					if (options.includes("|")) {
						options = options.split("|");
					} else if (
						options.includes("-") &&
						options.split("-").length - 1 == 1
					) {
						options = range(
							parseInt(options.split("-")[0]),
							parseInt(options.split("-")[1])
						);
					}

					if (is(options) && Array.isArray(options)) {
						const direction = _detectMouseWheelDirection(e);
						let index = options.findIndex(
							(option) => option == optionSelected
						);
						let newIndex = index;
						if (direction === "up") {
							if (index + 1 < options.length) {
								newIndex = index + 1;
							}
						}
						if (direction === "down") {
							if (index - 1 >= 0) {
								newIndex = index - 1;
							}
						}

						const reqOption = options[newIndex];
						if (reqOption === 0) return;

						const reqPanelOption = qs(
							`siteconfig li[${type}-id='${id}'][${type}-option='${reqOption}']`
						);

						elem.setAttribute(`mdx-${type}-option`, reqOption);
						reqPanelOption.click();
					}
				}
			}
		});
	});
};

let _initUXOrder = () => {
	qsa("[mdx-ux-order]").forEach((parent) => {
		Array.from(parent.children).forEach((child, index) => {
			child.classList.add("draggable");
			child.setAttribute("draggable", "true");

			/*if (is(VanillaTilt)) {
				VanillaTilt.init(child, {
					max: 7,
					glare: true,
					"max-glare": 0.1,
					scale: 1.05,
					//axis: "y",
				});
			}*/

			child.addEventListener("dragstart", () => {
				child.classList.add("dragging");
			});

			child.addEventListener("dragend", () => {
				child.classList.remove("dragging");
			});
		});

		parent.addEventListener("dragover", (e) => {
			e.preventDefault();
			const afterElement = _getDragAfterElement(parent, e.clientY);
			const draggable = qs(".dragging");
			if (afterElement == null) {
				parent.appendChild(draggable);
			} else {
				parent.insertBefore(draggable, afterElement);
			}
		});
	});
};
let _getDragAfterElement = (container, y) => {
	const draggableElements = [
		...container.querySelectorAll(".draggable:not(.dragging)"),
	];

	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
};

let _adjustSiteConfigPanelPosition = (reset = false) => {
	// Adjust offset margin of html to ensure configuration panel does not obscure content.
	if (reset) {
		document.body.style["margin-top"] = "0px";
	} else {
		const siteConfigContainer = elemsByTag("siteConfig")[0];
		document.body.style["margin-top"] =
			siteConfigContainer.clientHeight + "px";
	}
};

let _initSiteConfigPanel = () => {
	// If configuration of the site is required then display config panel accordingly.
	if (!elemsByTag("siteConfig")[0]) {
		document.body.prepend(createElement("siteConfig"));
	}
	const siteConfigContainer = elemsByTag("siteConfig")[0];
	siteConfigContainer.classList.add("siteconfig-panel__closed");

	const siteConfigButton = createElement("button", {
		classList: "material-icons",
		innerHTML: "settings",
	});

	siteConfigButton.addEventListener("click", (elem) => {
		if (siteConfigContainer.classList.contains("siteconfig-panel__open")) {
			siteConfigContainer.classList.remove("siteconfig-panel__open");
			siteConfigContainer.classList.add("siteconfig-panel__closed");
			_adjustSiteConfigPanelPosition(true);
			elem.target.innerHTML = "settings";
		} else {
			siteConfigContainer.classList.add("siteconfig-panel__open");
			siteConfigContainer.classList.remove("siteconfig-panel__closed");
			_adjustSiteConfigPanelPosition();
			elem.target.innerHTML = "visibility_off";
		}
	});
	siteConfigContainer.append(siteConfigButton);
};

let _initConfigPanel = (type) => {
	if (is(qsa("[mdx-" + type + "-option]"))) {
		if (!elemsByTag(type + "Config")[0]) {
			elemsByTag("siteConfig")[0].append(createElement(type + "Config"));
		}
	}
	const configContainer = elemsByTag(type + "Config")[0];

	// Add toggle button to each section to allow for collapsing.
	const toggle = createElement("toggle");
	toggle.append(
		createElement("span", {
			classList: type,
			text: `${type}`,
		})
	);
	const toggleButton = createElement("button", {
		classList: "material-icons",
		text: "close",
	});
	toggle.append(toggleButton);
	configContainer.append(toggle);
	toggleButton.addEventListener("click", (elem) => {
		elem.target.parentElement.parentElement.classList.toggle("collapse");
		elem.target.textContent =
			elem.target.parentElement.parentElement.classList.contains(
				"collapse"
			)
				? "menu"
				: "close";
		_adjustSiteConfigPanelPosition();
	});

	qsa("[mdx-" + type + "-option]").forEach((elem, index) => {
		// Identify and store all data either from html attributes or CSS properties.
		let id = is(elem.attributes[`mdx-${type}-id`])
			? elem.attributes[`mdx-${type}-id`].value
			: getCssPropertyValue(elem, "--_mdx-" + type + "-id");
		if (!id) {
			// Dynamically set ID based on Index and Type.
			id = "mdx" + type + "0" + index;
			elem.setAttribute("mdx-" + type + "-id", id);
		}

		//const title = typeof elem.attributes[`mdx-${type}-title`] !== "undefined" ? elem.attributes[`mdx-${type}-title`].value : getCssPropertyValue(elem, "--_mdx-" + type + "-title");
		const title = is(elem.attributes[`mdx-${type}-title`])
			? elem.attributes[`mdx-${type}-title`].value
			: getCssPropertyValue(elem, "--_mdx-" + type + "-title");
		const optionSelected = is(elem.attributes[`mdx-${type}-option`])
			? elem.attributes[`mdx-${type}-option`].value
			: getCssPropertyValue(elem, "--_mdx-" + type + "-option");
		let options = is(elem.attributes["mdx-" + type + "-options"])
			? elem.attributes["mdx-" + type + "-options"].value
			: getCssPropertyValue(elem, "--_mdx-" + type + "-options");
		const optionDescription = is(
			elem.attributes["mdx-" + type + "-option-description"]
		)
			? elem.attributes["mdx-" + type + "-option-description"].value
			: getCssPropertyValue(
					elem,
					"--_mdx-" + type + "-option-description"
			  );

		// If sufficient data can not be found, return.
		if (!id || !title || !optionSelected || !options) {
			return;
		}

		// Inject required markup for Configuration Panel.
		let section = createElement("section");
		section.setAttribute(type + "-id", id);

		let entry = createElement("entry");
		entry.setAttribute(type + "-id", id);

		let spanTitle = createElement("span", {
			innerHTML: title ? title : id,
		});
		entry.append(spanTitle);
		if (optionDescription) {
			let spanDescription = createElement("span", {
				classList: type + "__description",
				innerHTML: optionDescription,
			});
			entry.append(spanDescription);
		}

		section.append(entry);

		// Identify available options.
		let ol = createElement("ol");
		if (options.includes("|")) {
			options = options.split("|");
		} else if (
			options.includes("-") &&
			options.split("-").length - 1 == 1
		) {
			options = range(
				parseInt(options.split("-")[0]),
				parseInt(options.split("-")[1])
			);
		}

		options.forEach((availableOption) => {
			let li = createElement("li");
			li.setAttribute(type + "-id", id);
			li.setAttribute(type + "-option", availableOption);
			if (availableOption == optionSelected) {
				li.classList.add("active");
			}
			li.innerHTML = availableOption;
			ol.append(li);
		});

		section.append(ol);

		configContainer.append(section);
	});

	/* Add click events for dynamic focusing. */
	const sectionLabels = Array.prototype.slice.call(
		elemsByTag("entry", configContainer)
	);

	sectionLabels.forEach((sectionLabel) => {
		sectionLabel.addEventListener("mouseover", (elem) => {
			const targetId =
				elem.target.parentElement.attributes[type + "-id"].value;
			const target = qs(
				"[mdx-" +
					type +
					"-option][mdx-" +
					type +
					'-id="' +
					targetId +
					'"]'
			);
			target.classList.add(type + "--focus");
		});
		sectionLabel.addEventListener("mouseout", (elem) => {
			const targetId =
				elem.target.parentElement.attributes[type + "-id"].value;
			const target = qs(
				"[mdx-" +
					type +
					"-option][mdx-" +
					type +
					'-id="' +
					targetId +
					'"]'
			);
			target.classList.remove(type + "--focus");
		});
		sectionLabel.addEventListener("click", (elem) => {
			const targetId =
				elem.target.parentElement.attributes[type + "-id"].value;
			const target = qs(
				"[mdx-" +
					type +
					"-option][mdx-" +
					type +
					'-id="' +
					targetId +
					'"]'
			);
			window.scrollTo({
				top: target.offsetTop - configContainer.clientHeight,
				left: 0,
				behavior: "smooth",
			});
		});
	});

	const configOptions = Array.prototype.slice.call(
		elemsByTag("li", configContainer)
	);
	configOptions.forEach((configOption) => {
		// Add click events for dynamic switching.
		configOption.addEventListener("click", (elem) => {
			// Idenitfy required id and option.
			const targetId = elem.target.attributes[type + "-id"].value;
			const targetOption = elem.target.attributes[type + "-option"].value;

			// Set all options to inactive, then set current option to active.
			let currentOptions = elem.target.parentElement.children;
			currentOptions = [...currentOptions];
			currentOptions.forEach((option) => {
				option.classList.remove("active");
			});
			elem.target.classList.add("active");

			// Identify required element in DOM.
			let configSection = qs("[mdx-" + type + "-id='" + targetId + "']");

			// If we can't find element, return.
			if (
				!is(configSection.attributes[`mdx-${type}-id`]) ||
				!is(configSection.attributes[`mdx-${type}-option`])
			) {
				return;
			}

			// Update element to use required option.
			configSection.setAttribute(`mdx-${type}-option`, targetOption);

			// Update element desciprion in config panel label.
			const targetOptionDescription = getCssPropertyValue(
				configSection,
				"--_mdx-" + type + "-option-description"
			);
			if (targetOptionDescription !== "") {
				let cfgDescriptionElem = elem.target
					.closest("section")
					.querySelector("." + type + "__description");
				cfgDescriptionElem.innerHTML = targetOptionDescription;
			}
		});
	});
};

let _observeSiteConfigPanel = (type) => {
	if ("IntersectionObserver" in window) {
		// Store Options for Observer.
		const observerOptions = {
			root: null,
			threshold: 0,
			rootMargin: "0px",
		};

		// Logic for observer when element is in view (i.e. intersected).
		let configSectionsObserver = new IntersectionObserver(
			(configSections, configSectionsObserver) => {
				configSections.forEach((configSection) => {
					const intersectingId = is(
						configSection.target.attributes[`mdx-${type}-id`]
					)
						? configSection.target.attributes[`mdx-${type}-id`]
								.value
						: getCssPropertyValue(
								configSection.target,
								"--_mdx-" + type + "-id"
						  );

					if (intersectingId == "") {
						return;
					}

					const configContainer = elemsByTag(type + "Config")[0];

					if (configSection.isIntersecting) {
						configContainer
							.querySelectorAll(
								"section[" +
									type +
									"-id='" +
									intersectingId +
									"']"
							)
							.forEach((configSection) => {
								configSection.classList.add("active");
							});
					} else {
						configContainer
							.querySelectorAll(
								"section[" +
									type +
									"-id='" +
									intersectingId +
									"']"
							)
							.forEach((configSection) => {
								configSection.classList.remove("active");
							});
					}
					//configSectionsObserver.unobserve(configSection.target);
				});
			},
			observerOptions
		);

		// Observe relevant config sections in HTML.
		document
			.querySelectorAll("[mdx-" + type + "-option]")
			.forEach((configSection) => {
				configSectionsObserver.observe(configSection);
			});
	}
};
