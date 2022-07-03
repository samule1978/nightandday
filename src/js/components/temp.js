/*

https://stackoverflow.com/questions/18981909/how-to-show-a-running-progress-bar-while-page-is-loading - Better example


https://stackoverflow.com/questions/33820979/calculate-display-percentage-of-progress-of-page-load
https://stackoverflow.com/questions/11072759/display-a-loading-bar-before-the-entire-page-is-loaded/11072778#11072778
http://jsbin.com/huyusu/3/edit?html,css,js,output



https://rinnai.jp/microbubble/

https://javascript.info/onload-ondomcontentloaded
https://stackoverflow.com/questions/65830873/should-preloader-be-inside-domcontentloaded-or-load-event

*/
/*! For license information please see main.js.LICENSE.txt */
(() => {
	var t,
		e = {
			7334: (t, e, i) => {
				"use strict";
				i(1496);
				var s = i(9226),
					n = i(366);
				s.p8.registerPlugin(n.t),
					n.t.create(
						"customEaseOut",
						"M0,0,C0.3,0.1,0.182,0.718,0.448,0.908,0.579,1.0,0.752,1,1,1"
					),
					n.t.create(
						"scrollEase",
						"M0,0,C0.4,0.1,0.182,0.718,0.448,0.908,0.579,1.0,0.752,1,1,1"
					),
					s.p8.defaults({ overwrite: "auto", ease: "customEaseOut" });
				var a = i(2100),
					o = i.n(a);
				let r = null;
				class h {
					constructor() {
						if (r) return r;
						(this._uaParser = new (o())()),
							(this._isDesktop = null),
							(this._isMobile = null),
							(this._isIos = null),
							(this._isAndroid = null),
							(this._isIE = null),
							(this._isEdge = null),
							(this._device = null),
							(r = this);
					}
					static getInstance() {
						return r || (r = new h()), r;
					}
					static logInfo() {
						console.log("----------"),
							console.log("Device"),
							console.dir(h.getInstance()._uaParser.getDevice()),
							console.log("----------"),
							console.log("OS"),
							console.dir(h.getInstance()._uaParser.getOS()),
							console.log("----------"),
							console.log("Browser"),
							console.dir(h.getInstance()._uaParser.getBrowser()),
							console.log("----------");
					}
					static get isDesktop() {
						return h.getInstance().isDesktop;
					}
					static get isMobile() {
						return h.getInstance().isMobile;
					}
					static get isIos() {
						return h.getInstance().isIos;
					}
					static get isAndroid() {
						return h.getInstance().isAndroid;
					}
					static get isIE() {
						return h.getInstance().isIE;
					}
					static get isEdge() {
						return h.getInstance().isEdge;
					}
					static get device() {
						return h.getInstance().device;
					}
					get isDesktop() {
						if (this._isDesktop) return this._isDesktop;
						const t = this._uaParser.getDevice();
						return (
							(this._isDesktop =
								void 0 === t.type &&
								!("ontouchstart" in document)),
							this._isDesktop
						);
					}
					get isMobile() {
						if (this._isMobile) return this._isMobile;
						const t = this._uaParser.getDevice();
						return (
							(this._isMobile =
								"mobile" === t.type ||
								"tablet" === t.type ||
								"ontouchstart" in document),
							this._isMobile
						);
					}
					get isIos() {
						if (this._isIos) return this._isIos;
						const t = this._uaParser.getOS();
						return (
							(this._isIos = t.name
								.toLowerCase()
								.includes("ios")),
							this._isIos
						);
					}
					get isAndroid() {
						if (this._isAndroid) return this._isAndroid;
						const t = this._uaParser.getOS();
						return (
							(this._isAndroid = t.name
								.toLowerCase()
								.includes("android")),
							this._isAndroid
						);
					}
					get isIE() {
						if (this._isIE) return this._isIE;
						const t = this._uaParser.getBrowser();
						return (
							(this._isIE = t.name.toLowerCase().includes("ie")),
							this._isIE
						);
					}
					get isEdge() {
						if (this._isEdge) return this._isEdge;
						const t = this._uaParser.getBrowser();
						return (
							(this._isEdge = t.name
								.toLowerCase()
								.includes("edge")),
							this._isEdge
						);
					}
					get device() {
						return (
							this._device ||
								(h.isDesktop
									? (this._device = "desktop")
									: h.isMobile && (this._device = "mobile")),
							this._device
						);
					}
				}
				class l {
					constructor(t) {
						(this.srcs = t),
							(this.loadCompleteCount = 0),
							(this.loadTotalCount = t.length),
							(this.onLoadComplete = null);
					}
					load(t) {
						this.onLoadComplete = t;
						for (let t = 0, e = this.srcs.length; t < e; t++) {
							const e = new Image();
							(e.src = ""),
								(e.onload =
									this.onImageLoadComplete.bind(this)),
								(e.src = this.srcs[t]),
								(e.style.width = "auto"),
								(e.style.height = "auto");
						}
					}
					onImageLoadComplete() {
						this.loadCompleteCount++,
							this.loadCompleteCount === this.loadTotalCount &&
								this.onLoadComplete(this);
					}
				}
				let c = null;
				class d {
					constructor() {
						if (c) return c;
						(this.updateFunctions = []),
							(this.updateFunctionsLength = 0),
							(this.lastUpdateFunction = null),
							(c = this),
							this.init();
					}
					static getInstance() {
						return c || (c = new d()), c;
					}
					static add(t) {
						d.getInstance().add(t);
					}
					static remove(t) {
						d.getInstance().remove(t);
					}
					static reset() {
						d.getInstance().reset();
					}
					init() {
						(this.animFunction = this.update.bind(this)),
							window.requestAnimationFrame(this.animFunction);
					}
					add(t) {
						this.updateFunctions.push(t),
							(this.updateFunctionsLength =
								this.updateFunctions.length);
					}
					remove(t) {
						let e;
						for (let i = 0; i < this.updateFunctionsLength; i++)
							if (((e = this.updateFunctions[i]), e === t)) {
								this.updateFunctions.splice(i, 1);
								break;
							}
						this.updateFunctionsLength =
							this.updateFunctions.length;
					}
					addLast(t) {
						this.lastUpdateFunction = t;
					}
					update() {
						let t;
						for (let e = 0; e < this.updateFunctionsLength; e++)
							(t = this.updateFunctions[e]), t();
						this.lastUpdateFunction && this.lastUpdateFunction(),
							window.requestAnimationFrame(this.animFunction);
					}
					reset() {
						for (let t = 0; t < this.updateFunctionsLength; t++)
							delete this.updateFunctions[t];
						(this.updateFunctions = []),
							(this.updateFunctionsLength = 0),
							delete this.lastUpdateFunction;
					}
				}
				let u = null;
				class p {
					constructor() {
						if (u) return u;
						(this.functions = []),
							(this.functionsLength = 0),
							(this.mouseX = 0),
							(this.mouseY = 0),
							(u = this),
							this.init();
					}
					static getInstance() {
						return u || (u = new p()), u;
					}
					static add(t) {
						p.getInstance().add(t);
					}
					static remove(t) {
						p.getInstance().remove(t);
					}
					static get x() {
						return p.getInstance().mouseX;
					}
					static get y() {
						return p.getInstance().mouseY;
					}
					static reset() {
						p.getInstance().reset();
					}
					init() {
						document.addEventListener(
							"mousemove",
							this.onMouseMove.bind(this)
						);
					}
					add(t) {
						this.functions.push(t),
							(this.functionsLength = this.functions.length);
					}
					remove(t) {
						let e;
						for (let i = 0; i < this.functionsLength; i++)
							if (((e = this.functions[i]), e === t)) {
								this.functions.splice(i, 1);
								break;
							}
						this.functionsLength = this.functions.length;
					}
					onMouseMove(t) {
						let e;
						(this.mouseX = t.clientX), (this.mouseY = t.clientY);
						for (let t = 0; t < this.functionsLength; t++)
							(e = this.functions[t]),
								e(this.mouseX, this.mouseY);
					}
					reset() {
						for (let t = 0; t < this.functionsLength; t++)
							delete this.functions[t];
						(this.functions = []), (this.functionsLength = 0);
					}
				}
				class m {
					static random(t, e) {
						return void 0 === t
							? Math.random()
							: void 0 === e
							? Math.random() * t
							: t + Math.random() * (e - t);
					}
					static randomInt(t, e) {
						return Math.floor(m.random(t, e));
					}
					static constrain(t, e, i) {
						return Math.max(Math.min(t, i), e);
					}
					static map(t, e, i, s, n) {
						return ((t - e) / (i - e)) * (n - s) + s;
					}
					static radians(t) {
						return t * ((2 * Math.PI) / 360);
					}
					static dist(t, e, i, s) {
						return Math.sqrt((t - i) * (t - i) + (e - s) * (e - s));
					}
					static lerp(t, e, i) {
						return t + (e - t) * i;
					}
					static calcViewportFov(t, e) {
						return 2 * Math.atan(t / e) * (180 / Math.PI);
					}
				}
				function v(t) {
					return new Promise((e) => {
						setTimeout(() => {
							e();
						}, 1e3 * t);
					});
				}
				const g = {
						currentSection: 1,
						isLoadingEnd: !1,
						isMenuOpen: !1,
						isMovieArea: !1,
						scroll: { value: 0, prevValue: 0, velocity: 0, max: 0 },
					},
					f = new (class {
						constructor() {
							(this.$cursor = $("#Cursor")),
								(this.$visibility = $(
									"#Cursor .cursor_visibility"
								)),
								(this.$circle = $("#Cursor .cursor_circle")),
								(this.$loading = $(
									"#Cursor .cursor_loading span"
								)),
								(this.$scroll = $(
									"#Cursor .cursor_scroll span"
								)),
								(this.$play = $("#Cursor .cursor_play span")),
								(this.$close = $("#Cursor .cursor_close span")),
								(this.currentShape = "circle"),
								(this.position = { x: 0, y: 0 }),
								(this.percent = 0),
								(this.state = "scroll"),
								(this.forceDot = !1),
								(this.isScrollStopped = !1),
								(this.lastScrollTime = 0),
								(this.scrollLeadInterval = 3e3),
								(this.fadeInterval = 3e3),
								(this.fadeTime = 0),
								(this.onFirstMouseMoveFunc =
									this.onFirstMouseMove.bind(this)),
								(this.onMouseMoveFunc =
									this.onMouseMove.bind(this)),
								(this.updateFunc = this.update.bind(this)),
								h.isDesktop
									? (p.add(this.onFirstMouseMoveFunc),
									  p.add(this.onMouseMoveFunc),
									  d.add(this.updateFunc),
									  this.handleOnDotAreaEnter(),
									  this.handleOnBtnEnter())
									: (this.$cursor.style.opacity = 1);
						}
						get isCircleShape() {
							return "circle" === this.currentShape;
						}
						get isDotShape() {
							return "dot" === this.currentShape;
						}
						onFirstMouseMove(t, e) {
							(this.position.x = t),
								(this.position.y = e),
								(this.$cursor.style.opacity = 1),
								p.remove(this.onFirstMouseMoveFunc);
						}
						onMouseMove() {
							this.showCursor();
						}
						showCursor() {
							this.$visibility.classList.remove("off"),
								(this.fadeTime = performance.now());
						}
						hideCursor() {
							this.isScrollStopped ||
								this.$visibility.classList.add("off");
						}
						handleOnDotAreaEnter() {
							$$(".js-dot-cursor").forEach((t) => {
								t.addEventListener("mouseenter", () => {
									"play" === this.state
										? this.hidePlay()
										: "close" === this.state
										? this.hideClose()
										: "scroll" === this.state &&
										  this.isScrollStopped &&
										  this.hideScroll(),
										(this.forceDot = !0);
								}),
									t.addEventListener("mouseleave", () => {
										"play" === this.state
											? this.showPlay()
											: "close" === this.state
											? this.showClose()
											: "scroll" === this.state &&
											  this.isScrollStopped &&
											  this.showScroll(),
											(this.forceDot = !1);
									});
							});
						}
						handleOnBtnEnter() {
							$$(".js-btn").forEach((t) => {
								t.addEventListener("mouseenter", () => {
									s.p8.to(this.$circle, {
										scale: 0.2,
										duration: 0.1,
									});
								}),
									t.addEventListener("mouseleave", () => {
										s.p8.to(this.$circle, {
											scale: 0.134,
											duration: 0.1,
										});
									});
							});
						}
						animateLoading() {
							(this.percent = 0),
								s.p8.to(this, {
									percent: 99,
									duration: 5,
									ease: "power2.inOut",
									onUpdate: () => {
										this.updatePercentText();
									},
								});
						}
						async finishLoading() {
							s.p8.killTweensOf(this, "percent"),
								s.p8.to(this, {
									percent: 100,
									duration: 2,
									ease: "power2.out",
									onUpdate: () => {
										this.updatePercentText();
									},
								}),
								await v(2.4),
								s.p8.to(this.$loading, {
									opacity: 0,
									y: -12,
									duration: 0.6,
								}),
								s.p8.fromTo(
									this.$scroll,
									{ opacity: 0, y: 12 },
									{ opacity: 1, y: 0, duration: 0.6 }
								),
								document.body.classList.remove("hidden");
						}
						updatePercentText() {
							const t = String(Math.floor(this.percent)).padStart(
								2,
								"0"
							);
							this.$loading.textContent = t;
						}
						kill() {
							s.p8.to(this.$cursor, {
								opacity: 0,
								duration: 0.6,
								onComplete: () => {
									this.$cursor.style.visibility = "hidden";
								},
							});
						}
						showScroll() {
							this.$visibility.classList.remove("off"),
								this.toCircleShape("black"),
								this.showInnerText(this.$scroll),
								(this.state = "scroll");
						}
						hideScroll() {
							this.toDotShape(), this.hideInnerText(this.$scroll);
						}
						showInnerText(t) {
							s.p8.to(t, { opacity: 1, duration: 0.2 });
						}
						hideInnerText(t) {
							s.p8.to(t, { opacity: 0, duration: 0.2 });
						}
						showPlay() {
							this.toCircleShape("white"),
								this.showInnerText(this.$play);
						}
						showClose() {
							this.toCircleShape("white"),
								this.showInnerText(this.$close);
						}
						hidePlay() {
							this.toDotShape(), this.hideInnerText(this.$play);
						}
						hideClose() {
							this.toDotShape(), this.hideInnerText(this.$close);
						}
						togglePlayClose() {
							let t =
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: "close";
							(this.state = t), this.toCircleShape("white");
							const e = "close" === t ? this.$play : this.$close,
								i = "close" === t ? this.$close : this.$play;
							s.p8.to(e, {
								opacity: 0,
								y: -12,
								z: -10,
								skewY: -5,
								duration: 0.6,
							}),
								s.p8.fromTo(
									i,
									{ opacity: 0, y: 12, z: 10, skewY: -5 },
									{
										opacity: 1,
										y: 0,
										z: 0,
										skewY: 0,
										duration: 0.6,
									}
								);
						}
						toDotShape() {
							this.isDotShape ||
								((this.currentShape = "dot"),
								s.p8.to(this.$circle, {
									scale: 0.134,
									opacity: 1,
									backgroundColor: "#cf000e",
									duration: 0.4,
								}));
						}
						toCircleShape() {
							let t =
								arguments.length > 0 && void 0 !== arguments[0]
									? arguments[0]
									: "white";
							this.isCircleShape ||
								((this.currentShape = "circle"),
								s.p8.to(this.$circle, {
									scale: 1,
									opacity: 0.04,
									backgroundColor:
										"black" === t ? "#111" : "#fff",
									duration: 0.4,
								}));
						}
						update() {
							const t = performance.now();
							Math.abs(g.scroll.velocity) > 0.1 &&
								(this.lastScrollTime = t),
								g.isLoadingEnd &&
									!g.isMovieArea &&
									g.currentSection > 0 &&
									!this.forceDot &&
									(t - this.lastScrollTime >
									this.scrollLeadInterval
										? this.isScrollStopped ||
										  (this.showScroll(),
										  (this.isScrollStopped = !0))
										: this.isScrollStopped &&
										  (this.hideScroll(),
										  (this.isScrollStopped = !1)),
									t - this.fadeTime > this.fadeInterval &&
										this.hideCursor()),
								g.currentSection < 0 &&
									1 ===
										parseFloat(
											this.$scroll.style.opacity
										) &&
									(this.hideScroll(),
									(this.isScrollStopped = !1));
							const e = Math.exp(-0.5);
							(this.position.x = m.lerp(p.x, this.position.x, e)),
								(this.position.y = m.lerp(
									p.y,
									this.position.y,
									e
								)),
								(this.$cursor.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`);
						}
					})();
				let x = null;
				class y {
					constructor() {
						if (x) return x;
						(this.width = 0),
							(this.height = 0),
							(this.halfWidth = 0),
							(this.halfHeight = 0),
							(this.functions = []),
							(this.functionsLength = 0),
							(this.isWaiting = !1),
							(x = this),
							this.init();
					}
					static getInstance() {
						return x || (x = new y()), x;
					}
					static add(t) {
						let e =
							!(
								arguments.length > 1 && void 0 !== arguments[1]
							) || arguments[1];
						y.getInstance().add(t, e);
					}
					static remove(t) {
						y.getInstance().remove(t);
					}
					static get width() {
						return y.getInstance().width;
					}
					static get halfWidth() {
						return y.getInstance().halfWidth;
					}
					static get height() {
						return y.getInstance().height;
					}
					static get halfHeight() {
						return y.getInstance().halfHeight;
					}
					init() {
						window.addEventListener(
							"resize",
							this.onResize.bind(this)
						),
							this.onResize();
					}
					add(t, e) {
						this.functions.push(t),
							(this.functionsLength = this.functions.length),
							e &&
								t(
									this.width,
									this.height,
									this.halfWidth,
									this.halfHeight
								);
					}
					remove(t) {
						let e;
						for (let i = 0; i < this.functionsLength; i++)
							if (((e = this.functions[i]), e === t)) {
								this.functions.splice(i, 1);
								break;
							}
						this.functionsLength = this.functions.length;
					}
					async onResize() {
						if (this.isWaiting) return;
						const t = document.documentElement.clientWidth
								? document.documentElement.clientWidth
								: window.innerWidth,
							e = window.innerHeight;
						let i;
						(this.width = t),
							(this.height = e),
							(this.halfWidth = this.width / 2),
							(this.halfHeight = this.height / 2),
							(this.isWaiting = !0),
							await v(0.2),
							(this.isWaiting = !1);
						for (let t = 0; t < this.functionsLength; t++)
							(i = this.functions[t]),
								i(
									this.width,
									this.height,
									this.halfWidth,
									this.halfHeight
								);
					}
				}
				const b = new (class {
					constructor() {
						(this.container = null), (this.isInitialized = !1);
					}
					init(t) {
						(g.scroll.value = 0),
							(g.scroll.prevValue = 0),
							(g.scroll.velocity = 0),
							(this.container = t),
							(this.isInitialized = !0);
					}
					update() {
						if (!this.isInitialized) return;
						const t = g.scroll;
						(t.prevValue = t.value),
							(t.value = m.lerp(
								window.pageYOffset,
								t.value,
								Math.exp((1 / 60) * -5)
							)),
							(t.velocity = t.value - t.prevValue),
							h.isDesktop &&
								(this.container.style.transform = `translate3d(0, ${-t.value}px, 0)`);
					}
				})();
				var w = i(4189);
				class L {
					constructor(t) {
						(this.$fixedItem = t),
							(this.$fixedContainer = t.parentNode),
							(this.progress = 0),
							(this.isAuto = !1),
							(this.isAnimation = !1),
							(this.tl = s.p8.timeline({
								paused: !this.isAuto,
								defaults: { ease: "customEaseOut" },
							})),
							(this.labelCount = 0);
					}
					setContainerHeight() {
						let t =
							arguments.length > 0 && void 0 !== arguments[0]
								? arguments[0]
								: 1;
						const e = this.tl.totalDuration();
						this.$fixedContainer.style.height = 1e3 * e * t + "px";
					}
					addNextLabel() {
						this.labelCount++,
							this.tl.addLabel(`label#${this.labelCount}`);
					}
					get currentLabel() {
						return `label#${this.labelCount}`;
					}
					addHeaderColorChange(t) {
						let e =
							arguments.length > 1 && void 0 !== arguments[1]
								? arguments[1]
								: 0;
						this.tl.to(
							$(".siteHeader"),
							{ color: t, duration: 0.6 },
							`${this.currentLabel}+=${e}`
						);
					}
					addTextFadeInOut(t) {
						const e =
								"text" ===
								(arguments.length > 1 && void 0 !== arguments[1]
									? arguments[1]
									: "text")
									? 40
									: 60,
							i =
								(arguments.length > 2 && void 0 !== arguments[2]
									? arguments[2]
									: null) || this.currentLabel;
						this.tl.fromTo(
							t,
							{ opacity: 0 },
							{ opacity: 1, duration: 0.4 },
							i
						),
							this.tl.fromTo(
								t,
								{ y: 0.5 * e },
								{ y: 0.5 * -e, duration: 1.2, ease: "none" },
								i
							),
							this.tl.to(
								t,
								{ opacity: 0, duration: 0.4 },
								">-0.4"
							);
					}
					resize() {}
					update() {
						const t = y.height,
							e = this.$fixedContainer.getBoundingClientRect(),
							i = e.bottom - e.top - t;
						let s = 0;
						e.top <= 0 && (s = m.constrain(-e.top, 0, i)),
							(this.progress = s / i),
							h.isDesktop && this.isAnimation
								? (this.$fixedItem.style.transform = `translate3d(0, ${s}px, 0)`)
								: (this.$fixedItem.style.transform = "none"),
							this.isAuto || this.tl.progress(this.progress);
					}
				}
				var k = i(4409),
					M = i(4009),
					S = i(3984),
					_ = i(9568),
					C = i(9571),
					I = i(9809);
				const T = {
					width: 100,
					height: 100,
					halfWidth: 50,
					halfHeight: 50,
					fov: 60,
					cameraZ: 1e3,
					dpr: 1,
					aspectRatio: 1,
				};
				var E = i(259),
					P = i(5989),
					F = i(3746),
					O = i(3996),
					D = i(2216),
					z = i(739),
					B = i.n(z),
					A = i(1597),
					U = i.n(A);
				class W extends E.K {
					constructor() {
						super(),
							(this.numInstances = 60),
							(this.geometry = new P.L()),
							(this.baseGeometry = new O._(1024, 1024)),
							(this.geometry.index = this.baseGeometry.index),
							(this.geometry.attributes.position =
								this.baseGeometry.attributes.position),
							(this.geometry.attributes.uv =
								this.baseGeometry.attributes.uv),
							(this.instancePositions = new F.l(
								new Float32Array(3 * this.numInstances),
								3
							)),
							(this.instanceSeeds = new F.l(
								new Float32Array(1 * this.numInstances),
								1
							));
						for (let t = 0; t < this.numInstances; t++)
							this.instancePositions.setXYZ(
								t,
								m.random(-1e3, 1e3),
								m.random(-1e3, 1e3),
								2e3 * -Math.random()
							),
								this.instanceSeeds.setX(t, Math.random());
						this.geometry.setAttribute(
							"instancePosition",
							this.instancePositions
						),
							this.geometry.setAttribute(
								"instanceSeed",
								this.instanceSeeds
							);
						const t = new k.d().load("./assets/image/fog.png");
						(t.minFilter = S.we),
							(t.magFilter = S.we),
							(t.format = S.wk),
							(t.generateMipmaps = !1),
							(this.material = new D.F({
								uniforms: {
									texture: { value: t },
									time: { value: 0 },
									alpha: { value: 0 },
									zOffset: { value: -0.1 },
								},
								vertexShader: B(),
								fragmentShader: U(),
								transparent: !0,
								depthTest: !1,
								depthWrite: !1,
							})),
							(this.position.z = 10);
					}
					fadeIn() {
						s.p8.to(this.material.uniforms.alpha, {
							value: 0.5,
							duration: 3.4,
							ease: "power4.easeOut",
						}),
							s.p8.to(this.material.uniforms.zOffset, {
								value: 0,
								duration: 5,
								ease: "power4.easeOut",
							});
					}
					update(t) {
						(this.material.uniforms.time.value = t),
							0 === this.material.uniforms.alpha.value
								? (this.visible = !1)
								: (this.visible = !0);
					}
				}
				var N = i(5925);
				class H extends E.K {
					constructor() {
						super(), (this.geometry = new O._(1167 * 1.2, 738));
						const t = new k.d().load(
							"./assets/image/bathtub/shadow.png"
						);
						(t.minFilter = S.we),
							(t.magFilter = S.we),
							(t.format = S.wk),
							(t.generateMipmaps = !1),
							(this.material = new N.v({
								map: t,
								transparent: !0,
							})),
							y.width >= 960
								? this.position.set(70, -100, 0)
								: this.position.set(-350, 90, 0);
					}
					resize() {}
					update() {
						0 === this.material.opacity
							? (this.visible = !1)
							: (this.visible = !0);
					}
				}
				var V = i(8824),
					R = i(9400),
					Y = i(5688),
					j = i.n(Y),
					X = i(4657),
					Z = i.n(X);
				class q extends E.K {
					constructor() {
						super(),
							(this.isReady = !1),
							(this.width = 1228.7),
							(this.height = 579.7),
							(this.geometry = new O._(this.width, this.height)),
							(this.material = new D.F({
								uniforms: {
									texture: { value: null },
									alpha: { value: 0 },
								},
								vertexShader: j(),
								fragmentShader: Z(),
								transparent: !0,
							})),
							this.createTexture(),
							y.width >= 960
								? this.position.set(0, 0, 0)
								: this.position.set(-380, 150, 0);
					}
					async createTexture() {
						const t = [],
							e = new R.S();
						for (let i = 1; i <= 41; i++)
							t.push(
								new Promise((t) => {
									e.load(
										`./assets/image/bathtub/${String(
											i
										).padStart(2, "0")}.jpg`,
										(e) => {
											t(e);
										}
									);
								})
							);
						this.images = await Promise.all(t);
						const i = document.createElement("canvas");
						(i.width = 2234),
							(i.height = 1054),
							(this.texture = new V.R(i)),
							(this.texture.minFilter = S.we),
							(this.texture.magFilter = S.we),
							(this.texture.format = S.wk),
							(this.texture.generateMipmaps = !1),
							(this.material.uniforms.texture.value =
								this.texture),
							(this.ctx = i.getContext("2d")),
							(this.isReady = !0);
					}
					resize() {}
					update() {
						if (!this.isReady) return;
						0 === this.material.uniforms.alpha.value
							? (this.visible = !1)
							: (this.visible = !0);
						let t = 0;
						(t = m.constrain(yt.progress, 0.25, 0.62)),
							(t = m.map(t, 0.25, 0.62, 0, 1));
						const e = t * (this.images.length - 2),
							i = Math.floor(e),
							s = i + 1 === this.images.length ? 40 : i + 1,
							n = e % 2,
							a = n - Math.floor(n);
						this.ctx.clearRect(0, 0, 2234, 1054),
							(this.ctx.globalAlpha = 1),
							this.ctx.drawImage(
								this.images[i],
								0,
								0,
								2234,
								1054
							),
							(this.ctx.globalAlpha = a),
							this.ctx.drawImage(
								this.images[s],
								0,
								0,
								2234,
								1054
							),
							(this.texture.needsUpdate = !0);
					}
				}
				var G = i(4097),
					K = i.n(G),
					J = i(1250),
					Q = i.n(J);
				class tt extends E.K {
					constructor(t) {
						super(),
							(this.numInstances = t.numFogs),
							(this.geometry = new P.L()),
							(this.baseGeometry = new O._(1024, 1024)),
							(this.geometry.index = this.baseGeometry.index),
							(this.geometry.attributes.position =
								this.baseGeometry.attributes.position),
							(this.geometry.attributes.uv =
								this.baseGeometry.attributes.uv),
							(this.instancePositions = new F.l(
								new Float32Array(3 * this.numInstances),
								3
							)),
							(this.instanceSeeds = new F.l(
								new Float32Array(1 * this.numInstances),
								1
							)),
							this.prepareSection1(),
							this.geometry.setAttribute(
								"instancePosition",
								this.instancePositions
							),
							this.geometry.setAttribute(
								"instanceSeed",
								this.instanceSeeds
							);
						const e = new k.d().load("./assets/image/fog.png");
						(e.minFilter = S.we),
							(e.magFilter = S.we),
							(e.format = S.wk),
							(e.generateMipmaps = !1),
							(this.material = new D.F({
								uniforms: {
									texture: { value: e },
									time: { value: 0 },
									alpha: { value: 0 },
									scale: { value: 1 },
								},
								vertexShader: K(),
								fragmentShader: Q(),
								transparent: !0,
								depthTest: !1,
								depthWrite: !1,
							})),
							this.position.copy(t.position),
							(this.currentSection = 1);
					}
					resize() {
						if (3 !== this.currentSection) return;
						const t = T.width / 1600,
							e = T.height / 1050,
							i = Math.max(t, e);
						this.scale.set(i, i, 1);
					}
					prepareSection1() {
						this.currentSection = 1;
						for (let t = 0; t < this.numInstances; t++)
							this.instancePositions.setXYZ(
								t,
								m.random(-800, 800),
								m.random(-450, 450),
								0
							),
								this.instanceSeeds.setX(t, Math.random());
						(this.instancePositions.needsUpdate = !0),
							(this.instanceSeeds.needsUpdate = !0);
					}
					prepareSection3() {
						(this.currentSection = 3),
							this.instancePositions.setXYZ(0, -800, -250, 0),
							this.instancePositions.setXYZ(1, -650, -150, 0),
							this.instancePositions.setXYZ(2, -500, 0, 0),
							this.instancePositions.setXYZ(3, -350, 50, 0),
							this.instancePositions.setXYZ(4, -200, 150, 0),
							this.instancePositions.setXYZ(5, -50, 250, 0),
							this.instancePositions.setXYZ(6, 0, 300, 0),
							this.instancePositions.setXYZ(7, 200, 350, 0),
							this.instancePositions.setXYZ(8, 400, 350, 0),
							this.instancePositions.setXYZ(9, 600, 200, 0),
							this.instancePositions.setXYZ(10, 750, 0, 0),
							this.instancePositions.setXYZ(11, 800, -50, 0),
							(this.instancePositions.needsUpdate = !0),
							this.resize(),
							h.isDesktop
								? (this.material.uniforms.scale.value = 0.4)
								: (this.material.uniforms.scale.value = 0.3);
					}
					update(t) {
						(this.material.uniforms.time.value = t),
							0 === this.material.uniforms.alpha.value
								? (this.visible = !1)
								: (this.visible = !0);
					}
				}
				var et = i(6316),
					it = i.n(et),
					st = i(1255),
					nt = i.n(st);
				class at extends E.K {
					constructor() {
						super(),
							(this.numInstances = 20),
							(this.geometry = new P.L()),
							(this.baseGeometry = new O._(1024, 1024)),
							(this.geometry.index = this.baseGeometry.index),
							(this.geometry.attributes.position =
								this.baseGeometry.attributes.position),
							(this.geometry.attributes.uv =
								this.baseGeometry.attributes.uv);
						const t = new F.l(
								new Float32Array(3 * this.numInstances),
								3
							),
							e = new F.l(
								new Float32Array(1 * this.numInstances),
								1
							);
						for (let i = 0; i < this.numInstances; i++)
							t.setXYZ(
								i,
								m.random(-1e3, 1e3),
								m.random(-800, -600),
								m.random(-600, -300)
							),
								e.setX(i, Math.random());
						this.geometry.setAttribute("instancePosition", t),
							this.geometry.setAttribute("instanceSeed", e);
						const i = new k.d().load("./assets/image/bubble.png");
						(i.format = S.wk),
							(this.material = new D.F({
								uniforms: {
									texture: { value: i },
									time: { value: 0 },
									alpha: { value: 0 },
								},
								vertexShader: it(),
								fragmentShader: nt(),
								transparent: !0,
								depthTest: !1,
								depthWrite: !1,
							})),
							this.position.set(0, 0, 10);
					}
					update(t) {
						(this.material.uniforms.time.value = t),
							0 === this.material.uniforms.alpha.value
								? (this.visible = !1)
								: (this.visible = !0);
					}
				}
				var ot = i(8150),
					rt = i(8642),
					ht = i.n(rt),
					lt = i(8594),
					ct = i.n(lt);
				class dt extends E.K {
					constructor(t) {
						super();
						const e = t.width,
							i = t.height;
						(this.geometry = new ot.f(e, e, i, 32, 1, !0)),
							(this.material = new D.F({
								uniforms: {
									time: { value: 0 },
									alpha: { value: 0 },
									dx: { value: t.dx },
									dy: { value: t.dy },
									tx: { value: t.tx },
									ty: { value: t.ty },
								},
								vertexShader: ht(),
								fragmentShader: ct(),
								blending: S.WM,
								transparent: !0,
								depthTest: !1,
								depthWrite: !1,
							})),
							this.rotateX(t.rotation.x),
							this.rotateZ(t.rotation.z),
							this.rotateY(t.rotation.y);
					}
					resize() {}
					update(t) {
						0 === this.material.uniforms.alpha.value
							? (this.visible = !1)
							: (this.visible = !0),
							(this.material.uniforms.time.value = t);
					}
				}
				var ut = i(3178),
					pt = i.n(ut),
					mt = i(1240),
					vt = i.n(mt);
				class gt extends E.K {
					constructor(t) {
						super();
						const e = new k.d().load(t.src, (t) => {
							const e =
									t.image.width *
									(y.width >= 960 ? 0.55 : 0.34),
								i =
									t.image.height *
									(y.width >= 960 ? 0.55 : 0.34);
							this.geometry = new O._(e, i);
						});
						(e.minFilter = S.we),
							(e.magFilter = S.we),
							(e.generateMipmaps = !1),
							(this.material = new D.F({
								uniforms: {
									texture: { value: e },
									maskTexture: { value: null },
									time: { value: 0 },
									alpha: { value: t.alpha },
									mask: { value: t.mask },
								},
								vertexShader: pt(),
								fragmentShader: vt(),
								transparent: !0,
								depthTest: !1,
								depthWrite: !1,
							}));
					}
					resize() {}
					update(t) {
						0 === this.material.uniforms.alpha.value ||
						1 === this.material.uniforms.mask.value
							? (this.visible = !1)
							: (this.visible = !0),
							(this.material.uniforms.time.value = t);
					}
				}
				class ft extends E.K {
					constructor(t) {
						super();
						const e = new k.d().load(t.src, (e) => {
							const i = h.isDesktop ? t.scale.pc : t.scale.sp,
								s = e.image.width * i,
								n = e.image.height * i;
							this.geometry = new O._(s, n);
						});
						(e.minFilter = S.we),
							(e.magFilter = S.we),
							(e.format = S.wk),
							(e.generateMipmaps = !1),
							(this.material = new N.v({
								map: e,
								transparent: !0,
								opacity: 0,
							})),
							(this.pcPosition = t.position.pc),
							(this.spPosition = t.position.sp),
							y.width >= 960
								? this.position.copy(this.pcPosition)
								: this.position.copy(this.spPosition);
					}
					resize() {}
					update() {
						0 === this.material.opacity
							? (this.visible = !1)
							: (this.visible = !0);
					}
				}
				const xt = new (class extends class {
						constructor() {
							(this.container =
								document.getElementById("CanvasContainer")),
								this.setConfig(),
								(this.scene = new _.x()),
								(this.camera = new C.c(
									T.fov,
									T.aspectRatio,
									0.1,
									1e4
								)),
								this.camera.position.set(0, 0, T.cameraZ),
								(this.renderer = new I.C({
									alpha: !0,
									antialias: !1,
								})),
								this.renderer.setSize(T.width, T.height),
								this.renderer.setPixelRatio(T.dpr),
								this.container.appendChild(
									this.renderer.domElement
								);
						}
						setConfig() {
							const t = this.container.getBoundingClientRect(),
								e = t.width,
								i = t.height;
							h.isDesktop
								? ((T.dpr = Math.min(
										window.devicePixelRatio,
										1.5
								  )),
								  (T.cameraZ = 1e3))
								: ((T.dpr = window.devicePixelRatio),
								  (T.cameraZ = 1.5 * window.innerHeight)),
								(T.width = e),
								(T.height = i),
								(T.halfWidth = T.width / 2),
								(T.halfHeight = T.height / 2),
								(T.aspectRatio = T.width / T.height);
						}
						resizeScene() {
							(this.camera.aspect = T.aspectRatio),
								this.camera.updateProjectionMatrix(),
								this.renderer.setSize(T.width, T.height);
						}
					} {
						constructor() {
							super(),
								(this.resizeFunction = this.resize.bind(this)),
								(this.updateFunction = this.update.bind(this)),
								(this.fog = new W()),
								this.scene.add(this.fog),
								(this.shadow = new H()),
								this.scene.add(this.shadow),
								(this.bathtub = new q()),
								this.scene.add(this.bathtub),
								(this.backfog = new tt({
									position: new M.P(0, 0, -10),
									numFogs: 12,
								})),
								this.scene.add(this.backfog),
								(this.frontfog = new tt({
									position: new M.P(0, 0, 10),
									numFogs: 6,
								})),
								this.scene.add(this.frontfog),
								(this.bubble = new at()),
								this.scene.add(this.bubble),
								(this.units = [
									new gt({
										src: "./assets/image/section3/unit1.jpg",
										maskTexture: null,
										alpha: 0,
										mask: 0,
									}),
									new gt({
										src: "./assets/image/section3/unit2.jpg",
										maskTexture: null,
										alpha: 1,
										mask: 1,
									}),
									new gt({
										src: "./assets/image/section3/unit4.jpg",
										maskTexture: null,
										alpha: 0,
										mask: 0,
									}),
									new gt({
										src: "./assets/image/section3/unit3.jpg",
										maskTexture: null,
										alpha: 0,
										mask: 0,
									}),
								]),
								this.scene.add(...this.units),
								new k.d().load(
									"./assets/image/mask-texture.png",
									(t) => {
										(t.minFilter = S.we),
											(t.magFilter = S.we),
											(t.generateMipmaps = !1);
										for (
											let e = 0;
											e < this.units.length;
											e++
										)
											this.units[
												e
											].material.uniforms.maskTexture.value =
												t;
									}
								),
								(this.water1 = new dt({
									width: 44,
									height: 250,
									rotation: {
										x: 0,
										y: 0.5 * -Math.PI,
										z: 0.5 * -Math.PI,
									},
									dx: 4,
									dy: 0.6,
									tx: 0,
									ty: 0.8,
								})),
								this.scene.add(this.water1),
								(this.water2 = new dt({
									width: 47,
									height: 240,
									rotation: { x: 0, y: 0.5 * -Math.PI, z: 0 },
									dx: 1,
									dy: 4,
									tx: 0.8,
									ty: 0,
								})),
								this.scene.add(this.water2),
								(this.model = new ft({
									src: "./assets/image/section4/model.png",
									position: {
										pc: new M.P(-400, -70, 0),
										sp: new M.P(30, -30, 0),
									},
									scale: { pc: 1.1, sp: 1.1 },
								})),
								this.scene.add(this.model);
						}
						start() {
							this.fog.fadeIn();
						}
						get bathUniforms() {
							return this.bathtub.material.uniforms;
						}
						get fogUniforms() {
							return this.fog.material.uniforms;
						}
						get backfogUniforms() {
							return this.backfog.material.uniforms;
						}
						get frontfogUniforms() {
							return this.frontfog.material.uniforms;
						}
						get bubbleUniforms() {
							return this.bubble.material.uniforms;
						}
						get waterUniforms1() {
							return this.water1.material.uniforms;
						}
						get waterUniforms2() {
							return this.water2.material.uniforms;
						}
						resize() {
							this.setConfig(),
								this.resizeScene(),
								this.backfog.resize();
						}
						update() {
							const t = 0.001 * performance.now();
							this.shadow.update(t),
								this.bathtub.update(t),
								this.backfog.update(t),
								this.frontfog.update(t),
								this.fog.update(t),
								this.bubble.update(t);
							for (let e = 0; e < this.units.length; e++)
								this.units[e].update(t);
							this.water1.update(t),
								this.water2.update(t),
								this.model.update(t),
								this.renderer.render(this.scene, this.camera);
						}
					})(),
					yt = new (class extends L {
						constructor(t) {
							super(t);
						}
						createTimeLine() {
							if (this.isAnimation) return;
							this.isAnimation = !0;
							const t = $(".siteHeader"),
								e = $("#Background .bg-black"),
								i = $("#Background .bg-gray"),
								n = $(".catalog"),
								a = $(".keyvisual .primaryHeading"),
								o = $(
									".keyvisual_textWrap1 div[data-tween-target]"
								),
								r = $(
									".keyvisual_textWrap2 div[data-tween-target]"
								),
								l = $(
									".keyvisual_textWrap3 div[data-tween-target]"
								),
								c = $(
									".keyvisual_textWrap4 div[data-tween-target]"
								),
								d = $(
									".keyvisual_textWrap5 div[data-tween-target]"
								),
								u = $(".keyvisual_unitbg"),
								p = $(".keyvisual_moviebg"),
								m = $(".keyvisual_conceptHeading"),
								v = xt.bathUniforms,
								x = xt.fogUniforms,
								b = xt.backfogUniforms,
								w = xt.frontfogUniforms;
							this.tl.addLabel("start"),
								this.tl.to(
									$(".loading_copy"),
									{
										opacity: 0,
										scale: 1.1,
										duration: 1,
										ease: "power2.inOut",
									},
									"start+=-0.05"
								),
								this.tl.to(
									x.zOffset,
									{
										value: 1,
										duration: 3,
										ease: "power2.inOut",
									},
									"start+=0.05"
								),
								this.tl.call(
									() => {
										h.isDesktop || f.kill();
									},
									null,
									"start+=0.08"
								),
								this.tl.addLabel("fogEnd"),
								this.tl.fromTo(
									v.alpha,
									{ value: 0 },
									{
										value: 1,
										duration: 2,
										ease: "power2.inOut",
									},
									"fogEnd-=2"
								),
								this.tl.fromTo(
									[xt.bathtub.scale, xt.shadow.scale],
									{ x: 0.8, y: 0.8 },
									{
										x: 1,
										y: 1,
										duration: 2,
										ease: "power2.inOut",
									},
									"fogEnd-=2"
								),
								this.tl.fromTo(
									xt.shadow.material,
									{ opacity: 0 },
									{
										opacity: 0.7,
										duration: 2,
										ease: "power2.inOut",
									},
									"fogEnd-=2"
								),
								this.tl.fromTo(
									b.alpha,
									{ value: 0 },
									{
										value: 0.25,
										duration: 2,
										ease: "power2.inOut",
									},
									"fogEnd-=2"
								),
								this.tl.fromTo(
									w.alpha,
									{ value: 0 },
									{
										value: 0.15,
										duration: 2,
										ease: "power2.inOut",
									},
									"fogEnd-=2"
								),
								this.tl.to(
									x.alpha,
									{ value: 0, duration: 0.4 },
									"fogEnd-=0.8"
								),
								this.tl.call(
									() => {
										g.isLoadingEnd ||
											(h.isDesktop && f.hideScroll());
									},
									null,
									"fogEnd-=0.8"
								),
								this.tl.addLabel("smokeEnd"),
								this.tl.call(() => {
									(g.isLoadingEnd = !0),
										document.body.classList.toggle(
											"state-loadingEnd"
										),
										bt.closeMenu();
								}),
								this.tl.fromTo(
									[a, n],
									{ opacity: 0, y: 20 },
									{ opacity: 1, y: 0, duration: 0.8 },
									"smokeEnd-=0.4"
								),
								this.tl.fromTo(
									t,
									{ opacity: 0, y: -20 },
									{ opacity: 1, y: 0, duration: 0.8 },
									"smokeEnd-=0.4"
								),
								this.tl.addLabel("kvEnd", "+=0.4"),
								this.tl.to(
									a,
									{ y: -40, opacity: 0, duration: 1.6 },
									"kvEnd"
								),
								this.tl.call(
									() => {
										s.p8.to(n, { x: 480, duration: 1 }),
											s.p8.to(
												[
													$(".catalog_box1"),
													$(".catalog_box2"),
												],
												{ opacity: 0, duration: 1 }
											),
											s.p8.to($(".catalog_box3"), {
												opacity: 1,
												x: 0,
												duration: 0.6,
												delay: 0.2,
											});
									},
									null,
									"kvEnd"
								);
							const L = () => (y.width >= 960 ? 1.25 : 1.1);
							this.tl.to(
								[xt.bathtub.scale, xt.shadow.scale],
								{ x: L, y: L, duration: 1.6 },
								"kvEnd"
							),
								this.tl.to(
									xt.bathtub.position,
									{
										x: () => (y.width >= 960 ? -760 : -480),
										y: () => (y.width >= 960 ? -30 : 100),
										duration: 1.6,
									},
									"kvEnd"
								),
								this.tl.to(
									xt.shadow.position,
									{
										x: () => (y.width >= 960 ? -700 : -440),
										y: () => (y.width >= 960 ? -80 : 60),
										duration: 1.6,
									},
									"kvEnd"
								),
								this.tl.to(
									w.alpha,
									{ value: 0, duration: 1.6 },
									"kvEnd"
								),
								this.tl.addLabel(
									"AmazingExperience",
									"kvEnd+=1.2"
								),
								this.tl.call(
									() => {
										bt.toggleSection(0, 9999);
									},
									null,
									"AmazingExperience"
								),
								this.addTextFadeInOut(
									o,
									"text",
									"AmazingExperience"
								),
								this.addNextLabel(),
								this.addTextFadeInOut(r),
								this.addNextLabel(),
								this.addTextFadeInOut(l),
								this.tl.to(
									v.alpha,
									{ value: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.tl.to(
									xt.shadow.material,
									{ opacity: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.tl.to(
									[x.alpha, b.alpha, w.alpha],
									{ value: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.addNextLabel(),
								this.tl.fromTo(
									u,
									{ opacity: 0 },
									{ opacity: 1, duration: 1.2 },
									this.currentLabel
								),
								this.addTextFadeInOut(c),
								this.addNextLabel(),
								this.addTextFadeInOut(d),
								this.tl.to(
									u,
									{ opacity: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.addNextLabel(),
								this.addHeaderColorChange("#fff"),
								this.tl.addLabel(
									"ConceptMovie",
									this.currentLabel
								),
								this.tl.call(
									() => {
										bt.toggleSection(0, 1),
											f.showCursor(),
											g.isMovieArea
												? (f.hidePlay(), (f.state = ""))
												: f.togglePlayClose("play"),
											(g.isMovieArea = !g.isMovieArea);
									},
									null,
									"ConceptMovie"
								),
								this.tl.fromTo(
									p,
									{ opacity: 0 },
									{ opacity: 1, duration: 0.6 },
									"ConceptMovie"
								),
								this.addTextFadeInOut(
									m,
									"heading",
									"ConceptMovie"
								),
								this.addNextLabel(),
								this.tl.to(
									[p, e, i],
									{ opacity: 0, duration: 1.2 },
									this.currentLabel
								),
								this.addHeaderColorChange("#111"),
								this.tl.call(
									() => {
										bt.toggleSection(1, 2),
											f.showCursor(),
											g.isMovieArea
												? (f.hidePlay(), (f.state = ""))
												: f.togglePlayClose("play"),
											(g.isMovieArea = !g.isMovieArea);
									},
									null,
									this.currentLabel
								),
								this.setContainerHeight();
						}
						resize() {
							super.resize();
						}
						update() {
							super.update();
						}
					})($(".keyvisual_content"));
				s.p8.registerPlugin(w.L);
				const bt = new (class {
					constructor() {
						(this.$menu = $(".siteMenu")),
							(this.$menuOpenText = $(".siteHeader_menuText")),
							(this.$menuCloseText = $(".siteHeader_closeText")),
							(this.$menuBg = $(".siteMenu_bg")),
							(this.$menuBody = $(".siteMenu_body")),
							(this.$$menuItems = $$(".siteMenu_item")),
							(this.$specSection = $(".spec")),
							(this.$faqSection = $(".faq")),
							(this.sectionIndex = 9999),
							$(".siteHeader_logo").addEventListener(
								"click",
								this.scrollTop.bind(this)
							),
							$(".siteHeader_menuBtn").addEventListener(
								"click",
								() => {
									g.isMenuOpen
										? this.closeMenu()
										: this.openMenu();
								}
							),
							this.$$menuItems.forEach((t) => {
								t.addEventListener("click", (e) => {
									e.stopPropagation();
									const i = t.dataset.targetSection;
									let s = parseInt(t.dataset.offset);
									if ("#Sec1" === i) {
										const e = t.dataset.targetLabel;
										s = Math.floor(
											1e3 * parseFloat(yt.tl.labels[e])
										);
									} else
										"#Sec2" === i &&
											y.width < 960 &&
											(s = -80);
									this.scrollTo(i, -s), this.closeMenu();
								});
							});
					}
					resize() {}
					update() {
						this.needsUpdate && this.render();
						const t = this.$specSection.getBoundingClientRect(),
							e = this.$faqSection.getBoundingClientRect();
						t.top < 0 && t.bottom > 0 && this.changeSection(4),
							e.top < 0 && e.bottom > 0 && this.changeSection(5),
							e.bottom < 0 && this.changeSection(6);
					}
					openMenu() {
						g.isMenuOpen ||
							(this.$menu.classList.remove("off"),
							(g.isMenuOpen = !0),
							s.p8.to(this.$menuOpenText, {
								opacity: 0,
								y: -10,
								duration: 0.6,
							}),
							s.p8.fromTo(
								this.$menuCloseText,
								{ opacity: 0, y: 5 },
								{ opacity: 1, y: 0, duration: 0.6 }
							),
							s.p8.fromTo(
								this.$menuBg,
								{ opacity: 0, x: 100 },
								{ opacity: 1, x: 0, duration: 1 }
							),
							s.p8.fromTo(
								this.$menuBody,
								{ opacity: 0 },
								{ opacity: 1, duration: 0.8 }
							),
							s.p8.fromTo(
								this.$menuBody,
								{ x: 120 },
								{ x: 0, duration: 1 }
							));
					}
					closeMenu() {
						g.isMenuOpen &&
							(this.$menu.classList.add("off"),
							(g.isMenuOpen = !1),
							s.p8.to(this.$menuCloseText, {
								opacity: 0,
								y: -10,
								duration: 0.6,
							}),
							s.p8.fromTo(
								this.$menuOpenText,
								{ opacity: 0, y: 5 },
								{ opacity: 1, y: 0, duration: 0.6 }
							),
							s.p8.to(this.$menuBg, {
								opacity: 0,
								x: 100,
								duration: 1,
							}),
							s.p8.to(this.$menuBody, {
								opacity: 0,
								duration: 0.8,
							}),
							s.p8.to(this.$menuBody, { x: 120, duration: 1 }));
					}
					async changeSection(t) {
						t !== this.sectionIndex &&
							(this.sectionIndex >= 0 &&
								this.sectionIndex < this.$$menuItems.length &&
								this.$$menuItems[
									this.sectionIndex
								].classList.remove("on"),
							(this.sectionIndex = t),
							t >= this.$$menuItems.length ||
								this.$$menuItems[
									this.sectionIndex
								].classList.add("on"));
					}
					toggleSection(t, e) {
						this.sectionIndex === t
							? this.changeSection(e)
							: this.sectionIndex === e && this.changeSection(t);
					}
					async fadeOutInPage() {
						s.p8.killTweensOf(document.body),
							s.p8.to(document.body, {
								opacity: 0,
								duration: 0.6,
								ease: "cusomEaseOut",
							}),
							await v(1),
							s.p8.to(document.body, {
								opacity: 1,
								duration: 0.4,
								ease: "cusomEaseOut",
							});
					}
					scrollTop() {
						this.fadeOutInPage(),
							s.p8.to(window, {
								duration: 1.6,
								ease: "scrollEase",
								scrollTo: { y: 0, autoKill: !1 },
							});
					}
					async scrollTo(t) {
						let e =
							arguments.length > 1 && void 0 !== arguments[1]
								? arguments[1]
								: 0;
						this.fadeOutInPage(),
							s.p8.to(window, {
								duration: 1.6,
								ease: "scrollEase",
								scrollTo: { y: t, offsetY: e, autoKill: !1 },
							});
					}
				})();
				s.p8.registerPlugin(w.L),
					new (class {
						constructor() {
							(this.$el = $(".catalog")),
								(this.prevTouchY = 2 * window.innerHeight),
								h.isDesktop && this.setDesktopEvents();
						}
						setDesktopEvents() {
							this.$el.addEventListener(
								"mouseenter",
								this.show.bind(this)
							),
								this.$el.addEventListener(
									"mouseleave",
									this.hide.bind(this)
								),
								$(".catalog_text").addEventListener(
									"click",
									this.scroll.bind(this)
								);
						}
						show() {
							s.p8.to(this.$el, {
								x: 0,
								duration: 0.9,
								onComplete: () => {
									this.$el.classList.add("on");
								},
							}),
								s.p8.to(
									[$(".catalog_box1"), $(".catalog_box2")],
									{ opacity: 1, duration: 0.9 }
								),
								s.p8.to($(".catalog_box3"), {
									opacity: 0,
									x: -20,
									duration: 0.4,
								});
						}
						hide() {
							this.$el.classList.remove("on"),
								s.p8.to(this.$el, { x: 480, duration: 0.9 }),
								s.p8.to(
									[$(".catalog_box1"), $(".catalog_box2")],
									{ opacity: 0, duration: 0.9 }
								),
								s.p8.to($(".catalog_box3"), {
									opacity: 1,
									x: 0,
									duration: 0.4,
								});
						}
						fadeOutInPage() {
							s.p8.to(document.body, {
								opacity: 0,
								duration: 0.3,
							}),
								s.p8.to(document.body, {
									opacity: 1,
									duration: 0.3,
									delay: 0.9,
								});
						}
						scroll(t) {
							t.stopPropagation(),
								this.fadeOutInPage(),
								s.p8.to(window, {
									duration: 1.2,
									scrollTo: {
										y: "#RequestLink",
										offsetY: 0,
										autoKill: !1,
									},
								});
						}
					})(),
					new (class {
						constructor() {
							h.isDesktop &&
								((this.$wrap = $(".movie")),
								(this.$area = $(".movie_area")),
								(this.$video = $(".movie_video")),
								(this.$uiWrap = $(".movie_uiWrap")),
								(this.$playBtn = $(".movie_play")),
								(this.$pauseBtn = $(".movie_pause")),
								(this.$seekbar = $(".movie_seekbar")),
								(this.$progress = $(".movie_seekbar_progress")),
								(this.$knob = $(".movie_seekbar_knob")),
								(this.$currentTime = $(".movie_time-current")),
								(this.$volumeIcon = $(".movie_volumeIcon")),
								(this.$volumeBar = $(".movie_volumeBar")),
								(this.$currentVolume = $(
									".movie_volumeBar_current"
								)),
								(this.$moviebg = $(".keyvisual_moviebg")),
								(this.seekBarRect =
									this.$seekbar.getBoundingClientRect()),
								(this.volumeBarRect =
									this.$volumeBar.getBoundingClientRect()),
								(this.currentVolume = 0.5),
								(this.fadeInterval = 3e3),
								(this.fadeTime = 0),
								(this.isMovieVisible = !1),
								(this.isMoviePlaying = !1),
								(this.isPointerDown = !1),
								(this.isVolumeBarDown = !1),
								(this.isMuted = !1),
								this.setShowEvent(),
								this.setPlayEvent(),
								this.setSeekBarEvent(),
								this.setVolumeEvent(),
								this.setEndEvent(),
								d.add(this.update.bind(this)),
								p.add(this.onMouseMove.bind(this)));
						}
						setShowEvent() {
							h.isDesktop &&
								this.$moviebg.addEventListener("click", (t) => {
									t.stopPropagation(),
										0 !==
											parseFloat(
												this.$moviebg.style.opacity
											) &&
											(this.isMovieVisible ||
												this.show());
								}),
								this.$area.addEventListener("click", (t) => {
									t.stopPropagation(), this.close();
								});
						}
						async show() {
							(document.body.style.overflow = "hidden"),
								this.$wrap.classList.remove("off"),
								f.togglePlayClose("close"),
								await v(0.6),
								this.playMovie(),
								(this.isMovieVisible = !0),
								(this.fadeTime = performance.now());
						}
						async close() {
							this.pauseMovie(),
								this.$wrap.classList.add("off"),
								f.togglePlayClose("play"),
								await v(0.6),
								(document.body.style.overflow = "visible"),
								(this.isMovieVisible = !1);
						}
						playMovie() {
							this.$video.play(),
								(this.isMoviePlaying = !0),
								this.$playBtn.classList.add("off"),
								this.$pauseBtn.classList.remove("off");
						}
						pauseMovie() {
							this.$video.pause(),
								(this.isMoviePlaying = !1),
								this.$playBtn.classList.remove("off"),
								this.$pauseBtn.classList.add("off");
						}
						setPlayEvent() {
							this.$playBtn.addEventListener("click", (t) => {
								t.stopPropagation(), this.playMovie();
							}),
								this.$pauseBtn.addEventListener(
									"click",
									(t) => {
										t.stopPropagation(), this.pauseMovie();
									}
								);
						}
						setSeekBarEvent() {
							let t = h.isDesktop ? "pointerdown" : "touchstart",
								e = h.isDesktop ? "pointermove" : "touchmove",
								i = h.isDesktop ? "pointerup" : "touchend";
							this.$seekbar.addEventListener(t, (t) => {
								t.stopPropagation(),
									(this.isPointerDown = !0),
									this.setCurrentTime(t);
							}),
								window.addEventListener(e, (t) => {
									this.isPointerDown &&
										this.setCurrentTime(t);
								}),
								window.addEventListener(i, (t) => {
									this.isPointerDown = !1;
								});
						}
						setCurrentTime(t) {
							let e =
								((h.isDesktop
									? t.clientX
									: t.changedTouches[0].clientX) -
									this.seekBarRect.left) /
								this.seekBarRect.width;
							this.$video.currentTime = e * this.$video.duration;
						}
						setVolumeEvent() {
							let t = h.isDesktop ? "pointerdown" : "touchstart",
								e = h.isDesktop ? "pointermove" : "touchmove",
								i = h.isDesktop ? "pointerup" : "touchend";
							$(".movie_volume").addEventListener(
								"mouseenter",
								() => {
									this.$volumeBar.classList.remove("off");
								}
							),
								$(".movie_volume").addEventListener(
									"mouseleave",
									() => {
										this.$volumeBar.classList.add("off");
									}
								),
								this.$volumeIcon.addEventListener(
									"click",
									(t) => {
										t.stopPropagation(),
											this.isMuted
												? ((this.$video.volume =
														this.currentVolume),
												  (this.$currentVolume.style.transform = `scaleY(${this.currentVolume})`))
												: ((this.$video.volume = 0),
												  (this.$currentVolume.style.transform =
														"scaleY(0)")),
											(this.isMuted = !this.isMuted);
									}
								),
								this.$volumeBar.addEventListener(t, (t) => {
									t.stopPropagation(),
										(this.isVolumeBarDown = !0),
										this.setVolume(t);
								}),
								window.addEventListener(e, (t) => {
									this.isVolumeBarDown && this.setVolume(t);
								}),
								window.addEventListener(i, (t) => {
									this.isVolumeBarDown = !1;
								});
						}
						setVolume(t) {
							const e = window.innerHeight;
							let i =
								(e -
									(h.isDesktop
										? t.clientY
										: t.changedTouches[0].clientY) -
									(e - this.volumeBarRect.bottom)) /
								this.volumeBarRect.height;
							(i = m.constrain(i, 0, 1)),
								(this.currentVolume = i),
								(this.$video.volume = i),
								(this.$currentVolume.style.transform = `scaleY(${this.currentVolume})`);
						}
						setEndEvent() {
							this.$video.addEventListener("ended", () => {
								this.close();
							});
						}
						onMouseMove() {
							this.showControls(),
								(this.fadeTime = performance.now());
						}
						hideControls() {
							this.$uiWrap.classList.add("off");
						}
						showControls() {
							this.$uiWrap.classList.remove("off");
						}
						update() {
							if (!this.isMovieVisible) return;
							performance.now() - this.fadeTime >
								this.fadeInterval && this.hideControls();
							const t = this.$video.duration,
								e = this.$video.currentTime,
								i = e / t;
							(this.$progress.style.transform = `scaleX(${i})`),
								(this.$knob.style.left = 100 * i + "%");
							const s = String(Math.floor(e)).padStart(2, "0");
							(this.$currentTime.textContent = `0:${s}`),
								(this.seekBarRect =
									this.$seekbar.getBoundingClientRect()),
								(this.volumeBarRect =
									this.$volumeBar.getBoundingClientRect());
						}
					})(),
					new (class {
						constructor() {
							h.isDesktop ||
								((this.$movie = $(".spMovie")),
								(this.$video = $(".spMovie_video")),
								(this.$moviebg = $(".keyvisual_moviebg")),
								$(".keyvisual_playBtn").addEventListener(
									"click",
									() => {
										0 !==
											parseFloat(
												this.$moviebg.style.opacity
											) && this.play();
									}
								),
								$(".spMovie_area").addEventListener(
									"click",
									() => {
										this.pause();
									}
								));
						}
						play() {
							this.$movie.classList.remove("off"),
								this.$video.play();
						}
						pause() {
							this.$movie.classList.add("off"),
								this.$video.pause();
						}
					})();
				const wt = new (class extends L {
						constructor(t) {
							super(t);
						}
						createTimeLine() {
							if (this.isAnimation) return;
							this.isAnimation = !0;
							const t = $(
									".section2_textWrap1 div[data-tween-target]"
								),
								e = $(
									".section2_textWrap2 div[data-tween-target]"
								),
								i = $(
									".section2_textWrap3 div[data-tween-target]"
								),
								s = $(
									".section2_textWrap4 div[data-tween-target]"
								),
								n = $(
									".section2_textWrap5 div[data-tween-target]"
								),
								a = $(".section2_image1"),
								o = $(".section2_image2"),
								r = $(".section2_image3"),
								h = $(".section2_image4");
							this.addNextLabel(),
								this.tl.fromTo(
									a,
									{ opacity: 0 },
									{ opacity: 1, duration: 0.4 },
									this.currentLabel
								),
								this.addTextFadeInOut(t),
								this.addNextLabel(),
								this.addTextFadeInOut(e),
								this.tl.to(
									a,
									{ opacity: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.addNextLabel(),
								this.tl.fromTo(
									o,
									{ opacity: 0 },
									{ opacity: 1, duration: 0.4 },
									this.currentLabel
								),
								this.addTextFadeInOut(i),
								this.tl.to(
									o,
									{ opacity: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.addNextLabel(),
								this.tl.fromTo(
									r,
									{ opacity: 0 },
									{ opacity: 1, duration: 0.4 },
									this.currentLabel
								),
								this.addTextFadeInOut(s),
								this.tl.to(
									r,
									{ opacity: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.addNextLabel(),
								this.tl.fromTo(
									h,
									{ opacity: 0 },
									{ opacity: 1, duration: 0.4 },
									this.currentLabel
								),
								this.addTextFadeInOut(n),
								this.tl.to(
									h,
									{ opacity: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.setContainerHeight();
						}
						killTimeLine() {
							this.tl.clear(), (this.isAnimation = !1);
						}
						resize() {
							super.resize();
						}
						update() {
							super.update();
						}
					})($(".section2_content")),
					$t = new (class extends L {
						constructor(t) {
							super(t);
						}
						createTimeLine() {
							if (this.isAnimation) return;
							this.isAnimation = !0;
							const t = $("#Background .bg-black"),
								e = $(".section2"),
								i = xt.units[0].material.uniforms,
								s = xt.units[1].material.uniforms,
								n = xt.units[2].material.uniforms,
								a = xt.units[3].material.uniforms,
								o = xt.waterUniforms1,
								r = xt.waterUniforms2,
								h = $(".section3 .primaryHeading"),
								l = $(".section3_note"),
								c = $(
									".section3_textWrap1 div[data-tween-target]"
								),
								d = $(
									".section3_textWrap2 div[data-tween-target]"
								),
								u = $(
									".section3_textWrap3 div[data-tween-target]"
								),
								p = $(".section3_popTextWrap1"),
								m = $(".section3_popTextWrap2"),
								v = $(".section3_popTextWrap3"),
								f = $(".section3_popTextWrap4"),
								x = $(".dataBannerText"),
								b = $(".dataBannerImage");
							this.addNextLabel(),
								this.tl.to(
									t,
									{ opacity: 1, duration: 0.6 },
									this.currentLabel
								),
								this.tl.to(
									e,
									{ opacity: 0, duration: 0.6 },
									this.currentLabel
								),
								this.addHeaderColorChange("#fff"),
								this.tl.call(() => {
									bt.toggleSection(2, 3);
								}),
								this.addNextLabel(),
								this.addTextFadeInOut(h, "heading"),
								this.tl.call(
									() => {
										y.width >= 960
											? ((xt.units[0].position.y = 40),
											  (xt.units[1].position.y = 40))
											: ((xt.units[0].position.y = 100),
											  (xt.units[1].position.y = 100));
									},
									null,
									this.currentLabel
								),
								this.tl.to(
									i.alpha,
									{ value: 1, duration: 1.2 },
									this.currentLabel
								),
								this.addNextLabel(),
								this.tl.to(
									s.mask,
									{
										value: 0,
										duration: 1.6,
										ease: "power1.inOut",
									},
									this.currentLabel
								),
								this.addNextLabel(),
								this.tl.fromTo(
									p,
									{ opacity: 0, x: -10 },
									{ opacity: 1, x: 0, duration: 1.2 },
									this.currentLabel
								),
								this.tl.fromTo(
									m,
									{ opacity: 0, x: 10 },
									{ opacity: 1, x: 0, duration: 1.2 },
									this.currentLabel
								),
								this.tl.fromTo(
									l,
									{ opacity: 0 },
									{ opacity: 1, duration: 1.2 },
									this.currentLabel
								),
								this.tl.call(
									() => {
										g.scroll.velocity > 0
											? b.classList.add("clickable")
											: b.classList.remove("clickable");
									},
									null,
									this.currentLabel
								),
								this.tl.fromTo(
									[x, b],
									{ opacity: 0 },
									{ opacity: 1, duration: 1.2 },
									this.currentLabel
								),
								this.addNextLabel(),
								this.tl.to(
									p,
									{ opacity: 0, duration: 0.8 },
									this.currentLabel
								),
								this.tl.to(
									m,
									{ opacity: 0, duration: 0.8 },
									this.currentLabel
								),
								this.addNextLabel(),
								this.tl.to(
									l,
									{ opacity: 0, duration: 1.2 },
									this.currentLabel
								),
								y.width >= 960
									? (this.tl.to(
											[
												xt.units[0].position,
												xt.units[1].position,
											],
											{
												x: 380,
												y: 0,
												duration: 1.2,
												ease: "power1.inOut",
											},
											this.currentLabel
									  ),
									  this.tl.to(
											[
												xt.units[0].scale,
												xt.units[1].scale,
											],
											{
												x: 0.86,
												y: 0.86,
												duration: 1.2,
												ease: "power1.inOut",
											},
											this.currentLabel
									  ))
									: (this.tl.to(
											[
												xt.units[0].position,
												xt.units[1].position,
											],
											{
												x: 140,
												y: 0.045 * window.innerHeight,
												duration: 1.2,
												ease: "power1.inOut",
											},
											this.currentLabel
									  ),
									  this.tl.to(
											[
												xt.units[0].scale,
												xt.units[1].scale,
											],
											{
												x: 1.4,
												y: 1.4,
												duration: 1.2,
												ease: "power1.inOut",
											},
											this.currentLabel
									  )),
								this.tl.to(
									s.mask,
									{
										value: 1,
										duration: 1.6,
										ease: "power1.inOut",
									},
									this.currentLabel
								),
								y.width < 960 &&
									this.tl.to(
										i.alpha,
										{ value: 0.5, duration: 1.6 },
										this.currentLabel
									),
								this.addNextLabel(),
								this.tl.call(
									() => {
										y.width >= 960
											? xt.water1.position.set(420, 32, 0)
											: xt.water1.position.set(
													200,
													64,
													0
											  );
									},
									null,
									this.currentLabel
								),
								this.tl.to(
									o.alpha,
									{ value: 1, duration: 1.2 },
									this.currentLabel
								),
								this.addTextFadeInOut(c),
								this.addNextLabel(),
								this.addTextFadeInOut(d),
								this.tl.to(
									[i.alpha, s.alpha, o.alpha],
									{
										value: 0,
										duration: 0.4,
										ease: "power1.inOut",
									},
									`${this.currentLabel}+=0.8`
								),
								this.addNextLabel(),
								this.tl.call(
									() => {
										y.width >= 960
											? ((xt.units[2].position.y = 20),
											  xt.units[2].scale.set(
													0.95,
													0.95,
													1
											  ),
											  (xt.units[3].position.y = 20),
											  xt.units[3].scale.set(
													0.95,
													0.95,
													1
											  ))
											: ((xt.units[2].position.y = 100),
											  xt.units[2].scale.set(1, 1, 1),
											  (xt.units[3].position.y = 100),
											  xt.units[3].scale.set(1, 1, 1));
									},
									null,
									this.currentLabel
								),
								this.tl.to(
									a.alpha,
									{ value: 1, duration: 1.2 },
									this.currentLabel
								),
								this.addNextLabel(),
								this.tl.fromTo(
									v,
									{ opacity: 0, x: -10 },
									{ opacity: 1, x: 0, duration: 1.2 },
									this.currentLabel
								),
								this.tl.fromTo(
									f,
									{ opacity: 0, x: 10 },
									{ opacity: 1, x: 0, duration: 1.2 },
									this.currentLabel
								),
								this.addNextLabel(),
								this.tl.to(
									v,
									{ opacity: 0, duration: 0.8 },
									this.currentLabel
								),
								this.tl.to(
									f,
									{ opacity: 0, duration: 0.8 },
									this.currentLabel
								),
								this.addNextLabel(),
								y.width >= 960 &&
									(this.tl.to(
										[
											xt.units[2].position,
											xt.units[3].position,
										],
										{
											x: -300,
											y: 60,
											duration: 1.2,
											ease: "power1.inOut",
										},
										this.currentLabel
									),
									this.tl.to(
										[xt.units[2].scale, xt.units[3].scale],
										{
											x: 0.9,
											y: 0.9,
											duration: 1.2,
											ease: "power1.inOut",
										},
										this.currentLabel
									)),
								this.tl.to(
									a.mask,
									{
										value: 1,
										duration: 1.6,
										ease: "power1.inOut",
									},
									this.currentLabel
								),
								y.width >= 960
									? this.tl.to(
											n.alpha,
											{ value: 1, duration: 1.2 },
											this.currentLabel
									  )
									: this.tl.to(
											n.alpha,
											{ value: 0.5, duration: 1.2 },
											this.currentLabel
									  ),
								this.addNextLabel(),
								this.addTextFadeInOut(u),
								this.tl.call(
									() => {
										y.width >= 960
											? (xt.water2.position.set(
													-328,
													-45,
													0
											  ),
											  xt.water2.scale.set(
													0.96,
													0.96,
													0.96
											  ))
											: (xt.water2.position.set(
													-23,
													20,
													0
											  ),
											  xt.water2.scale.set(
													0.79,
													0.79,
													0.79
											  ));
									},
									null,
									this.currentLabel
								),
								this.tl.to(
									r.alpha,
									{ value: 1, duration: 0.4 },
									this.currentLabel
								),
								this.tl.to(
									[n.alpha, a.alpha, r.alpha],
									{ value: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.setContainerHeight();
						}
						resize() {
							super.resize();
						}
						update() {
							super.update();
						}
					})($(".section3_content")),
					Lt = new (class extends L {
						constructor(t) {
							super(t);
						}
						createTimeLine() {
							if (this.isAnimation) return;
							this.isAnimation = !0;
							const t = $("#Background .bg-bubble"),
								e = $("#Background .bg-black"),
								i = $(
									".section4_heading1 div[data-tween-target]"
								),
								s = $(
									".section4_heading2 div[data-tween-target]"
								),
								n = $(
									".section4_textWrap1 div[data-tween-target]"
								),
								a = $(
									".section4_textWrap2 div[data-tween-target]"
								),
								o = $(
									".section4_textWrap3 div[data-tween-target]"
								),
								r = $(".bubbles"),
								h = $(".dataBannerText"),
								l = $(".dataBannerImage"),
								c = xt.bubbleUniforms,
								d = xt.backfogUniforms;
							this.addNextLabel(),
								this.tl.fromTo(
									t,
									{ opacity: 0 },
									{ opacity: 1, duration: 1.2 },
									this.currentLabel
								),
								this.tl.to(
									d.alpha,
									{ value: 0.25, duration: 1.2 },
									this.currentLabel
								),
								this.tl.to(
									c.alpha,
									{ value: 1, duration: 1.2 },
									this.currentLabel
								),
								this.tl.fromTo(
									xt.model.material,
									{ opacity: 0 },
									{ opacity: 1, duration: 1.2 },
									this.currentLabel
								),
								this.addNextLabel(),
								this.addTextFadeInOut(i, "heading"),
								this.tl.call(() => {
									g.scroll.velocity > 0
										? n.parentNode.classList.add(
												"clickable"
										  )
										: n.parentNode.classList.remove(
												"clickable"
										  );
								}),
								this.addNextLabel(),
								this.addTextFadeInOut(n),
								this.tl.call(() => {
									g.scroll.velocity > 0
										? n.parentNode.classList.remove(
												"clickable"
										  )
										: n.parentNode.classList.add(
												"clickable"
										  );
								}),
								this.tl.to(
									xt.model.material,
									{ opacity: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.tl.to(
									c.alpha,
									{ value: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.addNextLabel(),
								this.addTextFadeInOut(s, "heading"),
								this.tl.call(() => {
									g.scroll.velocity > 0
										? a.parentNode.classList.add(
												"clickable"
										  )
										: a.parentNode.classList.remove(
												"clickable"
										  );
								}),
								this.addNextLabel(),
								this.addTextFadeInOut(a),
								this.tl.call(() => {
									g.scroll.velocity > 0
										? a.parentNode.classList.remove(
												"clickable"
										  )
										: a.parentNode.classList.add(
												"clickable"
										  );
								}),
								this.addNextLabel(),
								this.tl.to(
									t,
									{ opacity: 0, duration: 1.2 },
									this.currentLabel
								),
								this.tl.to(
									d.alpha,
									{ value: 0, duration: 1.2 },
									this.currentLabel
								),
								this.addNextLabel(),
								this.addTextFadeInOut(o),
								this.tl.fromTo(
									r,
									{ opacity: 0 },
									{ opacity: 1, duration: 0.4 },
									this.currentLabel
								),
								this.tl.to(
									r,
									{ opacity: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.tl.to(
									[h, l],
									{ opacity: 0, duration: 0.4 },
									`${this.currentLabel}+=0.8`
								),
								this.tl.call(() => {
									g.scroll.velocity > 0
										? l.classList.remove("clickable")
										: l.classList.add("clickable");
								}),
								this.addNextLabel(),
								this.addHeaderColorChange("#111"),
								this.tl.to(
									e,
									{ opacity: 0, duration: 1.2 },
									this.currentLabel
								),
								this.tl.call(
									() => {
										g.scroll.velocity < 0 &&
											bt.changeSection(3);
									},
									null,
									this.currentLabel
								),
								this.setContainerHeight();
						}
						resize() {
							super.resize();
						}
						update() {
							super.update();
						}
					})($(".section4_content"));
				class kt {
					constructor() {
						(this.container = $("#PageWrapper .pageContainer")),
							(this.checkTime = 0),
							(this.interval = 1e3),
							(this.prevBodyHeight = 0),
							(this.prevWindowHeight = 0),
							(this.updateFunction = this.update.bind(this));
					}
					prepare() {
						window.scrollTo(0, 0);
					}
					start() {
						window.scrollTo(0, 0),
							b.init(this.container),
							xt.start(),
							yt.createTimeLine(),
							y.width >= 960 && wt.createTimeLine(),
							$t.createTimeLine(),
							Lt.createTimeLine(),
							this.initFaq(),
							h.isMobile && this.initBubbles(),
							this.resize(),
							d.add(this.updateFunction);
					}
					resize() {
						yt.resize(),
							wt.resize(),
							$t.resize(),
							Lt.resize(),
							y.width >= 960
								? wt.createTimeLine()
								: wt.killTimeLine(),
							xt.resize();
					}
					resizePage(t) {
						(document.body.style.height = t + "px"),
							(g.scroll.max = t - window.innerHeight),
							(this.prevBodyHeight = t),
							(this.prevWindowHeight = window.innerHeight);
					}
					checkResize() {
						const t = this.container.getBoundingClientRect(),
							e = Math.floor(t.height);
						(e === this.prevBodyHeight &&
							window.innerHeight === this.prevWindowHeight) ||
							(this.resizePage(e), this.resize(), bt.resize());
					}
					update() {
						h.isDesktop &&
							performance.now() - this.checkTime >
								this.interval &&
							(this.checkResize(),
							(this.checkTime = performance.now())),
							b.update(),
							bt.update(),
							yt.update(),
							wt.update(),
							$t.update(),
							Lt.update(),
							xt.update(),
							yt.progress >= 0 && yt.progress < 1
								? this.checkSectionChange(1)
								: wt.progress > 0 && wt.progress < 1
								? this.checkSectionChange(2)
								: $t.progress > 0 && $t.progress < 1
								? this.checkSectionChange(3)
								: Lt.progress > 0 && Lt.progress < 1
								? this.checkSectionChange(4)
								: (g.currentSection = -1);
					}
					checkSectionChange(t) {
						t !== g.currentSection &&
							((g.currentSection = t),
							1 === g.currentSection &&
								xt.backfog.prepareSection1(),
							3 === g.currentSection &&
								xt.backfog.prepareSection3());
					}
					initFaq() {
						$$(".faq_item_header").forEach((t) => {
							t.addEventListener("click", () => {
								const e = t.nextElementSibling,
									i = t.children[1],
									s = e.dataset.state || "close",
									n = e.firstElementChild;
								if ("close" === s) {
									const t = n.getBoundingClientRect().height;
									(e.style.height = t + "px"),
										i.classList.add("is-open"),
										(e.dataset.state = "open");
								} else
									(e.style.height = "0px"),
										i.classList.remove("is-open"),
										(e.dataset.state = "close");
							});
						});
					}
					initBubbles() {
						const t = $(".bubbles_inner"),
							e = $(
								".bubbles_item-center"
							).getBoundingClientRect(),
							i = e.left + e.width / 2 - y.halfWidth;
						t.scrollLeft = i;
					}
				}
				document.addEventListener("DOMContentLoaded", () => {
					!(async function () {
						h.isDesktop
							? (document.body.dataset.device = "desktop")
							: (document.body.dataset.device = "mobile"),
							(h.isIE || h.isEdge) &&
								document.body.classList.add("is-poor-browser");
						const t = [
							"./assets/image/bg-kv-black.jpg",
							"./assets/image/fog.png",
							"./assets/image/bubble.png",
							"./assets/image/bathtub/shadow.png",
						];
						for (let e = 1; e <= 41; e++)
							t.push(
								`./assets/image/bathtub/${String(e).padStart(
									2,
									"0"
								)}.jpg`
							);
						const e = new l(t),
							i = new kt();
						i.prepare(),
							f.animateLoading(),
							e.load(() => {
								f.finishLoading(), i.start();
							});
					})();
				});
			},
			1496: () => {
				window.NodeList &&
					!NodeList.prototype.forEach &&
					(NodeList.prototype.forEach = function (t, e) {
						e = e || window;
						for (var i = 0; i < this.length; i++)
							t.call(e, this[i], i, this);
					}),
					(window.$ = function (t) {
						let e =
							arguments.length > 1 && void 0 !== arguments[1]
								? arguments[1]
								: null;
						const i = e || document;
						return i.querySelector(t);
					}),
					(window.$$ = function (t) {
						let e =
							arguments.length > 1 && void 0 !== arguments[1]
								? arguments[1]
								: null;
						const i = e || document;
						return i.querySelectorAll(t);
					});
			},
			1250: (t) => {
				t.exports =
					"precision highp float;\n\nuniform sampler2D texture;\nuniform float alpha;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 uv = vUv;\n\n  vec4 color = texture2D(texture, uv);\n  color.a *= alpha;\n  \n  gl_FragColor = color;\n}\n";
			},
			4097: (t) => {
				t.exports =
					"precision highp float;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float time;\nuniform float scale;\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute vec3 instancePosition;\nattribute float instanceSeed;\n\nvarying vec2 vUv;\n\nmat2 scale2D(vec2 scale) {\n  return mat2(scale.x, 0.0, 0.0, scale.y);\n}\n\nmat2 rotate2D(float rad) {\n  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\n}\n\nvoid main() {\n  vUv = uv;\n\n  vec3 pos = position;\n\n  // randomize size and rotation\n  pos.xy *= scale2D(vec2(1.0 + 0.5 * instanceSeed));\n  pos.xy *= scale2D(vec2(scale));\n  pos.xy *= rotate2D(instanceSeed * 10.0 + time * 0.1);\n\n  // position each instance\n  pos += instancePosition;\n\n  pos.x += 50.0 * cos(instanceSeed * 10.0 + time * 0.2);\n  pos.y += 50.0 * sin(instanceSeed * 10.0 + time * 0.2);\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}\n";
			},
			4657: (t) => {
				t.exports =
					"precision highp float;\n\nuniform sampler2D texture;\nuniform float alpha;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 uv = vUv;\n\n  vec4 color = texture2D(texture, uv);\n  color.a *= alpha;\n\n  gl_FragColor = color;\n}\n";
			},
			5688: (t) => {
				t.exports =
					"precision highp float;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
			},
			1255: (t) => {
				t.exports =
					"precision highp float;\n\nuniform sampler2D texture;\nuniform float alpha;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 uv = vUv;\n\n  vec4 color = texture2D(texture, uv);\n  color.a *= alpha;\n\n  gl_FragColor = color;\n}\n";
			},
			6316: (t) => {
				t.exports =
					"precision highp float;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float time;\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute vec3 instancePosition;\nattribute float instanceSeed;\n\nvarying vec2 vUv;\n\nmat2 rotate2D(float rad) {\n  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\n}\n\nvoid main() {\n  vUv = uv;\n\n  vec3 pos = position;\n\n  // randomize size and rotation\n  pos.xy *= rotate2D(instanceSeed * 10.0 + time * 0.1);\n\n  // position each instance\n  pos += instancePosition;\n\n  pos.x += 50.0 * cos(instanceSeed * 10.0 + time * 0.1);\n  pos.y += 50.0 * sin(instanceSeed * 10.0 + time * 0.1);\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}\n";
			},
			1597: (t) => {
				t.exports =
					"precision highp float;\n\nuniform sampler2D texture;\nuniform float alpha;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 uv = vUv;\n\n  vec4 color = texture2D(texture, uv);\n  color.a *= alpha;\n\n  gl_FragColor = color;\n}\n";
			},
			739: (t) => {
				t.exports =
					"precision highp float;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float time;\nuniform float zOffset;\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute vec3 instancePosition;\nattribute float instanceSeed;\n\nvarying vec2 vUv;\n\nmat2 scale2D(vec2 scale) {\n  return mat2(scale.x, 0.0, 0.0, scale.y);\n}\n\nmat2 rotate2D(float rad) {\n  return mat2(cos(rad), sin(rad), -sin(rad), cos(rad));\n}\n\nvoid main() {\n  vUv = uv;\n\n  vec3 pos = position;\n\n  // randomize size and rotation\n  pos.xy *= scale2D(vec2(1.0 + 0.5 * instanceSeed));\n  pos.xy *= rotate2D(instanceSeed * 10.0 + time * 0.1);\n\n  // position each instance\n  pos += instancePosition;\n\n  pos.x += 100.0 * cos(instanceSeed * 10.0 + time * 0.2);\n  pos.y += 100.0 * sin(instanceSeed * 10.0 + time * 0.2);\n  pos.z += 2500.0 * zOffset;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);\n}\n";
			},
			1240: (t) => {
				t.exports =
					"precision highp float;\n\nuniform sampler2D texture;\nuniform sampler2D maskTexture;\nuniform float time;\nuniform float alpha;\nuniform float mask;\n\nvarying vec2 vUv;\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : stegu\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//               https://github.com/stegu/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\nfloat snoise(vec2 v) {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n  vec2 i1;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nfloat snoise01(vec2 v) {\n  return (1.0 + snoise(v)) * 0.5;\n}\n\n\nvoid main() {\n  vec2 uv = vUv;\n\n  vec2 maskUv = vec2(clamp(uv.x + mask, 0.0, 1.0), uv.y);\n  vec4 maskColor = texture2D(maskTexture, maskUv);\n\n  float amp = sin(3.141592 * maskColor.r);\n  float waveNoise = snoise(vec2(uv.y * 2000.0, time * 0.1));\n\n  uv.x += 0.01 * amp * waveNoise;\n\n  vec4 color = texture2D(texture, uv);\n  color.a *= alpha * maskColor.r;\n\n  gl_FragColor = color;\n  // gl_FragColor = maskColor;\n}\n";
			},
			3178: (t) => {
				t.exports =
					"precision highp float;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
			},
			8594: (t) => {
				t.exports =
					"precision highp float;\n\nuniform float time;\nuniform float alpha;\nuniform float dx;\nuniform float dy;\nuniform float tx;\nuniform float ty;\n\nvarying vec2 vUv;\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : stegu\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//               https://github.com/stegu/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec3 permute(vec3 x) {\n  return mod289(((x*34.0)+1.0)*x);\n}\nfloat snoise(vec2 v) {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n  vec2 i1;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod289(i); // Avoid truncation effects in permutation\n  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nfloat snoise01(vec2 v) {\n  return (1.0 + snoise(v)) * 0.5;\n}\n\nvoid main() {\n  vec2 uv = vUv;\n\n  float n = snoise01(vec2(uv.x * dx + time * tx, uv.y * dy + time * ty));\n  float d = 2.0 * length(uv.y - 0.5);\n  d = 1.0 - pow(d, 3.0);\n  n *= d;\n\n  vec4 color = vec4(0.35, 0.67, 1.0, 0.4 * n * alpha);\n\n  gl_FragColor = color;\n  // gl_FragColor = vec4(vec3(d), 1.0);\n}\n";
			},
			8642: (t) => {
				t.exports =
					"precision highp float;\n\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";
			},
		},
		i = {};
	function s(t) {
		var n = i[t];
		if (void 0 !== n) return n.exports;
		var a = (i[t] = { exports: {} });
		return e[t].call(a.exports, a, a.exports, s), a.exports;
	}
	(s.m = e),
		(s.amdO = {}),
		(t = []),
		(s.O = (e, i, n, a) => {
			if (!i) {
				var o = 1 / 0;
				for (c = 0; c < t.length; c++) {
					for (var [i, n, a] = t[c], r = !0, h = 0; h < i.length; h++)
						(!1 & a || o >= a) &&
						Object.keys(s.O).every((t) => s.O[t](i[h]))
							? i.splice(h--, 1)
							: ((r = !1), a < o && (o = a));
					if (r) {
						t.splice(c--, 1);
						var l = n();
						void 0 !== l && (e = l);
					}
				}
				return e;
			}
			a = a || 0;
			for (var c = t.length; c > 0 && t[c - 1][2] > a; c--)
				t[c] = t[c - 1];
			t[c] = [i, n, a];
		}),
		(s.n = (t) => {
			var e = t && t.__esModule ? () => t.default : () => t;
			return s.d(e, { a: e }), e;
		}),
		(s.d = (t, e) => {
			for (var i in e)
				s.o(e, i) &&
					!s.o(t, i) &&
					Object.defineProperty(t, i, { enumerable: !0, get: e[i] });
		}),
		(s.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
		(() => {
			var t = { 179: 0 };
			s.O.j = (e) => 0 === t[e];
			var e = (e, i) => {
					var n,
						a,
						[o, r, h] = i,
						l = 0;
					if (o.some((e) => 0 !== t[e])) {
						for (n in r) s.o(r, n) && (s.m[n] = r[n]);
						if (h) var c = h(s);
					}
					for (e && e(i); l < o.length; l++)
						(a = o[l]), s.o(t, a) && t[a] && t[a][0](), (t[a] = 0);
					return s.O(c);
				},
				i = (globalThis.webpackChunkrinnai_microbubble =
					globalThis.webpackChunkrinnai_microbubble || []);
			i.forEach(e.bind(null, 0)), (i.push = e.bind(null, i.push.bind(i)));
		})();
	var n = s.O(void 0, [736], () => s(7334));
	n = s.O(n);
})();
