import { CharMap } from "./CharMap";


export class VirtualButtons {
    public settings = {
        buttons: [],
        startX: 150,
        startY: 150,
        numColumns: 2,
        buttonColumnYSpread: 10,
        buttonSize: 60,
        buttonMargin: 15,
        buttonColor: "white",
        lineThickness: 2,
        sleepOpacity: .5,
        sleepTimer: 500
    };
    public listener;
    public targetElement: HTMLElement
    public domElement: HTMLDivElement;
    public gridElement: HTMLDivElement;

    constructor(targetElement: HTMLElement, listener, config: {}) {
        this.listener = listener,
        this.settings = Object.assign({}, this.settings, config),
        this.targetElement = targetElement,
        this.buildKeys();
    }

    public buildKeys() {
        var o = 0;
        this.domElement = document.createElement("div"),
        this.domElement.style.position = "absolute",
        this.settings.sleepTimer && (this.domElement.style.opacity = String(this.settings.sleepOpacity)),
        this.gridElement = document.createElement("div"),
        this.gridElement.style.position = "absolute",
        this.gridElement.style.left = "0",
        this.gridElement.style.top = "0";
        var t = this.settings.buttonSize / 2 * .9
            , h = [[{
            offsetX: 0,
            offsetY: 0
        }], [{
            offsetX: t,
            offsetY: -t
        }, {
            offsetX: -t,
            offsetY: t
        }], [{
            offsetX: t + t / 2,
            offsetY: t - t
        }, {
            offsetX: t / 2 - t,
            offsetY: t + t
        }, {
            offsetX: -1.5 * t,
            offsetY: -.75 * t
        }], [{
            offsetX: 0,
            offsetY: 2 * -t
        }, {
            offsetX: 2 * -t,
            offsetY: 0
        }, {
            offsetX: 0,
            offsetY: 2 * t
        }, {
            offsetX: 2 * t,
            offsetY: 0
        }]];
        this.settings.buttons.forEach((e) => {
            e = e.toUpperCase();
            var t = this.settings.buttons.length - 1
                , s = document.createElement("div");
            s.style.position = "absolute";
            s.style.top = h[t][o].offsetY + "px";
            s.style.left = h[t][o].offsetX + "px";
            s.style.transform = "translate(-50%,-50%)";
            this.buildKey(s, o);
            var i = document.createElement("span");
            i.innerText = e,
            i.style.position = "absolute";
            i.style.top = this.settings.buttonSize / 2 + "px";
            i.style.left = this.settings.buttonSize / 2 + "px";
            i.style.transform = "translate(-50%,-50%)";
            i.style.fontSize = "16px"
            i.style.fontWeight = "700";
            i.style.color = "#002B50";
            i.style.fontFamily = "sans-serif";
            s.appendChild(i),
            1 < e.length && (i.style.fontSize = "8px"),
            s.style.userSelect = "none";
            var r = (event: UIEvent) => {
                var i = CharMap[e] || e.charCodeAt(0);
                this.listener("keydown", i),
                s.style.filter = "brightness(0.5)",
                event.preventDefault(),
                this.settings.sleepTimer && (this.domElement.style.transition = "",
                this.domElement.style.opacity = "1")
            }
                , n = (event: UIEvent) => {
                var i = CharMap[e] || e.charCodeAt(0);
                this.listener("keyup", i),
                s.style.filter = "unset",
                event.preventDefault(),
                this.settings.sleepTimer && (this.domElement.style.transition = "opacity " + (this.settings.sleepTimer / 1e3).toFixed(3) + "s ease-in .3s",
                this.domElement.style.opacity = String(this.settings.sleepOpacity))
            };
            s.addEventListener("mousedown", r),
            s.addEventListener("touchstart", r),
            s.addEventListener("mouseup", n),
            s.addEventListener("touchend", n),
            this.gridElement.appendChild(s),
            o++
        }),
        this.domElement.appendChild(this.gridElement),
        this.targetElement.appendChild(this.domElement);
    }
    private buildKey(t, i) {
        var e = document.createElementNS("http://www.w3.org/2000/svg", "svg")
          , s = ["#83FFE7", "#FFC2D6", "#EAC0FC", "#FAEB59"]
          , r = ["#15C8D1", "#FF7690", "#C977E8", "#FF9E00"];
        return e.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83.6 84.6"><circle cx="42.8" cy="43.5" r="38.9" fill="' + r[i % 4] + '"/><circle cx="40.5" cy="41" r="38.9" fill="' + s[i % 4] + '"/><path d="M21.3 20.5c-4.1.9-6.7 6.1-9 5.5-1.9-.7-2.4-2.8-1.1-4.6 2-2.3 5.5-7.1 8.2-7 6.4.2 6 5.2 1.9 6.1zm-8.1 11.2c.3 1.8-2.5 5.1-4.3 5.6-1.6.3-2.8-1.1-2.5-3 .5-2.6 1-4.6 2.5-4.9 1.5-.3 4 .5 4.3 2.3z" opacity=".6" fill="#fff"/></svg>',
        e.innerHTML = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 173 173" xml:space="preserve"><style>.st2{opacity:.6;fill:#fff;enable-background:new}</style><circle cx="85.5" cy="85.5" r="85.5" fill="' + s[i % 4] + '"/><circle cx="85.5" cy="85.5" r="84.5" fill="none" stroke="' + r[i % 4] + '" stroke-width="2"/><path class="st2" d="M43.2 40.2c-8.9 1.9-14.6 13.5-19.9 12.2-4.2-1.5-5.3-6.2-2.4-10.2 4.4-5.2 12.1-15.5 18-15.3 14.2.4 13.3 11.5 4.3 13.3zM25.4 65c.7 4-5.5 11.2-9.6 12.2-3.5.6-6.1-2.5-5.6-6.7 1-5.6 2.1-10.2 5.6-10.8 3.5-.5 9 1.3 9.6 5.3z"/></svg>',
        e.style.width = this.settings.buttonSize + "px",
        e.style.height = this.settings.buttonSize + "px",
        t.appendChild(e),
        e
    }
}