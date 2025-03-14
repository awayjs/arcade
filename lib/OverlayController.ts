import { CharMap } from "./CharMap";
import { SkinController } from "./SkinController";
import { SVGController } from "./SVGController";
import { VirtualButtons } from "./VirtualButtons";
import { VirtualJoystick } from "./VirtualJoystick";

var isMobile = /Mobi|Android/i.test(navigator.userAgent);

export class OverlayController {

    public domElement: HTMLDivElement;
    public eventTargetElement: Element | Document | Window & typeof globalThis;
    public rAF;
    public virtualJoystick: VirtualJoystick;
    public secondVirtualJoystick: VirtualJoystick;
    public overlayButtons: VirtualButtons;

    private svgController: SVGController;
    private skinController: SkinController;

    public settings = {
        joystickEnabled: true,
        secondJoystickEnabled: false,
        padMode: undefined,
        secondPadMode: undefined,
        overlayButtonsEnabled: true,
        keyBindings: {
            left: undefined,
            right: undefined,
            up: undefined,
            down: undefined,
        },
        secondKeyBindings: {
            left: undefined,
            right: undefined,
            up: undefined,
            down: undefined,
        },
        buttons: [],
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
        skin: undefined,
    };

    constructor(
        public targetElement: HTMLElement,
        config
    ) {
        if (config) {
            !isMobile || this.init(config);
        } else {
            alert("Settings required");
        }
    }

    public init(config): void {
        this.settings = Object.assign(this.settings, config);

        const {
            eventTarget,
            joystickEnabled,
            secondJoystickEnabled,
            overlayButtonsEnabled,
            skin,
            joystickSize,
            buttonSize,
            colors,
            buttons, 
            lineThickness,
            padMode,
            secondPadMode,
            defaultOpacity,
            sleepOpacity,
            sleepTimer
        } = this.settings;

        //setup eventTarget reference
        this.eventTargetElement = "document" === eventTarget
            ? document
            : "window" === eventTarget
                ? window
                : "document.body" === eventTarget
                    ? document.body
                    : document.querySelector(eventTarget);

        this.eventTargetElement || console.error("[Touch Overlay Controller] Invald eventTarget: " + eventTarget);

        //setup dom reference
        this.domElement = document.createElement("div");
        this.domElement.setAttribute("id", "virtualJoystickHolder");

        Object.assign(this.domElement.style, {
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0",
            top: "0",
            pointerEvents: "none",
            zIndex: "9999",
            touchAction: "manipulation"
        });

        //setup listeners
        document.body.addEventListener("touchmove", (event: TouchEvent) => {
            event['_isScroller'] || event.preventDefault()
        }, { passive: false });

        window.addEventListener("resize", (event: Event) => {
            window.scrollTo(0, 0);
            document.body.style.width = document.documentElement.style.width = this.domElement.style.width = window.innerWidth + "px";
            document.body.style.height = document.documentElement.style.height = this.domElement.style.height = window.innerHeight + "px";
        });

        defaultOpacity && (this.domElement.style.opacity = String(defaultOpacity));

        this.targetElement.appendChild(this.domElement);

        //setup virtual controls
        if (joystickEnabled) {
            this.virtualJoystick = new VirtualJoystick(
                [[Math.round(joystickSize), lineThickness], [Math.round(.6 * joystickSize), lineThickness]],
                this.domElement,
                true,
                padMode,
                sleepOpacity,
                sleepTimer
            );
            
            Object.assign(this.virtualJoystick.domElement.style, {
                left: 2 * joystickSize + "px",
                top: "unset",
                bottom: 2 * joystickSize + "px"
            });
        }

        if (secondJoystickEnabled) {
            this.secondVirtualJoystick = new VirtualJoystick(
                [[Math.round(joystickSize), lineThickness], [Math.round(.6 * joystickSize), lineThickness]],
                this.domElement,
                true,
                secondPadMode,
                sleepOpacity,
                sleepTimer
            );
            
            Object.assign(this.secondVirtualJoystick.domElement.style, {
                left: "unset",
                right: 2 * joystickSize + "px",
                top: "unset",
                bottom: 2 * joystickSize + "px"
            });
        }

        if (overlayButtonsEnabled) {
            this.overlayButtons = new VirtualButtons(
                this.domElement,
                (type: string, keyCode: number) => {this.triggerKeyEvent(type, keyCode)},
                {
                    buttons: buttons,
                    buttonSize: buttonSize,
                    buttonColor: colors[2],
                    lineThickness: lineThickness,
                    sleepOpacity: sleepOpacity,
                    sleepTimer: sleepTimer
                }
            );

            Object.assign(this.overlayButtons.domElement.style, {
                right: 2 * buttonSize - buttonSize / 2 + "px",
                top: "unset",
                bottom: 2 * joystickSize + "px"
            });
        }

        //update ui and load skin (if available)
        this.update(),
        skin ? this.loadSkin("./" + skin) : this.svgController = new SVGController(this);
        this.settings.gameplayEnable ? this.createAnimations() : this.setUIVisibility(true);
        this.setCSS();
    }

    public update(): void {
        this.rAF = window.requestAnimationFrame(this.update.bind(this));

        if (this.settings.joystickEnabled)
            this.triggerJoystickEvents(this.virtualJoystick, this.settings.keyBindings);

        if (this.settings.secondJoystickEnabled)
            this.triggerJoystickEvents(this.secondVirtualJoystick, this.settings.secondKeyBindings);

        if (this.skinController)
            this.skinController.update();
    }

    public loadSkin(t): void {
        if (this.domElement) {
            this.skinController = new SkinController(this);
            this.skinController.load(t);
        }
    }
    
    public setCSS(): void {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href",
            "data:text/css;charset=UTF-8," +
            encodeURIComponent(
                "\n\t.vjs-show > .black{" +
                "\n\t\tanimation: arcadeFadeIn 0.25s linear 0s 1 normal ;" +
                "\n\t}" +
                "\n\t.vjs-show > .white{" +
                "\n\t\tanimation: arcadeFadeIn 0.416s linear 0.25s 1 reverse;" +
                "\n\t}" +
                "\n\t@keyframes arcadeFadeIn {" +
                "\n\t\t0% {opacity: 0;}" +
                "\n\t\t100% {opacity: 100%;}" +
                "\n\t}" +
                "\n\t*{" +
                "\n\t\t-webkit-user-select: none;" +
                "\n\t\t-webkit-touch-callout: none;" +
                "\n\t\tuser-select: none;" +
                "\n\t\t-webkit-tap-highlight-color: rgba(0,0,0,0);" +
                "\n\t}" +
                "\n\t\t"
            ));
        document.head.appendChild(link);
    }
    
    public createAnimations() {
        this.setUIVisibility(false);
        const gameplayStart = window['PokiSDK'].gameplayStart;
        window['PokiSDK'].gameplayStart = () => {
            this.setUIVisibility(true);
            gameplayStart();
        };

        const gameplayStop = window['PokiSDK'].gameplayStop;
        window['PokiSDK'].gameplayStop = () => {
            this.setUIVisibility(false);
            gameplayStop();
        };

        this.virtualJoystick.domElement.style.transition = "opacity 0.458s"
    }

    public setUIVisibility(visible: boolean): void {
        this.domElement.style.opacity = String(visible ? this.settings.defaultOpacity : this.settings.offOpacity);

        if (this.settings.joystickEnabled) {
            this.virtualJoystick.domElement.querySelector("svg").style.pointerEvents = visible ? "all" : "none";
            this.virtualJoystick.domElement.style.filter = visible ? "unset" : "grayscale(1.0)";
            if (visible) {
                this.virtualJoystick.domElement.classList.remove("vjs-show");
                this.virtualJoystick.domElement.offsetWidth;
                this.virtualJoystick.domElement.classList.add("vjs-show");
            }
        }
        if (this.settings.secondJoystickEnabled) {
            this.secondVirtualJoystick.domElement.querySelector("svg").style.pointerEvents = visible ? "all" : "none";
            this.secondVirtualJoystick.domElement.style.filter = visible ? "unset" : "grayscale(1.0)";
            if (visible) {
                this.secondVirtualJoystick.domElement.classList.remove("vjs-show");
                this.secondVirtualJoystick.domElement.offsetWidth;
                this.secondVirtualJoystick.domElement.classList.add("vjs-show");
            }
        }
        if (this.settings.overlayButtonsEnabled) {
            this.overlayButtons.domElement.style.pointerEvents = visible ? "all" : "none";
            this.overlayButtons.domElement.style.filter = visible ? "unset" : "grayscale(1.0)";
            if (visible) {
                this.overlayButtons.domElement.classList.remove("vjs-show");
                this.overlayButtons.domElement.offsetWidth;
                this.overlayButtons.domElement.classList.add("vjs-show");
            }
        }
    }

    private triggerJoystickEvents(joystick: VirtualJoystick, bindings: Record<string, string>): void {
        var keys = Object.keys(bindings);
        keys.forEach((key) => {
            if (key && !joystick[key]()) {
                var i = CharMap[bindings[key].toUpperCase()] || bindings[key].charCodeAt(0);
                if (joystick.keysDown[i]) {
                    joystick.keysDown[i] = false;
                    this.triggerKeyEvent("keyup", i);
                }
            }
        });
        keys.forEach((key) => {
            if (key && joystick[key]()) {
                var i: number = CharMap[bindings[key].toUpperCase()] || bindings[key].charCodeAt(0);
                if (!joystick.keysDown[i]) {
                    this.triggerKeyEvent("keydown", i);
                    joystick.keysDown[i] = true;
                }
            }
        });
    }
    
    private triggerKeyEvent(type: string, keyCode: number) {
        this.eventTargetElement.dispatchEvent(new KeyboardEvent(type, {keyCode: keyCode}));

        if ("keydown" === type && this.settings.vibration && window.navigator && window.navigator.vibrate)
            window.navigator.vibrate(this.settings.vibration);
    }
}


window['OverlayController'] = OverlayController;