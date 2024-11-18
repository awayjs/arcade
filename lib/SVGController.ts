export class SVGController {
    public target;
    public poweredByPokiSVG;
    public singleButtonBGSVG;
    public dualButtonBGSVG1;
    public dualButtonBGSVG2;
    public grill;
    public blackFrame;

    constructor() {

    }

    public init(target): void {
        this.target = target,
        this.placeSprites(),
        window.addEventListener("resize", this.resize.bind(this)),
        this.resize()
    }

    private placeSprites(): void {
        var t = "#7E91AB";
        document.documentElement.style.backgroundColor = t,
        document.body.style.backgroundColor = t,
        this.blackFrame = this.target.domElement.parentNode.appendChild(document.createElement("div")),
        this.blackFrame.style.background = "black",
        this.blackFrame.style.position = "absolute",
        this.blackFrame.style.borderRadius = "2%",
        this.poweredByPokiSVG = this.buildSVG('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 134 27"><g opacity=".5"><path d="M98 11.9c0-4.1 3.5-7.5 7.5-7.5 4.1 0 7.5 3.4 7.5 7.5 0 4.3-3.4 7.7-7.5 7.7S98 16.2 98 11.9zm-10.1 2.4V9.7h2.6c.7 0 1.8.4 1.8 2.2 0 1.1-.5 2.4-1.7 2.4h-2.7zm31-14.3v9.1c1.5-.5 2.1-1.3 2.2-3V4.8h5.3v1.4c-.1 1.7-.6 4.1-2 5.8l3 6.5V8.7h6.5v10.5h-12l-2.3-4.9-.7.2v4.8h-4.6c-.1.2-.3.3-.4.5-2 2.2-4.8 3.4-8.2 3.4-3.5 0-6.4-1.2-8.4-3.4-.6-.7-1.1-1.5-1.6-2.4-1.3 1.4-3.1 2.1-5.3 2.1h-2.5V24H83V4.8h7.4c2.2 0 4 .6 5.3 1.9.4-.8.9-1.6 1.5-2.3 2-2.3 4.9-3.5 8.4-3.5 3.2 0 5.9 1.1 7.9 3.1V0h5.4zm11.8.8c1.8 0 3.3 1.5 3.3 3.3 0 1.9-1.5 3.4-3.3 3.4s-3.3-1.5-3.3-3.4c-.1-1.8 1.5-3.3 3.3-3.3z" fill-rule="evenodd" clip-rule="evenodd" fill="#4e617b"/><path d="M105.6 12.5c-3.3 0-5 .6-5.7.8.6 2.7 2.9 4.7 5.7 4.7s5.1-2 5.7-4.7c-.7-.3-2.4-.8-5.7-.8z" fill-rule="evenodd" clip-rule="evenodd" fill="#667993"/></g><path d="M.9 21h2v-3.3h2.4c2 0 3.1-1.4 3.1-3s-1.1-3-3.1-3H.9V21zm5.5-6.3c0 .8-.6 1.3-1.4 1.3H2.9v-2.5H5c.8-.1 1.4.4 1.4 1.2zm6.1 6.5c2.2 0 3.6-1.6 3.6-3.6 0-1.9-1.3-3.5-3.6-3.5-2.2 0-3.6 1.6-3.6 3.5.1 1.9 1.4 3.6 3.6 3.6zm0-1.6c-1.1 0-1.7-.9-1.7-2 0-1 .6-2 1.7-2s1.7.9 1.7 2c.1 1.1-.6 2-1.7 2zM23.4 21h1.9l2.1-6.8h-1.8l-1.3 4.6-1.5-4.6h-1.6l-1.5 4.6-1.3-4.6h-1.8l2.1 6.8h1.9l1.4-4.6 1.4 4.6zm4.4-3.4c0 2.2 1.6 3.6 3.6 3.6 1.1 0 2.1-.3 2.8-.9l-.8-1.1c-.4.4-1.2.7-1.8.7-1.1 0-1.8-.7-1.9-1.6h5v-.4c0-2.2-1.4-3.7-3.4-3.7-2.1-.1-3.5 1.5-3.5 3.4zm3.5-2.1c1.2 0 1.6.9 1.7 1.5h-3.3c0-.7.4-1.5 1.6-1.5zm4.6 5.5h1.8v-4.5c.3-.4 1.1-.8 1.7-.8.2 0 .4 0 .5.1v-1.7c-.8 0-1.7.5-2.2 1.1v-.9h-1.8V21zm4.6-3.4c0 2.2 1.6 3.6 3.6 3.6 1 0 2.1-.3 2.8-.9l-.8-1.1c-.4.4-1.2.7-1.8.7-1.1 0-1.8-.7-1.9-1.6h5v-.4c0-2.2-1.4-3.7-3.4-3.7-2-.1-3.5 1.5-3.5 3.4zm3.5-2.1c1.2 0 1.6.9 1.7 1.5h-3.3c.1-.7.5-1.5 1.6-1.5zm9.4 5.5h1.8v-9.3h-1.8v3.4c-.5-.7-1.3-1-2.1-1-1.7 0-3 1.3-3 3.6s1.3 3.5 3 3.5c.8 0 1.6-.4 2.1-1v.8zm0-2.2c-.3.4-.9.8-1.5.8-1 0-1.7-.8-1.7-2s.7-2 1.7-2c.6 0 1.2.3 1.5.8v2.4zm7.1 2.2h1.8v-.9c.5.7 1.3 1 2.1 1 1.7 0 3-1.3 3-3.5s-1.3-3.6-3-3.6c-.8 0-1.6.4-2.1 1v-3.4h-1.8V21zm1.8-2.2v-2.4c.3-.4 1-.8 1.5-.8 1 0 1.7.8 1.7 2s-.7 2-1.7 2c-.6 0-1.2-.3-1.5-.8zm6.4 3.2l-.3 1.6c.2.1.7.1.9.1 1.2 0 2.1-.4 2.6-1.6l3.2-7.9h-1.9l-1.8 4.7-1.8-4.7h-1.9l2.7 6.9-.3.6c-.2.4-.5.5-.9.5-.1 0-.3-.1-.5-.2z" fill="#667993"/></svg>'),
        this.poweredByPokiSVG.style.position = "absolute",
        this.poweredByPokiSVG.style.width = "12vw",
        this.poweredByPokiSVG.style.height = "3vw",
        this.singleButtonBGSVG = this.buildSVG('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 351 351"><g opacity=".5"><path d="M175.5 0C272.4 0 351 78.6 351 175.5S272.4 351 175.5 351 0 272.4 0 175.5 78.6 0 175.5 0z" fill="#bac9de"/><path d="M175.5 1h0C271.9 1 350 79.1 350 175.5h0c0 96.4-78.1 174.5-174.5 174.5h0C79.1 350 1 271.9 1 175.5h0C1 79.1 79.1 1 175.5 1z" fill="none" stroke="#002b50" stroke-width="2" stroke-opacity=".5"/></g></svg>'),
        this.singleButtonBGSVG.style.position = "absolute",
        this.singleButtonBGSVG.style.transform = "translate(-50%, -50%)",
        this.singleButtonBGSVG.style.width = 1.2 * this.target.overlayButtons.settings.buttonSize + "px",
        this.singleButtonBGSVG.style.height = 1.2 * this.target.overlayButtons.settings.buttonSize + "px";
        var i = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 199 198.9"><g opacity=".5"><path d="M14.4 107.1l89.4-89.3c20.4-22.3 55.1-23.9 77.4-3.5s23.9 55.1 3.5 77.4l-89.4 89.4c-20.4 22.3-55.1 23.9-77.4 3.5-22.4-20.5-23.9-55.2-3.5-77.5z" fill="#bac9de"/><path d="M15.1 107.8l89.4-89.3c20.1-21.9 54.1-23.5 76-3.4h0c21.9 20.1 23.5 54.1 3.4 76l-89.4 89.3c-20.1 21.9-54.1 23.5-76 3.4h0c-21.9-20.1-23.4-54.1-3.4-76z" fill="none" stroke="#002b50" stroke-width="2" stroke-opacity=".5"/></g></svg>';
        this.dualButtonBGSVG1 = this.buildSVG(i),
        this.dualButtonBGSVG1.style.position = "absolute",
        this.dualButtonBGSVG1.style.transform = "translate(-50%, -50%)",
        this.dualButtonBGSVG1.style.width = 2.1 * this.target.overlayButtons.settings.buttonSize + "px",
        this.dualButtonBGSVG1.style.height = 2.1 * this.target.overlayButtons.settings.buttonSize + "px",
        this.dualButtonBGSVG2 = this.buildSVG(i),
        this.dualButtonBGSVG2.style.position = "absolute",
        this.dualButtonBGSVG2.style.transform = "translate(-50%, -50%)",
        this.dualButtonBGSVG2.style.width = 2.1 * this.target.overlayButtons.settings.buttonSize + "px",
        this.dualButtonBGSVG2.style.height = 2.1 * this.target.overlayButtons.settings.buttonSize + "px",
        this.grill = this.buildSVG('<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 126 72" xml:space="preserve"><style>.st0{fill:#536783}</style><path class="st0" d="M4 0h117.6c2.2 0 4 1.8 4 4s-1.8 4-4 4H4C1.8 8 0 6.2 0 4s1.8-4 4-4zM4 16h117.6c2.2 0 4 1.8 4 4s-1.8 4-4 4H4c-2.2 0-4-1.8-4-4s1.8-4 4-4zM4 32h117.6c2.2 0 4 1.8 4 4s-1.8 4-4 4H4c-2.2 0-4-1.8-4-4s1.8-4 4-4zM4 48h117.6c2.2 0 4 1.8 4 4s-1.8 4-4 4H4c-2.2 0-4-1.8-4-4s1.8-4 4-4zM4 64h117.6c2.2 0 4 1.8 4 4s-1.8 4-4 4H4c-2.2 0-4-1.8-4-4s1.8-4 4-4z"/></svg>'),
        this.grill.style.position = "absolute",
        this.grill.style.transform = "translate(50%, -50%)",
        this.grill.style.width = "10vw",
        this.grill.style.height = "5vw"
    }

    private buildSVG(t): SVGSVGElement {
        var i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return i.innerHTML = t,
        this.target.domElement.parentNode.appendChild(i),
        i
    }

    private resize(): void {
        var t = window.innerWidth > window.innerHeight;
        if (this.target.virtualJoystick.boundingRect = null,
        t) {
            var i = window.innerHeight
                , e = window.innerHeight
                , s = .02 * e
                , r = .1 * e;
            this.blackFrame.style.width = e + r + "px",
            this.blackFrame.style.height = e - s + "px",
            this.blackFrame.style.top = s / 2 + "px",
            this.blackFrame.style.left = (window.innerWidth - window.innerHeight - r) / 2 + "px";
            var n = (window.innerWidth - i - r) / 2;
            this.target.virtualJoystick.domElement.style.left = n / 2 + "px",
            this.target.virtualJoystick.domElement.style.top = "unset",
            this.target.virtualJoystick.domElement.style.bottom = "80px",
            this.target.overlayButtons.domElement.style.left = "unset",
            this.target.overlayButtons.domElement.style.right = n / 2 + "px",
            this.target.overlayButtons.domElement.style.top = "unset",
            this.target.overlayButtons.domElement.style.bottom = "80px",
            this.target.overlayButtons.domElement.style.paddingLeft = "unset",
            this.poweredByPokiSVG.style.top = 10 + s + "px",
            this.poweredByPokiSVG.style.right = i + (window.innerWidth - e) / 2 + r / 2 + 10 + "px",
            this.poweredByPokiSVG.style.left = "unset",
            this.poweredByPokiSVG.style.width = "12vw",
            this.poweredByPokiSVG.style.height = "3vw",
            this.grill.style.top = n / 3 + "px",
            this.grill.style.right = n / 2 + "px";
            var a = this.target.overlayButtons.domElement.getBoundingClientRect()
                , o = this.target.overlayButtons.settings.buttonSize;
            1 === this.target.overlayButtons.settings.buttons.length ? (this.singleButtonBGSVG.style.left = a.x + "px",
            this.singleButtonBGSVG.style.top = a.y - 2 + "px",
            this.dualButtonBGSVG1.style.top = -1e3,
            this.dualButtonBGSVG2.style.top = -1e3) : 2 === this.target.overlayButtons.settings.buttons.length ? (this.singleButtonBGSVG.style.top = -1e3,
            this.dualButtonBGSVG1.style.left = a.x + "px",
            this.dualButtonBGSVG1.style.top = a.y - 2 + "px",
            this.dualButtonBGSVG2.style.top = -1e3) : 3 === this.target.overlayButtons.settings.buttons.length ? (this.singleButtonBGSVG.style.left = a.x - o / 2 - 7 + "px",
            this.singleButtonBGSVG.style.top = a.y - o / 2 + 5 + "px",
            this.dualButtonBGSVG1.style.left = a.x + o / 4 - 1 + "px",
            this.dualButtonBGSVG1.style.top = a.y + o / 4 + 6 + "px",
            this.dualButtonBGSVG2.style.top = -1e3) : 4 === this.target.overlayButtons.settings.buttons.length && (this.singleButtonBGSVG.style.top = -1e3,
            this.dualButtonBGSVG1.style.left = a.x + o / 2 - 2 + "px",
            this.dualButtonBGSVG1.style.top = a.y + o / 2 - 5 + "px",
            this.dualButtonBGSVG2.style.left = a.x - o / 2 + 2 + "px",
            this.dualButtonBGSVG2.style.top = a.y - o / 2 + 0 + "px")
        } else {
            var h = window.innerWidth
                , l = window.innerWidth
                , f = .02 * l
                , u = .1 * l;
            this.blackFrame.style.width = l - f + "px",
            this.blackFrame.style.height = l - f + "px",
            this.blackFrame.style.top = f / 2 + "px",
            this.blackFrame.style.left = f / 2 + "px";
            var c = (window.innerHeight - h - u) / 2;
            this.target.virtualJoystick.domElement.style.left = "25%",
            this.target.virtualJoystick.domElement.style.top = "unset",
            this.target.virtualJoystick.domElement.style.bottom = c + "px",
            this.target.overlayButtons.domElement.style.right = "19%",
            this.target.overlayButtons.domElement.style.left = "unset",
            this.target.overlayButtons.domElement.style.top = "unset",
            this.target.overlayButtons.domElement.style.bottom = c + "px",
            this.poweredByPokiSVG.style.top = l + 10 + "px",
            this.poweredByPokiSVG.style.right = "unset",
            this.poweredByPokiSVG.style.left = "10px",
            this.poweredByPokiSVG.style.width = "12vh",
            this.poweredByPokiSVG.style.height = "3vh",
            this.grill.style.top = "-1000px";
            var d = this.target.overlayButtons.domElement.getBoundingClientRect()
                , p = this.target.overlayButtons.settings.buttonSize;
            1 === this.target.overlayButtons.settings.buttons.length ? (this.singleButtonBGSVG.style.left = d.x + "px",
            this.singleButtonBGSVG.style.top = d.y - 2 + "px",
            this.dualButtonBGSVG1.style.top = -1e3,
            this.dualButtonBGSVG2.style.top = -1e3) : 2 === this.target.overlayButtons.settings.buttons.length ? (this.singleButtonBGSVG.style.top = -1e3,
            this.dualButtonBGSVG1.style.left = d.x + "px",
            this.dualButtonBGSVG1.style.top = d.y - 2 + "px",
            this.dualButtonBGSVG2.style.top = -1e3) : 3 === this.target.overlayButtons.settings.buttons.length ? (this.singleButtonBGSVG.style.left = d.x - p / 2 - 7 + "px",
            this.singleButtonBGSVG.style.top = d.y - p / 2 + 5 + "px",
            this.dualButtonBGSVG1.style.left = d.x + p / 4 - 1 + "px",
            this.dualButtonBGSVG1.style.top = d.y + p / 4 + 6 + "px",
            this.dualButtonBGSVG2.style.top = -1e3) : 4 === this.target.overlayButtons.settings.buttons.length && (this.singleButtonBGSVG.style.top = -1e3,
            this.dualButtonBGSVG1.style.left = d.x + p / 2 - 2 + "px",
            this.dualButtonBGSVG1.style.top = d.y + p / 2 - 5 + "px",
            this.dualButtonBGSVG2.style.left = d.x - p / 2 + 2 + "px",
            this.dualButtonBGSVG2.style.top = d.y - p / 2 + 0 + "px")
        }
    }
}