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
        this.tlTopToBottom = gsap.timeline();
        this.tlBottomToTop = gsap.timeline();
    }
    
    active = false;

	offset = {
		x: {
			start: "0px",
			end: "0px",
		},
		y: {
			start: "0px",
			end: "0px",
		},
	};

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

    moveLogo() {
        let moveRight = false;
        let moveUp = false;
        let diffX = 0, diffY = 0;
        if (this.input.x.end < this.input.x.start) {
            //console.log(`Left: X start = ${this.input.x.start}, X end = ${this.input.x.end}`);
            moveRight = false;
            diffX = this.input.x.start - this.input.x.end;
            
        }
        if (this.input.x.end > this.input.x.start) {
            //console.log(`Right: X start = ${this.input.x.start}, X end = ${this.input.x.end}`);
            moveRight = true;
            diffX = this.input.x.end - this.input.x.start;
        }

        if (this.input.y.end < this.input.y.start) {
            moveUp = true;
            diffY = this.input.y.start - this.input.y.end;            
        }
        if (this.input.y.end > this.input.y.start) {
            moveUp = false;
            diffY = this.input.y.end - this.input.y.start;            
        }

        console.log(`diffX: ${diffX}, diffY = ${diffY}`);

        if (diffX >= diffY) {
            // Moving on x axis.
            if (moveRight) {
                this.moveLogoRight();
            } else {
                this.moveLogoLeft();
            }
        } else {
            // Moving on y axis.
            if (moveUp) {
                this.moveLogoUp();
            } else {
                this.moveLogoDown();
            }
        }


    }
    moveLogoRight() {
        if (this.menu.getAttribute("sg78-logo-menu-x") == "left") {
            this.tlLeftToRight.play();
            this.tlLeftToRight.restart();
            this.menu.setAttribute("sg78-logo-menu-x", "right");
        }
    }
    moveLogoLeft() {
        if (this.menu.getAttribute("sg78-logo-menu-x") == "right") {
            this.tlRightToLeft.play();
            this.tlRightToLeft.restart();
            this.menu.setAttribute("sg78-logo-menu-x", "left");
        }
    }

    moveLogoUp() {
        if (this.menu.getAttribute("sg78-logo-menu-y") == "bottom") {
            this.tlBottomToTop.play();
            this.tlBottomToTop.restart();
            this.menu.setAttribute("sg78-logo-menu-y", "top");
        }
    }
    moveLogoDown() {
        if (this.menu.getAttribute("sg78-logo-menu-y") == "top") {
            this.tlTopToBottom.play();
            this.tlTopToBottom.restart();
            this.menu.setAttribute("sg78-logo-menu-y", "bottom");
        }
    }          

    createTimeLines() {
		this.tlLeftToRight.pause();
		//this.tlLeftToRight.add(gsap.to(this.menu, { rotation: -20, ease: "back.out", duration: 0.25 }));
		//this.tlLeftToRight.add(gsap.to(this.menu, { rotation: 20, ease: "back.in", duration: 0.25 }));
		this.tlLeftToRight.add(gsap.to(this.menu, { rotation: 0, ease: "bounce.out", left: "100%", x: `-${this.offset.x.end}}`, duration: 1 }));
        //this.tlLeftToRight.add(gsap.to(this.menu, { rotation: 0, ease: "back.in",  duration: 0.25 }));


		this.tlRightToLeft.pause();
		//this.tlRightToLeft.add(gsap.to(this.menu, { rotation: 20, ease: "back.out", duration: 0.25 }));
		//this.tlRightToLeft.add(gsap.to(this.menu, { rotation: -20, ease: "back.in", duration: 0.25 }));
		this.tlRightToLeft.add(gsap.to(this.menu, { rotation: 0, ease: "bounce.out", left: "0%", x: `${this.offset.x.start}}`, duration: 1 }));
        //this.tlRightToLeft.add(gsap.to(this.menu, { rotation: 0, ease: "back.in",  duration: 0.25 }));



		this.tlTopToBottom.pause();
		this.tlTopToBottom.add(gsap.to(this.menu, { rotation: 0, ease: "bounce.out", top: "100%", y: `-${this.offset.y.end}}`, duration: 1 }));

		this.tlBottomToTop.pause();
		this.tlBottomToTop.add(gsap.to(this.menu, { rotation: 0, ease: "bounce.out", top: "0%", y: `${this.offset.y.start}}`, duration: 1 }));
    }

    updateLogoPosition() {        
        if (this.menu.getAttribute("sg78-logo-menu-x") == "") {
            this.menu.setAttribute("sg78-logo-menu-x", "left");
        } else if (this.menu.getAttribute("sg78-logo-menu-x") == "left") {
            this.menu.setAttribute("sg78-logo-menu-x", "right");
        } else if (this.menu.getAttribute("sg78-logo-menu-x") == "right") {
            this.menu.setAttribute("sg78-logo-menu-x", "left");
        }
        
        if (this.menu.getAttribute("sg78-logo-menu-y") == "") {
            this.menu.setAttribute("sg78-logo-menu-y", "top");
        } else if (this.menu.getAttribute("sg78-logo-menu-y") == "top") {
            this.menu.setAttribute("sg78-logo-menu-y", "bottom");
        } else if (this.menu.getAttribute("sg78-logo-menu-y") == "bottom") {
            this.menu.setAttribute("sg78-logo-menu-y", "top");
        }                
    }

    init() {        
        this.offset.x.start = `${(this.menu.offsetWidth / 2)}px`;
        this.offset.x.end = `${(this.menu.offsetWidth / 2) * 3}px`;
        this.menu.setAttribute("sg78-logo-menu-x", "left");
        setCssPropertyValue(this.menu, "left", this.offset.x.start);

        this.offset.y.start = `${(this.menu.offsetWidth / 2)}px`;
        this.offset.y.end = `${(this.menu.offsetWidth / 2) * 3}px`;
        this.menu.setAttribute("sg78-logo-menu-y", "top");
        setCssPropertyValue(this.menu, "top", this.offset.y.start);
        
        this.createTimeLines();        

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
                this.moveLogo();
                this.active = false;
            }
        });
        document.addEventListener('mouseup', (e) => {
            if (this.active) {
                this.input.x.end = e.pageX;
                this.input.y.end = e.pageY;
                this.moveLogo();
                this.active = false;
            }
        });
    }
}