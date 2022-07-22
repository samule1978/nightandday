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
        this.menuTlLeftToRight = gsap.timeline({ paused:true });
        this.menuTlRightToLeft = gsap.timeline({ paused:true });
        this.menuTlTopToBottom = gsap.timeline({ paused:true });
        this.menuTlBottomToTop = gsap.timeline({ paused:true });

        this.hamburgerMenu = qs("[sg78-hamburger-menu]");
        this.hamburgerMenuTlShow = gsap.timeline({ paused:true });
        this.hamburgerMenuTlHide = gsap.timeline({ paused:true });
    };

    scrollingToTop = false;

    direction = {
        none: null,
        down: 2,
        right: 6,
        up: 8,
        left: 4,
    };

    moving = this.direction.none;

    animatingMenu = false;

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

        down: false,
	};



    showHamburgerMenu() {
        if (this.animatingMenu) return;

        this.animatingMenu = true;

        if (document.body.classList.contains('menu--hide')) {
            this.srolling(false);

            this.hamburgerMenuTlShow.play();
            this.hamburgerMenuTlShow.restart();

            document.body.classList.remove('menu--hide');
            document.body.classList.add('menu--show');                
        }
        else if (document.body.classList.contains('menu--show')) {
            this.srolling(true);

            this.hamburgerMenuTlHide.play();
            this.hamburgerMenuTlHide.restart();

            document.body.classList.remove('menu--show');
            document.body.classList.add('menu--hide');
        }
    }

    logoMoving() {
        const thresholdExtra = 1;
        let threshold = Math.max(this.menu.offsetWidth, this.menu.offsetHeight) * thresholdExtra;
        
        let diffX, diffY = 0;
        let moveX, moveY = this.direction.none;

        this.moving = this.direction.none;

        if (this.input.x.end < this.input.x.start) {
            moveX = this.direction.left;
            diffX = this.input.x.start - this.input.x.end;            
        }
        if (this.input.x.end > this.input.x.start) {
            moveX = this.direction.right;
            diffX = this.input.x.end - this.input.x.start;
        }
        if (this.input.y.end < this.input.y.start) {
            moveY = this.direction.up;
            diffY = this.input.y.start - this.input.y.end;            
        }
        if (this.input.y.end > this.input.y.start) {
            moveY = this.direction.down;
            diffY = this.input.y.end - this.input.y.start;            
        }

        if (diffX >= diffY) {
            threshold = this.menu.offsetWidth * thresholdExtra;

            if (diffX > threshold) {
                // Moving on x axis.
                this.moving = moveX;                
            } 
        } else {
            threshold = this.menu.offsetHeight * thresholdExtra;

            if (diffY > threshold) {
                // Moving on y axis
                this.moving = moveY;                
            }
        }
        //console.log(this.moving);
    }

    moveLogo(direction) {
        if (direction === this.direction.down) {
            //this.srolling(false);
            this.moveLogoDown();
        } else if (direction === this.direction.right) {
            //this.srolling(false);
            this.moveLogoRight();
        } else if (direction === this.direction.up) {
            //this.srolling(false);
            this.moveLogoUp();
        } else if (direction === this.direction.left) {
            //this.srolling(false);
            this.moveLogoLeft();
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
        if (!srolling || document.body.classList.contains('menu--show')) {
            const x = window.scrollX;
            const y = window.scrollY;
            window.onscroll = function() {
                window.scrollTo(x, y);
            };    
        } else {
            window.onscroll = function() {};
        }
    }    

    createTimeLines() {
        /*
		this.menuTlLeftToRight.to(this.menu, { ease: "bounce.out", scale: "1", left: "100%", x: `-${this.offset.x.end}}`, duration: 1, onComplete: () => {
            this.moving = this.direction.none;
            this.srolling(true);
        }});

		this.menuTlRightToLeft.to(this.menu, { ease: "bounce.out", left: "0%", x: `${this.offset.x.start}}`, duration: 1, onComplete: () => {
            this.moving = this.direction.none;
            this.srolling(true); 
        }});

		this.menuTlTopToBottom.to(this.menu, { ease: "bounce.out", top: "100%", y: `-${this.offset.y.end}}`, duration: 1, onComplete: () => {
            this.moving = this.direction.none;
            this.srolling(true); 
        }});

		this.menuTlBottomToTop.to(this.menu, { ease: "bounce.out", top: "0%", y: `${this.offset.y.start}}`, duration: 1, onComplete: () => {
            this.moving = this.direction.none;
            this.srolling(true); 
        }});

        const maskSize = "125%";
        
        this.hamburgerMenuTlShow.set(this.hamburgerMenu, { display:"none" })
        .set(this.hamburgerMenu, { maskSize:"0%" })
        .to(this.hamburgerMenu, { display:"block", duration:0 })
        .to(this.hamburgerMenu, { maskSize:`${maskSize}`, duration:1 })
        .to(this.hamburgerMenu, { maskSize:`${maskSize}`, duration:1, delay:0.5, onComplete: () => {            
            this.srolling(false);
            this.animatingMenu = false;
        }}, 0);
        this.hamburgerMenuTlHide.to(this.hamburgerMenu, { maskSize:"0%", duration: 1, onComplete: () => {            
            gsap.set(this.hamburgerMenu, { display: "none" })
            this.srolling(true);
            this.animatingMenu = false;            
        }});        
        */
       
        /*this.hamburgerMenuTlShow.set(this.hamburgerMenuOuter, { display:"none" })
        .set(this.hamburgerMenuInner, { maskSize:"0%, 0%" })
        .to(this.hamburgerMenuOuter, { display:"block", duration:0 })
        .to(this.hamburgerMenuInner, { maskSize:`${maskSize}, 0%`, duration:1 })
        .to(this.hamburgerMenuInner, { maskSize:`${maskSize}, ${maskSize}`, duration:1, delay:0.5, onComplete: () => {            
            this.srolling(false);
            this.animatingMenu = false;
        }}, 0);*/

        /*
        this.hamburgerMenuTlHide.to(this.hamburgerMenuInner, { webkitMaskSize:`${maskSize}, 0%`, duration: 1 })
        .to(this.hamburgerMenuInner, { webkitMaskSize:"0%, 0%", duration:1, onComplete: () => {
            gsap.set(this.hamburgerMenuOuter, { display: "none" })
            this.srolling(true);
            this.animatingMenu = false;
        }});
        */
        /*
        this.hamburgerMenuTlHide.to(this.hamburgerMenuInner, { webkitMaskSize:"0%, 0%", duration: 1, onComplete: () => {            
            gsap.set(this.hamburgerMenuOuter, { display: "none" })
            this.srolling(true);
            this.animatingMenu = false;            
        }});        
        */
    }

    inputAction(e, type, x, y) {
        if (type === "down") {
            this.input.down = true;

            this.srolling(false); 

            if (this.scrollingToTop) return;
            
            this.input.x.start = x;
            this.input.y.start = y;
            //console.log(`[DOWN]: X: ${this.input.x.start}, Y: ${this.input.y.start}`);
            
            gsap.to(this.menu, { ease: "bounce.out", scale: "1.1" });

        } else if (type === "up") {
            if (!this.input.down) return;

            if (this.scrollingToTop) return;

            this.input.x.end = x;
            this.input.y.end = y;
            //console.log(`[UP]: X: ${this.input.x.end}, Y: ${this.input.y.end}`);

            gsap.to(this.menu, { ease: "bounce.in", scale: "1" });            

            this.logoMoving();
            if (this.moving !== this.direction.none) {
                this.moveLogo(this.moving);
            } else {
                e.stopPropagation();

                this.showHamburgerMenu();
            }
            
            this.input.down = false;
        }
    }

    init() {        
        let isTouch = false; //https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
        if(window.matchMedia("(pointer: coarse)").matches) {
            isTouch = true;
        }
        console.log(`isTouch: ${isTouch}`);

        this.offset.x.start = `${(this.menu.offsetWidth / 3)}px`;
        this.offset.x.end = `${(this.menu.offsetWidth / 3) * 4}px`;
        this.menu.setAttribute("sg78-logo-menu-x", "left");
        setCssPropertyValue(this.menu, "left", this.offset.x.start);

        this.offset.y.start = `${(this.menu.offsetWidth / 3)}px`;
        this.offset.y.end = `${(this.menu.offsetWidth / 3) * 5.5}px`;
        this.menu.setAttribute("sg78-logo-menu-y", "top");
        setCssPropertyValue(this.menu, "top", this.offset.y.start);
        
        this.createTimeLines();

        this.menu.addEventListener('pointerdown', (e) => {
            this.inputAction(e, "down", e.screenX, e.screenY);
        });
        if (isTouch) {
            document.addEventListener('touchend', (e) => {
                this.menu.setAttribute("sg78-logo-menu-pulse", "false");
                this.inputAction(e, "up", e.changedTouches[0].screenX, e.changedTouches[0].screenY);
            });
        } else {    
            document.addEventListener('mouseup', (e) => {            
                this.menu.setAttribute("sg78-logo-menu-pulse", "false");
                this.inputAction(e, "up", e.screenX, e.screenY);
            });    
        }

        
        /*this.menu.addEventListener('mouseup', (e) => {
            if (this.scrollingToTop) return;

            if (this.moving === this.direction.none) this.showHamburgerMenu();
        });*/
        /*
        this.menu.addEventListener('mousedown', (e) => {
            //e.preventDefault();
            //e.stopPropagation();

            if (this.scrollingToTop) return;
            
            this.input.x.start = e.screenX;
            this.input.y.start = e.screenY;

            gsap.to(this.menu, { ease: "bounce.out", scale: "1.1" });
        });

        document.addEventListener('touchend', (e) => {
            //e.preventDefault();
            //e.stopPropagation();

            if (this.scrollingToTop) return;

            gsap.to(this.menu, { ease: "bounce.in", scale: "1" });

            this.input.x.end = e.changedTouches[0].screenX;
            this.input.y.end = e.changedTouches[0].screenY;                

            this.logoMoving(e);
            if (this.moving) {                
                this.moveLogo(this.moving);                
            } else {
                //this.showHamburgerMenu();
            }
        });
        document.addEventListener('mouseup', (e) => {           
            //e.preventDefault();
            //e.stopPropagation();

            if (this.scrollingToTop) return;

            gsap.to(this.menu, { ease: "bounce.in", scale: "1" });

            this.input.x.end = e.screenX;
            this.input.y.end = e.screenY;

            this.logoMoving(e);
            if (this.moving) {                
                this.moveLogo(this.moving);
            } else {
                //this.showHamburgerMenu();
            }                
        });

        this.menu.addEventListener('touchend', (e) => {
            if (this.scrollingToTop) return;

            if (this.moving === this.direction.none) this.showHamburgerMenu();
        });
        this.menu.addEventListener('mouseup', (e) => {
            if (this.scrollingToTop) return;

            if (this.moving === this.direction.none) this.showHamburgerMenu();
        });
        */

        /*this.menu.addEventListener('dblclick', (e) => {
            e.preventDefault();

            this.scrollingToTop = true;

            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            this.scrollingToTop = false;
        });*/
    }
}