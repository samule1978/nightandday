"use strict";

import { qs, qsa, createElement, setCssPropertyValue } from "./util/dom.js";
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

if (is(qs(".loading"))) {	
	const perfData = window.performance.timing;

	console.log(perfData.navigationStart);
	console.log(perfData.loadEventEnd);

	const EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart);
	const time = parseInt((EstimatedTime/1000)%60)*100;
	console.log(time);

	/*const start = 0,
    end = 100;*/
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
	panels.forEach((panel, index) => {
		//setCssPropertyValue(panel, "z-index", panels.length - index);

		// The first panel needs to be static.
		if (index === 0) return;
				
		const slideDirection = panel.getAttribute(`slide-direction`);

		// If a panel has no slide direction then default to slide from the right.
		if (!slideDirection) {
			tl.add(gsap.from(panel, { xPercent: 100 }));
			return;
		}	
		
		// Otherwise slide panel based on required direction.
		if (slideDirection === "down") tl.add(gsap.from(panel, { yPercent: -100 }));
		if (slideDirection === "up") tl.add(gsap.from(panel, { yPercent: 100 }));
		if (slideDirection === "left") tl.add(gsap.from(panel, { xPercent: -100 }));
		if (slideDirection === "right") tl.add(gsap.from(panel, { xPercent: 100 }));
	});

	let snap = null;
	if (is(qs(`.container__slide[sg78-type-option="2"]`))) {
		snap = {
			snapTo: 1 / (panels.length - 1),
			//duration: { min: 0.2, max: 1 },			
			//duration: 0.85,
			duration: 1,
			delay: 0.25,
		} 
	}
	ScrollTrigger.create({
		animation: tl,
		trigger: ".container__slide",
		snap: snap,
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

	if (is(qsa("#riveHeader"))) {
		new rive.Rive({
			src: "assets/rive/header.riv",
			canvas: document.getElementById("riveHeader"),
			autoplay: true
		});		
	} else {
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
}
