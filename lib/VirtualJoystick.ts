export class VirtualJoystick {

    public domElement: HTMLDivElement;
    public base: SVGSVGElement;
    public padMode: string;
    public pad: SVGSVGElement;
    public startX: number = 0;
    public startY: number = 0;
    public difX: number = 0;
    public difY: number = 0;
    public radius: number;
    public radiusSquared: number;
    public fixed: boolean;
    public sleepOpacity: number;
    public sleepTimer: number;
    public boundingRect: DOMRect;
    public minMovementMargin: number;
    public baseTranslate: string;
    public iD: number | undefined;
    public realForce: number;
    public keysDown: Record<number, boolean> = {};

    constructor(config: number[][], container: HTMLElement, fixed: boolean, padMode: string, sleepOpacity: number, sleepTimer: number) {
        this.domElement = document.createElement("div"),
        this.base = padMode ? this.buildDpad(this.domElement, config[0]) : this.buildJstick(this.domElement, config[0], !0),
        this.padMode = padMode,
        this.pad = this.buildJstick(this.domElement, config[1], !1),
        this.pad.style.pointerEvents = "none",
        padMode && (this.pad.style.opacity = "0"),
        container.appendChild(this.domElement),
        this.makeAbsolute(this.domElement, "50%"),
        this.makeAbsolute(this.base, "0%", !0),
        this.makeAbsolute(this.pad, "0%", !0),
        this.addListeners(fixed ? this.base : container),
        this.radius = config[0][0] - config[1][0],
        this.radiusSquared = this.radius * this.radius - config[1][0],
        this.fixed = fixed,
        this.sleepOpacity = sleepOpacity,
        this.sleepTimer = sleepTimer,
        this.sleepTimer && (this.domElement.style.opacity = String(this.sleepOpacity)),
        window['currentVirtualTouchIDs'] = [],
        window.addEventListener("resize", (event) => {
            this.boundingRect = this.base.getBoundingClientRect()
        }),
        this.minMovementMargin = padMode ? this.radius / 2 : this.radius / 5,
        this.baseTranslate = "translate(-50%, -50%)"

    }

    private buildDpad(div: HTMLDivElement, i: number[]) {
        var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return e.innerHTML = '<svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_d)"><mask id="a" maskUnits="userSpaceOnUse" x="4" y="0" width="131" height="131" fill="#000"><path fill="#fff" d="M4 0h131v131H4z"/><path fill-rule="evenodd" clip-rule="evenodd" d="M53 2a8 8 0 00-8 8v32H14a8 8 0 00-8 8v32a8 8 0 008 8h31v31a8 8 0 008 8h32a8 8 0 008-8V90h32a8 8 0 008-8V50a8 8 0 00-8-8H93V10a8 8 0 00-8-8H53z"/></mask><g filter="url(#filter1_iiii)"><path fill-rule="evenodd" clip-rule="evenodd" d="M53 2a8 8 0 00-8 8v32H14a8 8 0 00-8 8v32a8 8 0 008 8h31v31a8 8 0 008 8h32a8 8 0 008-8V90h32a8 8 0 008-8V50a8 8 0 00-8-8H93V10a8 8 0 00-8-8H53z" fill="#636668"/></g><path d="M45 42v2h2v-2h-2zM6 82h2-2zm39 8h2v-2h-2v2zm48 0v-2h-2v2h2zm0-48h-2v2h2v-2zM47 10a6 6 0 016-6V0c-5.523 0-10 4.477-10 10h4zm0 32V10h-4v32h4zm-33 2h31v-4H14v4zm-6 6a6 6 0 016-6v-4C8.477 40 4 44.477 4 50h4zm0 32V50H4v32h4zm6 6a6 6 0 01-6-6H4c0 5.523 4.477 10 10 10v-4zm31 0H14v4h31v-4zm2 33V90h-4v31h4zm6 6a6 6 0 01-6-6h-4c0 5.523 4.477 10 10 10v-4zm32 0H53v4h32v-4zm6-6a6 6 0 01-6 6v4c5.523 0 10-4.477 10-10h-4zm0-31v31h4V90h-4zm34-2H93v4h32v-4zm6-6a6 6 0 01-6 6v4c5.523 0 10-4.477 10-10h-4zm0-32v32h4V50h-4zm-6-6a6 6 0 016 6h4c0-5.523-4.477-10-10-10v4zm-32 0h32v-4H93v4zm-2-34v32h4V10h-4zm-6-6a6 6 0 016 6h4c0-5.523-4.477-10-10-10v4zM53 4h32V0H53v4z" fill="#272A2C" mask="url(#a)"/><g filter="url(#filter2_dii)"><path d="M67.268 16c.77-1.333 2.694-1.333 3.464 0l8.66 15c.77 1.333-.192 3-1.732 3H60.34c-1.54 0-2.502-1.667-1.732-3l8.66-15z" fill="#636668"/></g><g filter="url(#filter3_dii)"><path d="M70.732 115c-.77 1.333-2.694 1.333-3.464 0l-8.66-15c-.77-1.333.192-3 1.732-3h17.32c1.54 0 2.502 1.667 1.732 3l-8.66 15z" fill="#636668"/></g><g filter="url(#filter4_dii)"><path d="M120 64.268c1.333.77 1.333 2.694 0 3.464l-15 8.66c-1.333.77-3-.192-3-1.732V57.34c0-1.54 1.667-2.502 3-1.732l15 8.66z" fill="#636668"/></g><g filter="url(#filter5_dii)"><path d="M20 67.732c-1.333-.77-1.333-2.694 0-3.464l15-8.66c1.333-.77 3 .192 3 1.732v17.32c0 1.54-1.667 2.502-3 1.732l-15-8.66z" fill="#636668"/></g><g filter="url(#filter6_di)"><circle cx="69" cy="66" r="14" fill="#636668"/></g></g><defs><filter id="filter0_d" x="0" y="0" width="139" height="139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter><filter id="filter1_iiii" x="4" y="-4" width="132" height="139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0.494118 0 0 0 0 0.501961 0 0 0 0 0.501961 0 0 0 1 0"/><feBlend in2="shape" result="effect1_innerShadow"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="1" dy="-4"/><feGaussianBlur stdDeviation="6"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="effect1_innerShadow" result="effect2_innerShadow"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="2"/><feGaussianBlur stdDeviation=".5"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/><feBlend in2="effect2_innerShadow" result="effect3_innerShadow"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-2"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0.0708333 0 0 0 0 0.0708333 0 0 0 0 0.0708333 0 0 0 1 0"/><feBlend in2="effect3_innerShadow" result="effect4_innerShadow"/></filter><filter id="filter2_dii" x="56.337" y="13" width="25.326" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="1"/><feColorMatrix values="0 0 0 0 0.679167 0 0 0 0 0.679167 0 0 0 0 0.679167 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1.5"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/><feBlend in2="shape" result="effect2_innerShadow"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-2"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="effect2_innerShadow" result="effect3_innerShadow"/></filter><filter id="filter3_dii" x="56.337" y="95" width="25.326" height="23" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="1"/><feColorMatrix values="0 0 0 0 0.679167 0 0 0 0 0.679167 0 0 0 0 0.679167 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1.5"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/><feBlend in2="shape" result="effect2_innerShadow"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-2"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="effect2_innerShadow" result="effect3_innerShadow"/></filter><filter id="filter4_dii" x="100" y="53.337" width="23" height="25.326" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="1"/><feColorMatrix values="0 0 0 0 0.679167 0 0 0 0 0.679167 0 0 0 0 0.679167 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1.5"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/><feBlend in2="shape" result="effect2_innerShadow"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-2"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="effect2_innerShadow" result="effect3_innerShadow"/></filter><filter id="filter5_dii" x="17" y="53.337" width="23" height="25.326" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="1"/><feColorMatrix values="0 0 0 0 0.679167 0 0 0 0 0.679167 0 0 0 0 0.679167 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset/><feGaussianBlur stdDeviation="1.5"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/><feBlend in2="shape" result="effect2_innerShadow"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-2"/><feGaussianBlur stdDeviation="2"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="effect2_innerShadow" result="effect3_innerShadow"/></filter><filter id="filter6_di" x="53" y="50" width="32" height="34" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset/><feGaussianBlur stdDeviation="1"/><feColorMatrix values="0 0 0 0 0.629167 0 0 0 0 0.629167 0 0 0 0 0.629167 0 0 0 0.25 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="4"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/><feBlend in2="shape" result="effect2_innerShadow"/></filter></defs></svg>',
        e.style.width = 1.2 * (2 * i[0] + i[1]) + "px",
        e.style.height = 1.2 * (2 * i[0] + i[1]) + "px",
        e.style.pointerEvents = "all",
        e.setAttribute("id", "vjs_dpad"),
        div.appendChild(e),
        e
    }

    private buildJstick(t, i, e) {
        var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return s.innerHTML = e ? '<svg viewBox="-1 -1 266 266"  fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(#filter0_i)"><circle cx="133" cy="133" r="133" fill="#6D6E70"/><circle cx="133" cy="133" r="133" fill="url(#paint0_linear)"/></g><circle cx="133" cy="133" r="132" stroke="#3E3E3E" stroke-width="2"/><g filter="url(#filter1_i)"><path d="M62.375 62.255l69.371-28.297 70.208 28.297 30.089 68.248-30.089 70.745-70.208 30.795-68.536-29.131-29.252-72.409 28.417-68.248z" fill="#404041"/><path d="M62.375 62.255l69.371-28.297 70.208 28.297 30.089 68.248-30.089 70.745-70.208 30.795-68.536-29.131-29.252-72.409 28.417-68.248z" fill="url(#paint1_radial)"/></g><g filter="url(#filter2_i)"><path d="M8.49 133.707l14.856-10.415v20.831L8.489 133.707z" fill="#4B4949"/></g><g filter="url(#filter3_i)"><path d="M257.511 133.707l-14.857 10.416v-20.831l14.857 10.415z" fill="#4B4949"/></g><g filter="url(#filter4_i)"><path d="M132.293 11.32l10.415 14.856h-20.831l10.416-14.857z" fill="#525151"/></g><g filter="url(#filter5_i)"><path d="M132.293 254.681l-10.416-14.857h20.831l-10.415 14.857z" fill="#2F2E2E"/></g><defs><filter id="filter0_i" x="0" y="0" width="266" height="270" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="4"/><feGaussianBlur stdDeviation="8"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><filter id="filter1_i" x="33.958" y="33.958" width="198.085" height="198.085" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.25 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><filter id="filter2_i" x="8.489" y="123.292" width="14.856" height="20.831" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><filter id="filter3_i" x="242.654" y="123.292" width="14.856" height="20.831" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><filter id="filter4_i" x="121.877" y="11.319" width="20.831" height="14.856" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><filter id="filter5_i" x="121.877" y="239.824" width="20.831" height="14.856" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dy="-1"/><feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0"/><feBlend in2="shape" result="effect1_innerShadow"/></filter><radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(90 0 133) scale(99.0426)"><stop stop-color="#212127"/><stop offset="1" stop-color="#404041"/></radialGradient><linearGradient id="paint0_linear" x1="133" y1="0" x2="133" y2="266" gradientUnits="userSpaceOnUse"><stop stop-color="#6D6E70"/><stop offset="1" stop-color="#4C4C4D"/></linearGradient></defs></svg>' : '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><circle cx="96" cy="96" r="96" fill="#ff7690"/><path d="M55.6 40C45.4 42.2 38.9 56 33 54.4c-4.8-1.7-6.1-7.3-2.7-12 5-6.1 13.9-18.3 20.6-18.1 16 .4 14.9 13.4 4.7 15.7z" opacity=".6" fill="#fff"/></svg>',
        s.style.width = 2 * i[0] + i[1] + "px",
        s.style.height = 2 * i[0] + i[1] + "px",
        s.style.pointerEvents = "all",
        t.appendChild(s),
        s
    }

    private buildCircle(t, i) {
        var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        return e.innerHTML = this.drawCircle(i[0], i[1], i[2], i[1]),
        e.style.width = 2 * i[0] + i[1] + "px",
        e.style.height = 2 * i[0] + i[1] + "px",
        e.style.pointerEvents = "all",
        t.appendChild(e),
        e
    }

    private makeAbsolute(t, i, e = false) {
        t.style.position = "absolute",
        t.style.top = i,
        t.style.left = i,
        e && (t.style.transform = "translate(-50%, -50%)")
    }

    private drawCircle(t, i, e, s) {
        return "<circle cx=" + (t + s / 2) + " cy=" + (t + s / 2) + ' r="' + t + '" stroke="' + e + '" stroke-width="' + s + '" fill="' + i + '" />'
    }

    private addListeners(t) {
        t.addEventListener("touchstart", (event) => this.touchStart(event), {
            passive: !1
        }),
        t.addEventListener("touchend", (event) => this.touchEnd(event), {
            passive: !1
        }),
        t.addEventListener("touchmove", (event) => this.touchMove(event), {
            passive: !1
        })
    }

    private touchStart(event: TouchEvent) {
        if (void 0 === this.iD) {
            var touch: Touch | undefined;
            for (var e = 0; e < event.changedTouches.length; e++) {
                if (!window['currentVirtualTouchIDs'].includes(event.changedTouches[e].identifier)) {
                    touch = event.changedTouches[e],
                    this.iD = touch.identifier,
                    window['currentVirtualTouchIDs'].push(this.iD);
                    break
                }
            }
            touch !== undefined && (this.boundingRect || (this.boundingRect = this.base.getBoundingClientRect()),
            this.startX = touch.clientX,
            this.startY = touch.clientY,
            this.fixed ? (this.startX -= touch.clientX - (this.boundingRect.left + this.boundingRect.width / 2),
            this.startY -= touch.clientY - (this.boundingRect.top + this.boundingRect.height / 2)) : (this.domElement.style.top = this.startY + "px",
            this.domElement.style.left = this.startX + "px"),
            this.pad.style.transition = "",
            this.touchMove(event),
            this.domElement.style.transition = "",
            this.sleepTimer && (this.domElement.style.opacity = "1"),
            event.preventDefault())
        }
    }

    private touchEnd(event: TouchEvent) {
        for (var i = 0; i < event.changedTouches.length; i++)
            event.changedTouches[i].identifier === this.iD && (this.pad.style.top = "0px",
            this.pad.style.left = "0px",
            this.pad.style.transition = "all .1s ease-in",
            this.sleepTimer && (this.domElement.style.transition = "opacity " + (this.sleepTimer / 1e3).toFixed(3) + "s ease-in .3s",
            this.domElement.style.opacity = String(this.sleepOpacity)),
            window['currentVirtualTouchIDs'] = window['currentVirtualTouchIDs'].filter((t) => {
                return t !== this.iD
            }),
            this.iD = undefined);
        this.difX = 0,
        this.difY = 0,
        this.padMode && (this.base.style.transform = "" + this.baseTranslate),
        event.preventDefault()
    }

    private touchMove(event: TouchEvent) {
        if (void 0 !== this.iD) {
            var touch: Touch | undefined;
            for (var e = 0; e < event.changedTouches.length; e++)
                event.changedTouches[e].identifier === this.iD && ((touch = event.changedTouches[e]),
                this.difX = touch.clientX - this.startX,
                this.difY = touch.clientY - this.startY);
            var s = this.difX * this.difX + this.difY * this.difY;
            this.realForce = s / this.radiusSquared;
            var r = Math.atan2(this.difY, this.difX);
            if (s > this.radiusSquared && (this.difX = this.radius * Math.cos(r),
            this.difY = this.radius * Math.sin(r)),
            this.pad.style.top = this.difY + "px",
            this.pad.style.left = this.difX + "px",
            this.padMode) {
                var n = "perspective(300px)";
                this.left() ? this.base.style.transform = this.baseTranslate + " " + n + " rotateY(-10deg)" : this.right() ? this.base.style.transform = this.baseTranslate + " " + n + " rotateY(10deg)" : this.up() ? this.base.style.transform = this.baseTranslate + " " + n + " rotateX(10deg)" : this.down() ? this.base.style.transform = this.baseTranslate + " " + n + " rotateX(-10deg)" : this.base.style.transform = "" + this.baseTranslate
            }
            event.preventDefault()
        }
    }

    public left(): boolean {
        return this.difX < -this.minMovementMargin && this.cS(this.difX, this.difY);
    }

    public right(): boolean {
        return this.difX > this.minMovementMargin && this.cS(this.difX, this.difY);
    }

    public up(): boolean {
        return this.difY < -this.minMovementMargin && this.cS(this.difY, this.difX);
    }

    public down(): boolean {
        return this.difY > this.minMovementMargin && this.cS(this.difY, this.difX);
    }

    private angle(): number {
        return Math.atan2(this.difY, this.difX);
    }

    private normal(): {x, y} {
        return {
            x: this.difX / this.sQ() || 0,
            y: this.difY / this.sQ() || 0
        };
    }

    private force(): number {
        return Math.min(1, this.sQ() / this.radius);
    }

    private cS(t: number, i: number): boolean {
        return Math.abs(i) < 2 * Math.abs(t);
    }

    private sQ(): number {
        return Math.sqrt(this.difX * this.difX + this.difY * this.difY);
    }
}