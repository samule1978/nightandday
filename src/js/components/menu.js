"use strict";

import { is } from "../util/other.js";
import {
	qs,
	qsa,
	createElement,
	getCssPropertyValue,
	setCssPropertyValue,
} from "../util/dom.js";

export class Menu {
    constructor() {
        this.menu = qs("[sg78-logo-menu]");
        this.tlLeftToRight = gsap.timeline();
        this.tlRightToLeft = gsap.timeline();
    }
    
    active = false;

	input = {
		x: {
			start: 0,
			end: 0,
		},
		y: {
			start: 0,
			end: 0,
		},
	};

    checkDirection() {
        let direction = "";
        if (this.input.x.end < this.input.x.start) {
            direction+= `left-`;
            this.tlRightToLeft.play();
            this.tlRightToLeft.restart();
            this.updateTimeLineState(this.menu);
        }
        if (this.input.x.end > this.input.x.start) {
            direction+= `right-`;
            this.tlLeftToRight.play();
            this.tlLeftToRight.restart();
            this.updateTimeLineState(this.menu);
        }
        
        /*if (this.input.y.end < this.input.y.start) direction+= `down-`;
        if (this.input.y.end > this.input.y.start) direction+= `up-`;*/
        //console.log(direction);
    }

    createTimeLines() {
		this.tlLeftToRight.pause();
		this.tlLeftToRight.add(gsap.to(this.menu, { rotation: -20, ease: "back.out", duration: 0.25 }));
		//this.tlLeftToRight.add(gsap.to(this.menu, { rotation: 20, ease: "back.in", duration: 0.25 }));
		this.tlLeftToRight.add(gsap.to(this.menu, { rotation: 0, ease: "bounce.out", left: "100%", duration: 1 }));
        this.tlLeftToRight.add(gsap.to(this.menu, { rotation: 0, ease: "back.in",  duration: 0.25 }));

		this.tlRightToLeft.pause();
		this.tlRightToLeft.add(gsap.to(this.menu, { rotation: 20, ease: "back.out", duration: 0.25 }));
		//this.tlRightToLeft.add(gsap.to(this.menu, { rotation: -20, ease: "back.in", duration: 0.25 }));
		this.tlRightToLeft.add(gsap.to(this.menu, { rotation: 0, ease: "bounce.out", left: "0%", duration: 1 }));
        this.tlRightToLeft.add(gsap.to(this.menu, { rotation: 0, ease: "back.in",  duration: 0.25 }));

        //this.tl.add(gsap.to(this.menu, { rotation: 0, ease: "back.in",  duration: 0.5, onComplete: this.updateTimeLineState(this.menu) }));
        //this.tl.add(this.updateTimeLineState(this.menu));

    }
    updateTimeLineState() {        
        if (this.menu.getAttribute("sg78-logo-menu") == "") {
            this.menu.setAttribute("sg78-logo-menu", "left");
        } else if (this.menu.getAttribute("sg78-logo-menu") == "left") {
            this.menu.setAttribute("sg78-logo-menu", "right");
        } else if (this.menu.getAttribute("sg78-logo-menu") == "right") {
            this.menu.setAttribute("sg78-logo-menu", "left");
        }
        console.log(this.menu.getAttribute("sg78-logo-menu"));
    }

    init() {
        this.updateTimeLineState();
        this.createTimeLines();        

        /*this.menu.addEventListener("click", (e) => {
            e.preventDefault;
            e.stopPropagation;

            if (this.menu.getAttribute("sg78-logo-menu") == "left") {
                this.tl.play();
            }
            if (this.menu.getAttribute("sg78-logo-menu") == "right") {
                this.tl.reverse();                
            }

            this.updateTimeLineState(this.menu);
        }, false);*/

        this.menu.addEventListener('touchstart', (e) => {
            this.active = true;
            this.input.x.start = e.changedTouches[0].screenX;
            this.input.y.start = e.changedTouches[0].screenY;
        });
        this.menu.addEventListener('mousedown', (e) => {
            this.active = true;
            this.input.x.start = e.pageX;
            this.input.y.start = e.pageY;
        });

        document.addEventListener('touchend', (e) => {
            if (this.active) {
                this.input.x.end = e.changedTouches[0].screenX;
                this.input.y.end = e.changedTouches[0].screenY;
                this.checkDirection();
                this.active = false;
            }
        });
        document.addEventListener('mouseup', (e) => {
            if (this.active) {
                this.input.x.end = e.pageX;
                this.input.y.end = e.pageY;
                this.checkDirection();
                this.active = false;
            }
        });
    }
}