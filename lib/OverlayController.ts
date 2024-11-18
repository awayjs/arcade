import { CharMap } from "./CharMap";
import { SkinController } from "./SkinController";
import { SVGController } from "./SVGController";
import { VirtualButtons } from "./VirtualButtons";
import { VirtualJoystick } from "./VirtualJoystick";

var isMobile = /Mobi|Android/i.test(navigator.userAgent);

export class OverlayController {

    public domElement: HTMLElement;
    public eventTargetElement;
    public rAF;
    public keysDown = {};
    public virtualJoystick: VirtualJoystick;
    public secondVirtualJoystick: VirtualJoystick;
    public overlayButtons: VirtualButtons;
    public tick: number = 0;

    private svgController: SVGController = new SVGController();
    private skinController: SkinController = new SkinController();

    public settings = {
        joyStickEnabled: true,
        secondJoystickEnabled: false,
        dpad: false,
        secondDpad: false,
        overlayButtonsEnabled: true,
        keyBindings: {
            left: void 0,
            right: void 0,
            up: void 0,
            down: void 0,
            buttons: []
        },
        buttonSize: 50,
        joystickSize: 50,
        colors: ["#FFFFFF", "#000", "#83FFE7", "#000"],
        lineThickness: 2,
        vibration: 25,
        eventTarget: "document",
        defaultOpacity: 1,
        sleepOpacity: .5,
        sleepTimer: 500,
        offOpacity: .2,
        gameplayEnable: true,
        skin: void 0,
    };

    constructor(
        public readonly targetElement: HTMLElement,
        settings
    ) {
        if (settings) {
            !isMobile || (this.settings = Object.assign({}, this.settings, settings), this.init());
        } else {
            alert("Settings required")
        }
    }

    public init(): void {
        var t = this
        , settings = this.settings
        , eventTarget = settings.eventTarget
        , joyStickEnabled = settings.joyStickEnabled
        , secondJoystickEnabled = settings.secondJoystickEnabled
        , overlayButtonsEnabled = settings.overlayButtonsEnabled
        , skin = settings.skin
        , joystickSize = settings.joystickSize
        , buttonSize = settings.buttonSize
        , colors = settings.colors
        , keyBindings = settings.keyBindings
        , lineThickness = settings.lineThickness
        , dpad = settings.dpad
        , dpad = settings.secondDpad
        , defaultOpacity = settings.defaultOpacity
        , sleepOpacity = settings.sleepOpacity
        , sleepTimer = settings.sleepTimer;
        this.eventTargetElement = "document" === eventTarget ? document : "window" === eventTarget ? window : "document.body" === eventTarget ? document.body : document.querySelector(eventTarget),
        this.eventTargetElement || console.error("[PokiSDK Touch Overlay Controller] Invald eventTarget: " + eventTarget),
        this.domElement = document.createElement("div"),
        this.domElement.setAttribute("id", "virtualJoystickHolder"),
        this.domElement.style.width = "100%",
        this.domElement.style.height = "100%",
        this.domElement.style.position = "absolute",
        this.domElement.style.left = "0",
        this.domElement.style.top = "0",
        this.domElement.style.pointerEvents = "none",
        this.domElement.style.zIndex = String(9999),
        this.domElement.style.touchAction = "manipulation",
        document.body.addEventListener("touchmove", function(event: TouchEvent) {
            event['_isScroller'] || event.preventDefault()
        }, {
            passive: false
        }),
        window.addEventListener("resize", function() {
            window.scrollTo(0, 0),
            document.body.style.width = document.documentElement.style.width = t.domElement.style.width = window.innerWidth + "px",
            document.body.style.height = document.documentElement.style.height = t.domElement.style.height = window.innerHeight + "px"
        }),
        defaultOpacity && (this.domElement.style.opacity = "p"),
        this.targetElement.appendChild(this.domElement),
        joyStickEnabled && (this.virtualJoystick = new VirtualJoystick([[Math.round(joystickSize), lineThickness], [Math.round(.6 * joystickSize), lineThickness]],this.domElement,!0,dpad,sleepOpacity,sleepTimer),
        this.virtualJoystick.domElement.style.left = 2 * joystickSize + "px",
        this.virtualJoystick.domElement.style.top = "unset",
        this.virtualJoystick.domElement.style.bottom = 2 * joystickSize + "px"),
        secondJoystickEnabled && (this.secondVirtualJoystick = new VirtualJoystick([[Math.round(joystickSize), lineThickness], [Math.round(.6 * joystickSize), lineThickness]],this.domElement,!0,dpad,sleepOpacity,sleepTimer),
        this.secondVirtualJoystick.domElement.style.left = "unset",
        this.secondVirtualJoystick.domElement.style.right = 2 * joystickSize + "px",
        this.secondVirtualJoystick.domElement.style.top = "unset",
        this.secondVirtualJoystick.domElement.style.bottom = 2 * joystickSize + "px"),
        overlayButtonsEnabled && (this.overlayButtons = new VirtualButtons(this.domElement,this.triggerKeyEvent,{
            buttons: keyBindings.buttons,
            buttonSize: buttonSize,
            buttonColor: colors[2],
            lineThickness: lineThickness,
            sleepOpacity: sleepOpacity,
            sleepTimer: sleepTimer
        }),
        this.overlayButtons.domElement.style.right = 2 * buttonSize - buttonSize / 2 + "px",
        this.overlayButtons.domElement.style.top = "unset",
        this.overlayButtons.domElement.style.bottom = 2 * joystickSize + "px"),
        this.update(),
        skin ? this.loadSkin("./" + skin) : this.svgController.init(this),
        this.settings.gameplayEnable ? this.createAnimations() : this.setUIVisibility(true),
        this.setCSS()
    }

    public update() {
        this.rAF = window.requestAnimationFrame(this.update.bind(this)),
        this.triggerDomEvents(),
        this.skinController.update()
    }

    public loadSkin(t) {
        if (this.domElement)
            return this.skinController.setTarget(this),
            this.skinController.load(t)
    }
    
    public setCSS() {
        var link = document.createElement("link");
        link.setAttribute("rel", "stylesheet"),
        link.setAttribute("type", "text/css"),
        link.setAttribute("href", "data:text/css;charset=UTF-8," + encodeURIComponent("\n\t\t\t.vjs-show > .black{\n\t\t\t\tanimation: arcadeFadeIn 0.25s linear 0s 1 normal ;\n\t\t\t}\n\t\t\t.vjs-show > .white{\n\t\t\t\tanimation: arcadeFadeIn 0.416s linear 0.25s 1 reverse;\n\t\t\t}\n\t\t\t@keyframes arcadeFadeIn {\n\t\t\t\t0%   {opacity: 0;}\n\t\t\t\t100%  {opacity: 100%;}\n\t\t\t  }\n\t\t\t*{\n\t\t\t\t-webkit-user-select: none;\n\t\t\t\t-webkit-touch-callout: none;\n\t\t\t\tuser-select: none;\n\t\t\t\t-webkit-tap-highlight-color: rgba(0,0,0,0);\n\t\t\t}\n\t\t")),
        document.head.appendChild(link)
    }
    
    public createAnimations() {
        this.setUIVisibility(!1);
        var gameplayStart = window['PokiSDK'].gameplayStart;
        window['PokiSDK'].gameplayStart = () => {
            this.setUIVisibility(!0),
            gameplayStart();
        };

        var gameplayStop = window['PokiSDK'].gameplayStop;
        window['PokiSDK'].gameplayStop = () => {
            this.setUIVisibility(!1),
            gameplayStop();
        };

        this.virtualJoystick.domElement.style.transition = "opacity 0.458s"
    }

    public setUIVisibility(visible: boolean): void {
        this.domElement.style.opacity = String(visible ? this.settings.defaultOpacity : this.settings.offOpacity),
        this.virtualJoystick.domElement.querySelector("svg").style.pointerEvents = visible ? "all" : "none",
        this.virtualJoystick.domElement.style.filter = visible ? "unset" : "grayscale(1.0)",
        this.settings.secondJoystickEnabled && (this.secondVirtualJoystick.domElement.querySelector("svg").style.pointerEvents = visible ? "all" : "none",
        this.secondVirtualJoystick.domElement.style.filter = visible ? "unset" : "grayscale(1.0)"),
        this.overlayButtons.domElement.style.pointerEvents = visible ? "all" : "none",
        this.overlayButtons.domElement.style.filter = visible ? "unset" : "grayscale(1.0)",
        visible && (this.virtualJoystick.domElement.classList.remove("vjs-show"),
        this.virtualJoystick.domElement.offsetWidth,
        this.virtualJoystick.domElement.classList.add("vjs-show"),
        this.settings.secondJoystickEnabled && (this.secondVirtualJoystick.domElement.classList.remove("vjs-show"),
        this.secondVirtualJoystick.domElement.offsetWidth,
        this.secondVirtualJoystick.domElement.classList.add("vjs-show")),
        this.overlayButtons.domElement.classList.remove("vjs-show"),
        this.overlayButtons.domElement.offsetWidth,
        this.overlayButtons.domElement.classList.add("vjs-show"))
    }

    private triggerDomEvents(): void {
        var keys = Object.keys(this.settings.keyBindings);
        keys.forEach((key) => {
            if (void 0 !== key && "buttons" !== key && this.virtualJoystick[key]()) {
                var i = CharMap[this.settings.keyBindings[key].toUpperCase()] || this.settings.keyBindings[key].charCodeAt(0);
                void 0 === this.keysDown[i] && this.triggerKeyEvent("keydown", i),
                this.keysDown[i] = this.tick
            }
        }),
        keys.forEach((key) => {
            if (void 0 !== key && "buttons" !== key) {
                var i = CharMap[this.settings.keyBindings[key].toUpperCase()] || this.settings.keyBindings[key].charCodeAt(0);
                void 0 !== this.keysDown[i] && this.keysDown[i] !== this.tick && (delete this.keysDown[i],
                this.triggerKeyEvent("keyup", i))
            }
        }),
        this.tick++
    }
    
    private triggerKeyEvent(t, i) {
        this.eventTargetElement.dispatchEvent(new KeyboardEvent(t,{
            keyCode: i
        })),
        "keydown" === t && this.settings.vibration && window.navigator && window.navigator.vibrate && window.navigator.vibrate(this.settings.vibration)
    }
}


window['OverlayController'] = OverlayController;