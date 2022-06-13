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

if (is(qs("[sg78-ux-scroll-trigger]"))) {
	gsap.registerPlugin(ScrollTrigger);

	const tl = gsap.timeline();
	const panels = gsap.utils.toArray(".container__slide .panel__slide");
	tl.from(".panel__slide--b", { xPercent: 100 }) //.from(".panel__slide--a", { xPercent: -100 })
		.from(".panel__slide--c", { xPercent: 100 })
		.from(".panel__slide--d", { yPercent: 100 })
		.from(".panel__slide--e", { xPercent: -100 });
	ScrollTrigger.create({
		animation: tl,
		trigger: ".container__slide",
		snap: {
			snapTo: 1 / (panels.length - 1),
			//duration: { min: 0.2, max: 1 },			
			//duration: 0.85,
			duration: 1,
			delay: 0.1,
		},
		start: "top top",
		end: "+=500%",
		scrub: true,
		pin: true,
		anticipatePin: 1,
	});


	document.body.prepend(
		createElement("div", {
			classList: "progress",
		})
	);
	gsap.to(".progress", {
		width: "100%",
		ease: "none",
		scrollTrigger: { scrub: 0.3 },
	});

	/*const progress = createElement("progress");
	progress.setAttribute("max", "100");
	progress.setAttribute("value", "0");
	document.body.prepend(progress);
	gsap.to("progress", {
		value: 100,
		ease: "none",
		scrollTrigger: { scrub: 0.3 },
	});*/

	qs(["header"]).prepend(
		createElement("div", {
			classList: "bg-day",
		})
	);
	gsap.to(".bg-day", {
		opacity: 0,
		ease: "none",
		scrollTrigger: { scrub: 0.3 },
	});	
}
