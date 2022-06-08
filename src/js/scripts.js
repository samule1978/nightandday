"use strict";

import { qs, qsa, createElement } from "./util/dom.js";
import { sleep, isTouchEnabled, is } from "./util/other.js";
import { initSiteConfig } from "./cfg/site.config.js"; // TODO: ONLY LOAD WHEN IN CONFIG MODE
import { alertToast, makeToast } from "./vendor/toast/toast.js";

initSiteConfig();

//alertToast("Hi Sam!");
sleep(3000).then(function () {
	//makeToast("7 People are viewing this vehicle right now.", "top-right", true, false);
	//makeToast("7 People are viewing this vehicle right now.");

	/*sleep(3000).then(function () {
		makeToast("3 People have enquired about this vehicle.");

		sleep(3000).then(function () {
			makeToast(
				"10 People have been interested in this vehicle in the past 24 hrs."
			);
		});
	});*/
});

if (!isTouchEnabled()) {
	if (is(VanillaTilt)) {
		VanillaTilt.init(qsa(".component--featured-card[sg78-fx-3d]"), {
		//VanillaTilt.init(qsa(".component--featured-card"), {
			scale: 1.07,
			perspective: 2000,
			max: 15,
		});
	}
}

qsa("[sg78-ux-toastie]")[0].addEventListener("click", (e) => {
	e.preventDefault();

	if (e.target.textContent) {
		makeToast(e.target.textContent);
	}
});

if (is(qs("[sg78-ux-scroll-tracker]"))) {
	document.body.prepend(
		createElement("div", {
			classList: "scroll-tracker",			
		})
	);

	qs(["header"]).prepend(
		createElement("div", {
			classList: "bg-day",			
		})
	);



	import('./vendor/scroll-timeline/scroll-timeline.js').then(() => {
		const bgDay = qs(".bg-day");
		const scrollTracker = qs(".scroll-tracker");
		const scrollTrackingTimeline = new ScrollTimeline({
			source: document.scrollingElement,
			orientation: "block",
			scrollOffsets: [CSS.percent(0), CSS.percent(100)],
		});

		scrollTracker.animate(
			{ transform: ["scaleX(0)", "scaleX(1)"] },
			{ timeline: scrollTrackingTimeline }
		);
		

		

		bgDay.animate(
			{ opacity: ["0", "1"] },
			{ timeline: scrollTrackingTimeline }
		);
	});
}