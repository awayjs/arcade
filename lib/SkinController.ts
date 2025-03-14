import { CharMap } from "./CharMap";
import { PadMode } from "./PadMode";
import { OverlayController } from "./OverlayController";
import { VirtualJoystick } from "./VirtualJoystick";

const padConfig = {
    [PadMode.DPAD]: {offset: 0, sprites: 8},
    [PadMode.VPAD]: {offset: 0, sprites: 2},
    [PadMode.HPAD]: {offset: Math.PI/4, sprites: 2}
}

function p(t, i) {
    if (Array.isArray(t))
        return t;
    if (Symbol.iterator in Object(t))
        return function(t, i) {
            var e = []
              , s = !0
              , r = !1
              , n = void 0;
            try {
                for (var a, o = t[Symbol.iterator](); !(s = (a = o.next()).done) && (e.push(a.value),
                !i || e.length !== i); s = !0)
                    ;
            } catch (t) {
                r = !0,
                n = t
            } finally {
                try {
                    !s && o.return && o.return()
                } finally {
                    if (r)
                        throw n
                }
            }
            return e
        }(t, i);
    throw new TypeError("Invalid attempt to destructure non-iterable instance")
}

function f(t: HTMLCollection): HTMLElement[] {
    if (Array.isArray(t)) {
        const e = new Array(t.length);
        for (let i = 0; i < t.length; i++)
            e[i] = t[i];
        return e
    }
    return <HTMLElement[]> Array.from(t)
}

export class SkinController {

    public joystick;
    public buttons: HTMLImageElement[] = [];
    public sprites = {};
    public active = false;
    public joystickElement: HTMLDivElement;
    public secondJoystickElement: HTMLDivElement;
    public buttonsElement: HTMLDivElement;
    public buttonsGridElement: HTMLDivElement;
    public joystickStick: HTMLImageElement;
    public joystickShadow: HTMLImageElement;
    public secondJoystickStick: HTMLImageElement;
    public secondJoystickShadow: HTMLImageElement;
    public pad: HTMLImageElement;
    public secondPad: HTMLImageElement;
    public buttonBlacks: HTMLImageElement[] = [];
    public buttonWhites: HTMLImageElement[] = [];
    public spriteScale = parseFloat((new URLSearchParams(window.location.search)).get("uiscale") || "1");

    constructor(
        public readonly controller: OverlayController
    ) {
        this.controller.domElement.style.visibility = "hidden";
    }

    public load(e): void {
        var r = this
            , t = [new Promise(function(t) {
            var i = new Image;
            i.src = e + ".png",
            i.onload = function() {
                t(i)
            }
        }
        ), new Promise(function(i) {
            fetch(e + ".json").then(function(t) {
                return t.json()
            }).then(function(t) {
                i(t)
            })
        }
        )];
        Promise.all(t).then(function(t) {
            var i = t[0]instanceof HTMLImageElement
                , e = i ? t[0] : t[1]
                , s = i ? t[1] : t[0];
            r.parseSprites(e, s).then(function() {
                r.placeSprites();
                var t = new CustomEvent("tOCParsed");
                t['skinner'] = r,
                document.dispatchEvent(t)
            })
        })
    }

    public parseSprites(l, f) {
        var u = this
        , c = document.createElement("canvas")
        , d: CanvasRenderingContext2D = c.getContext("2d");
        return new Promise(function(t) {
          var i = function(i, t) {
              d.clearRect(0, 0, c.width, c.height);
              var e = t.frame
                , s = e.x
                , r = e.y
                , n = e.w
                , a = e.h;
              if (c.width = n,
              c.height = a,
              d.drawImage(l, s, r, n, a, 0, 0, n, a),
              u.sprites[i] = u.rescaleImage(d.getImageData(0, 0, n, a), u.spriteScale),
              i.startsWith("_black_")) {
                  d.clearRect(0, 0, c.width, c.height),
                  d.drawImage(l, s, r, n, a, 0, 0, n, a),
                  ["white"].forEach(function(t) {
                      d.globalCompositeOperation = "source-in",
                      d.fillStyle = t,
                      d.rect(0, 0, c.width, c.height),
                      d.fill(),
                      u.sprites["" + i.replace("_black_", "_" + t + "_")] = u.rescaleImage(d.getImageData(0, 0, n, a), u.spriteScale)
                  })
              }
          }
            , e = !0
            , s = !1
            , r = void 0
            , a = Object.entries(f.frames)[Symbol.iterator]();
          try {
              for (var n; !(e = (n = a.next()).done); e = true) {
                  var o = n.value
                    , h = p(o, 2);
                  i(h[0], h[1])
              }
          } catch (t) {
              s = !0,
              r = t
          } finally {
              try {
                  !e && a.return && a.return()
              } finally {
                  if (s)
                      throw r
              }
          }
          t(void 0)
      }
      )
    }

    public rescaleImage(t, i) {
        var e = t.data
        , s = t.width
        , r = document.createElement("canvas")
        , n: CanvasRenderingContext2D = r.getContext("2d");
        r.width = t.width * i,
        r.height = t.height * i;
        for (var a = n.createImageData(t.width * i, t.height * i), o = a.data, h = 1 / i, l = 0, f = 0; f < a.height; f += 1)
            for (var u = (f * h | 0) * s, c = 0; c < a.width; c += 1) {
                var d = u + c * h << 2;
                o[l] = e[d],
                o[l + 1] = e[1 + d],
                o[l + 2] = e[2 + d],
                o[l + 3] = e[3 + d],
                l += 4
            }
        return n.putImageData(a, 0, 0),
        r.toDataURL()
    }

    public placeSprites() {
        if (this.controller) {
            const {
                joystickEnabled,
                secondJoystickEnabled,
                padMode,
                secondPadMode
            } = this.controller.settings;
            if (this.joystickElement = this.controller.virtualJoystick.domElement,padMode) {
                this.pad = this.joystickElement.appendChild(this.createImage(this.sprites[padMode + ".png"])),
                this.joystickElement.querySelector("#vjs_dpad").querySelector("svg").style.opacity = "0";
                var t = this.joystickElement.appendChild(this.createImage(this.sprites["_black_" + padMode + ".png"]));
                t.style.opacity = "0",
                t.classList.add("black"),
                t.style.marginTop = "-2px";
                var i = this.joystickElement.appendChild(this.createImage(this.sprites["_white_" + padMode + ".png"]));
                i.style.opacity = "0",
                i.classList.add("white"),
                i.style.marginTop = "-2px"
            } else {
                f(this.joystickElement.children).forEach(function(t) {
                    t.querySelector("svg").style.opacity = "0"
                });
                this.joystickElement.appendChild(this.createImage(this.sprites["stick_hole.png"]));
                this.joystickShadow = this.joystickElement.appendChild(this.createImage(this.sprites["stick_shadow.png"]));
                this.joystickElement.appendChild(this.createImage(this.sprites["stick_bottom.png"]));
                this.joystickStick = this.joystickElement.appendChild(this.createImage(this.sprites["stick.png"])),
                this.joystickStick.style.zIndex = "997";
                var e = this.joystickElement.appendChild(this.createImage(this.sprites["_black_stick.png"]));
                e.style.opacity = "0",
                e.classList.add("black"),
                e.style.zIndex = "998";
                var s = this.joystickElement.appendChild(this.createImage(this.sprites["_white_stick.png"]));
                s.style.opacity = "0",
                s.classList.add("white"),
                s.style.zIndex = "998"
            }
            if (secondJoystickEnabled)
                if (this.secondJoystickElement = this.controller.secondVirtualJoystick.domElement,secondPadMode) {
                    this.secondPad = this.secondJoystickElement.appendChild(this.createImage(this.sprites[secondPadMode + ".png"])),
                    this.secondJoystickElement.querySelector("#vjs_dpad").querySelector("svg").style.opacity = "0";
                    var n = this.secondJoystickElement.appendChild(this.createImage(this.sprites["_black_" + secondPadMode + ".png"]));
                    n.style.opacity = "0",
                    n.classList.add("black"),
                    n.style.marginTop = "-2px";
                    var a = this.secondJoystickElement.appendChild(this.createImage(this.sprites["_white_" + secondPadMode + ".png"]));
                    a.style.opacity = "0",
                    a.classList.add("white"),
                    a.style.marginTop = "-2px"
                } else {
                    f(this.secondJoystickElement.children).forEach(function(t) {
                        t.querySelector("svg").style.opacity = "0"
                    });
                    this.secondJoystickElement.appendChild(this.createImage(this.sprites["stick_hole.png"]));
                    this.secondJoystickShadow = this.secondJoystickElement.appendChild(this.createImage(this.sprites["stick_shadow.png"]));
                    this.secondJoystickElement.appendChild(this.createImage(this.sprites["stick_bottom.png"]));
                    this.secondJoystickStick = this.secondJoystickElement.appendChild(this.createImage(this.sprites["stick.png"])),
                    this.secondJoystickStick.style.zIndex = "997";
                    var o = this.secondJoystickElement.appendChild(this.createImage(this.sprites["_black_stick.png"]));
                    o.style.opacity = "0",
                    o.classList.add("black"),
                    o.style.zIndex = "998";
                    var h = this.secondJoystickElement.appendChild(this.createImage(this.sprites["_white_stick.png"]));
                    h.style.opacity = "0",
                    h.classList.add("white"),
                    h.style.zIndex = "998"
                }
            this.buttonsElement = this.controller.overlayButtons.domElement,
            this.buttonsGridElement = this.controller.overlayButtons.gridElement;
            var l = 1 === this.buttonsGridElement.children.length ? "big" : "small";
            f(this.buttonsGridElement.children).forEach((child) => {
                child.style.opacity = "0";

                const white = this.createImage(this.sprites["_white_" + l + ".png"]);
                this.buttonsElement.prepend(white);
                white.style.opacity = "0";
                white.classList.add("white");
                white.style.marginTop = "-2px";
                this.buttonWhites.push(white);

                const black = this.createImage(this.sprites["_black_" + l + ".png"]);
                this.buttonsElement.prepend(black);
                black.style.opacity = "0";
                black.classList.add("black");
                black.style.marginTop = "-2px";
                this.buttonBlacks.push(black);
                
                const sprite = this.createImage(this.sprites[l + ".png"]);
                sprite.style.transition = "opacity 0.458s";
                this.buttonsElement.prepend(sprite);
                this.buttons.push(sprite);
            }),
            this.controller.settings.gameplayEnable && this.controller.setUIVisibility(false);
            
            //init listeners
            window.addEventListener("resize", (event: UIEvent) => this.resize()),
            document.addEventListener("keydown", (event: KeyboardEvent) => this.handleKeyDown(event, true));
            document.addEventListener("keyup", (event: KeyboardEvent) => this.handleKeyDown(event, false));
            this.resize();

            this.controller.domElement.style.visibility = "visible";
            this.active = true;
        }
    }

    public handleKeyDown(event: KeyboardEvent, isDown: boolean): void {
        const buttons = this.controller.overlayButtons.settings.buttons;
        if (parseFloat(this.controller.domElement.style.opacity) > this.controller.settings.offOpacity)
            for (var s = 1 === this.buttonsGridElement.children.length ? "big" : "small", r = 0; r < buttons.length; r++) {
                var n = buttons[r].toUpperCase()
                  , a = CharMap[n] || n.charCodeAt(0);
                event.keyCode === a && (this.buttons[r].src = isDown ? this.sprites[s + "_down.png"] : this.sprites[s + ".png"])
            }
        else
            window.navigator && window.navigator.vibrate && window.navigator.vibrate(0)
    }

    public resize(): void {
        var r = this
            , n = 0
            , a = this.buttonsGridElement.getBoundingClientRect();
        f(this.buttonsGridElement.children).forEach(function(t) {
            var i = (<HTMLDivElement> t.firstChild).getBoundingClientRect()
                , e = -a.top + i.top + i.height / 2
                , s = -a.left + i.left + i.width / 2;
            r.buttons[n].style.left = s + "px",
            r.buttons[n].style.top = e + "px",
            r.buttonWhites[n].style.left = s + "px",
            r.buttonWhites[n].style.top = e + "px",
            r.buttonBlacks[n].style.left = s + "px",
            r.buttonBlacks[n].style.top = e + "px",
            n++
        })
    }

    public createImage(t) {
        var i = new Image;
        return i.src = t,
        i.style.position = "absolute",
        i.style.transform = "translate(-50%, -50%)",
        i.style.imageRendering = "pixelated",
        i
    }

    public updateJoystick(joystickStick: VirtualJoystick, pad: HTMLImageElement, padMode: PadMode | undefined, stick, shadow) {
        let difX = joystickStick.difX;
        let difY = joystickStick.difY;
        const radius = joystickStick.radius;
        const length = Math.sqrt(difY * difY + difX * difX);
        if (pad) {
            pad.src = this.sprites[padMode + ".png"];
            if (0.5 * radius < length) {
                const numSprites = padConfig[padMode].sprites;
                const h = Math.atan2(difY, difX) + Math.PI / 2 - padConfig[padMode].offset;
                const l = 2 * Math.PI / numSprites;
                let f = Math.round(h / l);
                f < 0 && (f = numSprites + f);
                f = Math.abs(f);
                pad.src = this.sprites[padMode + "_" + f + ".png"]
            }
        } else {
            if (radius < length) {
                var u = Math.atan2(difY, difX);
                difX = radius * Math.cos(u);
                difY = radius * Math.sin(u);
            }
            stick.style.left = difX + "px";
            stick.style.top = difY + "px";
            shadow.style.left = difX + "px";
            shadow.style.top = difY + 10 + "px";
        }
    }

    public update(): void {
        this.active && (this.updateJoystick(this.controller.virtualJoystick, this.pad, this.controller.settings.padMode, this.joystickStick, this.joystickShadow),
        this.controller.settings.secondJoystickEnabled && this.updateJoystick(this.controller.secondVirtualJoystick, this.secondPad, this.controller.settings.secondPadMode, this.secondJoystickStick, this.secondJoystickShadow))
    }
}