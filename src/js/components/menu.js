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
        this.threshold.value.x = this.menu.offsetWidth * this.threshold.extra;
        this.threshold.value.y = this.menu.offsetHeight * this.threshold.extra;
        /*this.menuTlLeftToRight = gsap.timeline({ paused:true });
        this.menuTlRightToLeft = gsap.timeline({ paused:true });
        this.menuTlTopToBottom = gsap.timeline({ paused:true });
        this.menuTlBottomToTop = gsap.timeline({ paused:true });*/

        this.hamburgerMenuOuter = qs("[sg78-hamburger-menu-outer]");
        this.hamburgerMenuInner = qs("[sg78-hamburger-menu-inner]");        
        this.hamburgerMenuTlShow = gsap.timeline({ paused:true });
        this.hamburgerMenuTlHide = gsap.timeline({ paused:true });
    };

    isTouch = false;

    scrollingToTop = false;

    direction = {
        value: null,
        
        none: null,
        down: 2,
        right: 6,
        up: 8,
        left: 4,
        downRight: 3,
        upRight: 9,
        upLeft: 7,
        downLeft: 1,

        difference: {
            x: 0,
            y: 0,
        },

        velocity: {
            value: 0,

            small: 0,
            large: 1,
        },
    };

    threshold = {
        value: {
            x: 0,
            y: 0,
        },
        extra: 1,
    };

    animatingMenu = false;

	offset = {
		x: {
			start: "0px",
            middle: "0px",
			end: "0px",
		},
		y: {
			start: "0px",
            middle: "0px",
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

    handDominance = {        
        value: 1,
        threshold: 1,
        touchOnly: false,

		x: {
			start: 0,
			end: 0,
		},
		y: {
			start: 0,
			end: 0,
		},        

        checks: {
            count: 0,
            max: 4,
        },

        left: 0,
        right: 1,
    };

    hamburgerMenu = {
        menu: qs("[sg78-hamburger-menu]"),
        linearGradient: {
            animate: qs("[sg78-hamburger-menu-inner]").getAttribute("sg78-hamburger-menu-inner-animate-gradient"),
            base: "rgb(204,204,204)",
            colors: "rgba(204,204,204,1) 0%, rgba(178,178,178,1) 70%, rgba(128,128,128,1) 100%",
        }
    }

    setHandDominance() {
        if (this.handDominance.checks.count < this.handDominance.checks.max - 1) {            
            if (this.handDominance.x.start > (this.handDominance.x.end - this.handDominance.threshold)) {
                if (this.handDominance.value === this.handDominance.right) this.handDominance.checks.count = 0;

                this.handDominance.value = this.handDominance.left;
            } else if (this.handDominance.x.start < (this.handDominance.x.end + this.handDominance.threshold)) {
                if (this.handDominance.value === this.handDominance.left) this.handDominance.checks.count = 0;

                this.handDominance.value = this.handDominance.right;
            }
        } else {
            if (this.handDominance.value === this.handDominance.right) {
                this.direction.velocity.value = this.direction.velocity.large;
                this.moveLogoRight();
            }            
        }

        this.handDominance.checks.count = this.handDominance.checks.count + 1;

        //console.log(`this.handDominance.value: ${this.handDominance.value}`);
    }

    checkHandDominance() {
        if (!is(qs("[sg78-ux-check-hand-dominance='true']"))) return;

        if (!this.handDominance.touchOnly || (this.handDominance.touchOnly && this.isTouch)) {
            document.addEventListener('pointerdown', (e) => {
                if (this.handDominance.checks.count < this.handDominance.checks.max) {
                    this.handDominance.x.start = e.screenX;
                    this.handDominance.y.start = e.screenY;    
                }
            });
            if (this.isTouch) {
                document.addEventListener('touchend', (e) => {
                    if (this.handDominance.checks.count < this.handDominance.checks.max) {
                        this.handDominance.x.end = e.changedTouches[0].screenX;
                        this.handDominance.y.end = e.changedTouches[0].screenY;
    
                        this.setHandDominance();
                    }
                });
            } else {    
                document.addEventListener('mouseup', (e) => {            
                    if (this.handDominance.checks.count < this.handDominance.checks.max) {
                        this.handDominance.x.end = e.screenX;
                        this.handDominance.y.end = e.screenY;
                        
                        this.setHandDominance();
                    }
                });    
            }    
        }
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
        this.direction.difference.x, this.direction.difference.y = 0;        
        
        let moveX, moveY = this.direction.none;

        this.direction.value = this.direction.none;        

        if (this.input.x.end < this.input.x.start) {
            moveX = this.direction.left;
            this.direction.difference.x = this.input.x.start - this.input.x.end;            
        }
        if (this.input.x.end > this.input.x.start) {
            moveX = this.direction.right;
            this.direction.difference.x = this.input.x.end - this.input.x.start;
        }
        if (this.input.y.end < this.input.y.start) {
            moveY = this.direction.up;
            this.direction.difference.y = this.input.y.start - this.input.y.end;            
        }
        if (this.input.y.end > this.input.y.start) {
            moveY = this.direction.down;
            this.direction.difference.y = this.input.y.end - this.input.y.start;            
        }

        if (this.direction.difference.x >= this.direction.difference.y) {
            if (this.direction.difference.x > this.threshold.value.x) {
                // Moving on x axis.
                this.direction.value = moveX;
                this.setVelocity();
            } 
        } else {
            if (this.direction.difference.y > this.threshold.value.y) {
                // Moving on y axis
                this.direction.value = moveY;
                this.setVelocity();
            }
        }
    }
    
    setVelocity() {
        this.direction.velocity.value = this.direction.velocity.small;

        if (this.direction.value === this.direction.up || this.direction.value === this.direction.down) {
            if (this.direction.difference.y >= (window.innerHeight * 0.25)) this.direction.velocity.value = this.direction.velocity.large;
        }
        if (this.direction.value === this.direction.left || this.direction.value === this.direction.right) {
            if (this.direction.difference.x >= (window.innerWidth * 0.25)) this.direction.velocity.value = this.direction.velocity.large;            
        }
    }

    moveLogo() {
        if (this.direction.value === this.direction.down) {
            //this.srolling(false);
            this.moveLogoDown();
        } else if (this.direction.value === this.direction.right) {
            //this.srolling(false);
            this.moveLogoRight();
        } else if (this.direction.value === this.direction.up) {
            //this.srolling(false);
            this.moveLogoUp();
        } else if (this.direction.value === this.direction.left) {
            //this.srolling(false);
            this.moveLogoLeft();
        }
    }

    moveLogoRight() {
        let _left, _x, _attr = "";

        if (this.direction.velocity.value === this.direction.velocity.large || this.menu.getAttribute("sg78-logo-menu-x") == "middle" || this.menu.getAttribute("sg78-logo-menu-y") == "middle") {
            // Move straight to the end as velocity is large or we are in the middle (x/y).
            _left = "100%";
            _x = `-${this.offset.x.end}`;
            _attr = "right";
        } else {
            // Move to the middle.
            _left = "100%";
            _x = `-${this.offset.x.middle}`;
            _attr = "middle";
        }

        gsap.to(this.menu, { ease: "bounce.out", left: _left, x: _x, duration: 1, onComplete: () => {
            this.direction.value = this.direction.none;
            this.srolling(true);
        }});    
        this.menu.setAttribute("sg78-logo-menu-x", _attr);
    }

    moveLogoLeft() {
        let _left, _x, _attr = "";

        if (this.direction.velocity.value === this.direction.velocity.large || this.menu.getAttribute("sg78-logo-menu-x") == "middle" || this.menu.getAttribute("sg78-logo-menu-y") == "middle") {
            // Move straight to the end as velocity is large or we are in the middle (x/y).
            _left = "0%";
            _x = `${this.offset.x.start}`;
            _attr = "left";
        } else {
            // Move to the middle.
            _left = "100%";
            _x = `-${this.offset.x.middle}`;
            _attr = "middle";
        }

        gsap.to(this.menu, { ease: "bounce.out", left: _left, x: _x, duration: 1, onComplete: () => {
            this.direction.value = this.direction.none;
            this.srolling(true);
        }});    
        this.menu.setAttribute("sg78-logo-menu-x", _attr);
    }

    moveLogoUp() {
        let _top, _y, _attr = "";

        if (this.direction.velocity.value === this.direction.velocity.large || this.menu.getAttribute("sg78-logo-menu-x") == "middle" || this.menu.getAttribute("sg78-logo-menu-y") == "middle") {
            // Move straight to the end as velocity is large or we are in the middle (x/y).
            _top = "0%";
            _y = `${this.offset.y.start}`;
            _attr = "top";
        } else {
            // Move to the middle.
            _top = "100%";
            _y = `-${this.offset.y.middle}`;
            _attr = "middle";
        }

        gsap.to(this.menu, { ease: "bounce.out", top: _top, y: _y, duration: 1, onComplete: () => {
            this.direction.value = this.direction.none;
            this.srolling(true);
        }});    
        this.menu.setAttribute("sg78-logo-menu-y", _attr);
    }

    moveLogoDown() {
        let _top, _y, _attr = "";

        if (this.direction.velocity.value === this.direction.velocity.large || this.menu.getAttribute("sg78-logo-menu-x") == "middle" || this.menu.getAttribute("sg78-logo-menu-y") == "middle") {
            // Move straight to the end as velocity is large or we are in the middle (x/y).
            _top = "100%";
            _y = `-${this.offset.y.end}`;
            _attr = "bottom";
        } else {
            // Move to the middle.
            _top = "100%";
            _y = `-${this.offset.y.middle}`;
            _attr = "middle";
        }
        
        gsap.to(this.menu, { ease: "bounce.out", top: _top, y: _y, duration: 1, onComplete: () => {
            this.direction.value = this.direction.none;
            this.srolling(true);
        }});    
        this.menu.setAttribute("sg78-logo-menu-y", _attr);
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
    
    getLinearGradientAngle(x, y) {
        let linearGradientAngle = "0deg";

        //const x = this.menu.getAttribute("sg78-logo-menu-x"), y = this.menu.getAttribute("sg78-logo-menu-y");if (y === "top" && x === "left") linearGradientAngle = "45deg";
        if (y === "top" && x === "left") linearGradientAngle = "315deg";
        if (y === "top" && x === "right") linearGradientAngle = "45deg";
        if (y === "bottom" && x === "left") linearGradientAngle = "225deg";
        if (y === "bottom" && x === "right") linearGradientAngle = "135deg";
        
        return linearGradientAngle;
    }

    createTimeLines() {
        /*
		this.menuTlLeftToRight
        .to(this.menu, { ease: "bounce.out", scale: "1", left: "100%", x: `-${this.offset.x.end}}`, duration: 1, onComplete: () => {
            this.direction.value = this.direction.none;
            this.srolling(true);
        }});

		this.menuTlRightToLeft        
        .to(this.menu, { ease: "bounce.out", left: "0%", x: `${this.offset.x.start}}`, duration: 1, onComplete: () => {
            this.direction.value = this.direction.none;
            this.srolling(true); 
        }});

		this.menuTlTopToBottom
        .to(this.menu, { ease: "bounce.out", top: "100%", y: `-${this.offset.y.end}}`, duration: 1, onComplete: () => {
            this.direction.value = this.direction.none;
            this.srolling(true); 
        }});

		this.menuTlBottomToTop
        .to(this.menu, { ease: "bounce.out", top: "0%", y: `${this.offset.y.start}}`, duration: 1, onComplete: () => {
            this.direction.value = this.direction.none;
            this.srolling(true); 
        }});
        */

        const maskSize = "250%";
        this.hamburgerMenuTlShow
        .set(this.hamburgerMenuOuter, { display:"none" })
        .set(this.hamburgerMenuInner, { webkitMaskSize:"0%, 0%" })
        .to(this.hamburgerMenuOuter, { display:"block", duration:0 })
        .to(this.hamburgerMenuInner, { webkitMaskSize:`${maskSize}, 0%`, duration:1 })
        .to(this.hamburgerMenuInner, { webkitMaskSize:`${maskSize}, ${maskSize}`, duration:1, delay:0.5, onComplete: () => {            
            this.srolling(false);
            this.animatingMenu = false;
        }}, 0);

        this.hamburgerMenuTlHide
        .to(this.hamburgerMenuInner, { webkitMaskSize:`${maskSize}, 0%`, duration: 1 })
        .to(this.hamburgerMenuInner, { webkitMaskSize:"0%, 0%", duration:1, onComplete: () => {
            gsap.set(this.hamburgerMenuOuter, { display: "none" })
            this.srolling(true);
            this.animatingMenu = false;
        }});
        
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
            
            gsap.to(this.menu, { ease: "bounce.out", scale: "0.9" });

        } else if (type === "up") {
            if (!this.input.down) return;

            if (this.scrollingToTop) return;

            this.input.x.end = x;
            this.input.y.end = y;

            gsap.to(this.menu, { ease: "bounce.in", scale: "1" });            

            this.logoMoving();
            if (this.direction.value !== this.direction.none) {
                this.moveLogo(this.direction.value);
            } else {
                e.preventDefault();
                //e.stopPropagation();    
                this.showHamburgerMenu();                
            }
            
            this.input.down = false;
        }
    }

    getAllSiblings(element, parent) {
        const children = [...parent.children];

        return children.filter(child => child !== element);
    }

    init() {        
        this.isTouch = false; //https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
        if(window.matchMedia("(pointer: coarse)").matches) {
            this.isTouch = true;
        }

        this.checkHandDominance();

        this.offset.x.start = `${(this.menu.offsetWidth / 3)}px`;
        this.offset.x.middle = `${(window.innerWidth / 2) + (this.menu.offsetWidth / 2)}px`;
        this.offset.x.end = `${(this.menu.offsetWidth / 3) * 4}px`;
        this.menu.setAttribute("sg78-logo-menu-x", "left");
        setCssPropertyValue(this.menu, "left", this.offset.x.start);

        this.offset.y.start = `${(this.menu.offsetHeight / 3)}px`;        
        this.offset.y.middle = `${(window.innerHeight / 2) + (this.menu.offsetHeight / 2)}px`;
        this.offset.y.end = `${(this.menu.offsetHeight / 3) * 4}px`;
        this.menu.setAttribute("sg78-logo-menu-y", "top");
        setCssPropertyValue(this.menu, "top", this.offset.y.start);
        
        this.createTimeLines();

        /*this.menu.addEventListener('dblclick', (e) => {
            e.preventDefault();
            e.stopPropagation();

            this.scrollingToTop = true;

            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            this.scrollingToTop = false;
        });*/
        this.menu.addEventListener('pointerdown', (e) => {
            this.inputAction(e, "down", e.screenX, e.screenY);
        });
        if (this.isTouch) {
            document.addEventListener('touchend', (e) => {
                if (this.menu.getAttribute("sg78-logo-menu-pulse") !== "disabled") this.menu.setAttribute("sg78-logo-menu-pulse", "false");
                this.inputAction(e, "up", e.changedTouches[0].screenX, e.changedTouches[0].screenY);
            });
        } else {    
            document.addEventListener('mouseup', (e) => {
                if (this.menu.getAttribute("sg78-logo-menu-pulse") !== "disabled") this.menu.setAttribute("sg78-logo-menu-pulse", "false");
                this.inputAction(e, "up", e.screenX, e.screenY);
            });    
        }

        if (this.hamburgerMenu.menu) {
            const listItems = qsa("li", this.hamburgerMenu.menu);
            listItems.forEach(listItem => {
                const hasChildren = qs("ul", listItem);
                if (hasChildren) {
                    listItem.classList.add("parent");
                    
                    const span = createElement("span", {
                        classList: "marker",                        
                    });
                    span.addEventListener('pointerup', (e) => {
                        // Toggle 'active' class for clicked list item.
                        const activeListItem = span.closest("li.parent");                        
                        activeListItem.classList.toggle("active");

                        // Identify root parent of clicked list item.
                        let rootParentActiveListItem = activeListItem;
                        while (rootParentActiveListItem.parentNode.parentNode.nodeName !== "NAV") {
                            rootParentActiveListItem = rootParentActiveListItem.parentNode;
                        }

                        // Remove 'active' class from all root parent list items except for parent list item of the clicked list item.
                        qsa("nav > ul > li.parent").forEach(rootParentListItem => {                            
                            if (rootParentListItem !== rootParentActiveListItem) {
                                rootParentListItem.classList.remove("active");
                                qsa("li.parent", rootParentListItem).forEach(listItem => {
                                    listItem.classList.remove("active");
                                });
                            }
                        });

                        // Remove 'active' class of any siblings of clicked list item.
                        const siblings = this.getAllSiblings(activeListItem, activeListItem.parentNode);
                        siblings.forEach(sibling => {
                            sibling.classList.remove("active");
                            qsa("li.parent", sibling).forEach(listItem => {
                                listItem.classList.remove("active");
                            });
                        });
                    });
                    qs("a", listItem).append(span);
                };
            });
        }
    }
}