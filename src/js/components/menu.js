"use strict";

import { is } from "../util/other.js";
import {
	qs,
	qsa,
	createElement,
	getCssPropertyValue,
	setCssPropertyValue,
} from "../util/dom.js";
import { alertToast, makeToast } from "../vendor/toast/toast.js";

export class Menu {
    constructor() {
        this.menu = qs("[sg78-logo-menu]");  
        this.menuTlLeftToRight = gsap.timeline();
        this.menuTlRightToLeft = gsap.timeline();
        this.menuTlTopToBottom = gsap.timeline();
        this.menuTlBottomToTop = gsap.timeline();

        this.hamburgerMenu = qs("[sg78-hamburger-menu]");
        this.hamburgerMenuTlShow = gsap.timeline();
        this.hamburgerMenuTlHide = gsap.timeline();
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

    showHamburgerMenu(show = false) {
        if (show) {
            this.hamburgerMenuTlShow.play();
            this.hamburgerMenuTlShow.restart();
        } else {
            this.hamburgerMenuTlHide.play();
            this.hamburgerMenuTlHide.restart();
        }
    }

    moveLogo(e) {
        const threshold = this.menu.offsetWidth * 1.5;
        let moveRight, moveUp = false;
        let diffX = 0, diffY = 0;

        if (this.input.x.end < this.input.x.start) {
            moveRight = false;
            diffX = this.input.x.start - this.input.x.end;            
        }
        if (this.input.x.end > this.input.x.start) {
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

        if (diffX >= diffY) {
            if (diffX > threshold) {
                // Moving on x axis.
                if (moveRight) {
                    this.moveLogoRight();
                } else {
                    this.moveLogoLeft();                
                }
            }
        } else {
            if (diffY > threshold) {
                // Moving on y axis.
                if (moveUp) {
                    this.moveLogoUp();
                } else {
                    this.moveLogoDown();
                }
            }
        }
    }
    moveLogoRight() {
        if (this.menu.getAttribute("sg78-logo-menu-x") == "left") {
            this.menuTlLeftToRight.play();
            this.menuTlLeftToRight.restart();
            this.menu.setAttribute("sg78-logo-menu-x", "right");
        }
    }
    moveLogoLeft() {
        if (this.menu.getAttribute("sg78-logo-menu-x") == "right") {
            this.menuTlRightToLeft.play();
            this.menuTlRightToLeft.restart();
            this.menu.setAttribute("sg78-logo-menu-x", "left");
        }
    }

    moveLogoUp() {
        if (this.menu.getAttribute("sg78-logo-menu-y") == "bottom") {
            this.menuTlBottomToTop.play();
            this.menuTlBottomToTop.restart();
            this.menu.setAttribute("sg78-logo-menu-y", "top");
        }
    }
    moveLogoDown() {
        if (this.menu.getAttribute("sg78-logo-menu-y") == "top") {
            this.menuTlTopToBottom.play();
            this.menuTlTopToBottom.restart();
            this.menu.setAttribute("sg78-logo-menu-y", "bottom");
        }
    }

    srolling(srolling) {
        if (srolling) {
            window.onscroll = function() {};
        } else {
            const x = window.scrollX;
            const y = window.scrollY;
            window.onscroll = function() {
                window.scrollTo(x, y);
            };    
        }
    }    

    createTimeLines() {
		this.menuTlLeftToRight.pause();
		this.menuTlLeftToRight.add(gsap.to(this.menu, { ease: "bounce.out", left: "100%", x: `-${this.offset.x.end}}`, duration: 1 }));

		this.menuTlRightToLeft.pause();
		this.menuTlRightToLeft.add(gsap.to(this.menu, { ease: "bounce.out", left: "0%", x: `${this.offset.x.start}}`, duration: 1 }));

		this.menuTlTopToBottom.pause();
		this.menuTlTopToBottom.add(gsap.to(this.menu, { ease: "bounce.out", top: "100%", y: `-${this.offset.y.end}}`, duration: 1 }));

		this.menuTlBottomToTop.pause();
		this.menuTlBottomToTop.add(gsap.to(this.menu, { ease: "bounce.out", top: "0%", y: `${this.offset.y.start}}`, duration: 1 }));


        this.hamburgerMenuTlShow.pause();
        this.hamburgerMenuTlShow.add(gsap.to(this.hamburgerMenu, { opacity: "1", duration: 1 }));

        this.hamburgerMenuTlHide.pause();
        this.hamburgerMenuTlHide.add(gsap.to(this.hamburgerMenu, { opacity: "0", duration: 1 }));

    }

    init() {        
        this.offset.x.start = `${(this.menu.offsetWidth / 3)}px`;
        this.offset.x.end = `${(this.menu.offsetWidth / 3) * 4}px`;
        this.menu.setAttribute("sg78-logo-menu-x", "left");
        setCssPropertyValue(this.menu, "left", this.offset.x.start);

        this.offset.y.start = `${(this.menu.offsetWidth / 3)}px`;
        this.offset.y.end = `${(this.menu.offsetWidth / 3) * 4}px`;
        this.menu.setAttribute("sg78-logo-menu-y", "top");
        setCssPropertyValue(this.menu, "top", this.offset.y.start);
        
        this.createTimeLines();        

        this.menu.addEventListener('touchstart', (e) => {
            //e.preventDefault();
            this.srolling(false);
            this.active = true;
            this.input.x.start = e.changedTouches[0].screenX;
            this.input.y.start = e.changedTouches[0].screenY;
        });
        this.menu.addEventListener('mousedown', (e) => {
            //e.preventDefault();
            this.srolling(false);
            this.active = true;
            this.input.x.start = e.pageX;
            this.input.y.start = e.pageY;
        });

        document.addEventListener('touchend', (e) => {
            if (this.active) {                
                this.input.x.end = e.changedTouches[0].screenX;
                this.input.y.end = e.changedTouches[0].screenY;
                this.moveLogo(e);
                this.active = false;
                this.srolling(true);
            }
        });
        document.addEventListener('mouseup', (e) => {           
            if (this.active) {                
                this.input.x.end = e.pageX;
                this.input.y.end = e.pageY;
                this.moveLogo(e);
                this.active = false;
                this.srolling(true);
            }
        });

        this.menu.addEventListener('click', (e) => {
            //e.preventDefault();
            if (document.body.classList.contains('menu--show')) {
                this.srolling(true);
                this.showHamburgerMenu(false);

                document.body.classList.remove('menu--show');
                document.body.classList.add('menu--hide');
            } else if (document.body.classList.contains('menu--hide')) {
                this.srolling(false);
                this.showHamburgerMenu(true);

                document.body.classList.remove('menu--hide');
                document.body.classList.add('menu--show');                
            }
        });
        
        this.menu.addEventListener('dblclick', (e) => {
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        });
    }
}