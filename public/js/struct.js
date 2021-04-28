function id(a) {
    return (document.getElementById(a));
};

function Component(a) {
    this.isComponent = true;
    this.view = true;
    if (a.type) {
        this.type = a.type;
        this.tab = document.createElement(a.type);
        if (this.type == "input") {
            if (a.placeholder) {
                this.tab.setAttribute("placeholder", a.placeholder);
                this.placeholder = a.placeholder;
            }
            if (a.style) {
                this.tab.setAttribute("type", a.style);
                this.style = a.style;
            }
        }
    } else {
        this.tab = document.createElement("div");
    }
    if (a.id) {
        if (a.id == "app") {
            document.body.insertBefore(this.tab, document.body.childNodes[0]);
        }
        this.tab.setAttribute("id", a.id);
        this.id = a.id;
    } else {
        this.id = "";
    }
    if (a.child) {
        this.child = a.child;
        if (Array.isArray(this.child)) {
            this.child.forEach(x => {
                this.tab.appendChild(x);
            })
        } else {
            this.tab.appendChild(a.child);
            this.tab.child = a.child;
        }
    } else {
        this.child = undefined;
    }
    if (a.value) {
        this.value = a.value;
        if (this.type == "img") {
            this.tab.setAttribute("src", this.value);
        } else {
            this.tab.innerHTML = this.value;
        }
    } else {
        this.value = "";
    }
    if (a.event) {
        this.event = a.event;
        if (this.event.type == "none") {
            this.event.func();
        } else {
            this.tab.addEventListener(a.event.type, (e) => { a.event.func(e) });
        }
    } else {
        this.event = undefined;
    }
    if (a.class) {
        this.class = a.class;
        this.tab.setAttribute("class", a.class);
    } else {
        this.class = "";
    }
    if (a.parent) {
        this.parent = a.parent;
        if (a.parent == "none") {
            document.body.appendChild(this.tab);
        } else {
            if (a.parent.isComponent) {
                a.parent.tab.appendChild(this.tab);
            } else {
                id(a.parent).appendChild(this.tab);
            }
        }
    } else if (id("app") && this.id != "app") {
        this.parent = "app";
        id("app").appendChild(this.tab);
    }
    if (a.setStyle) {
        this.tab.setAttribute("style", a.setStyle)
        this.setStyle = a.setStyle;
    } else {
        this.setStyle = ``;
    }

    this.change = (a, b) => {
        if (a == "value") {
            this.value = b;
        } else if (a == "id") {
            this.id = b;
        }
        this.tab.setAttribute("id", this.id);
        this.tab.innerHTML = this.value;
    }
    this.set = (a, b) => {
        this.tab.setAttribute(a, b);
    }
    this.shove = (a) => {
        if (!Array.isArray(this.child)) {
            var x = this.child;
            this.child = [];
            this.child.push(x);
            this.child.push(a);
        } else {
            this.child.push(a);
        }
        if (a.isComponent) {
            this.tab.appendChild(a.tab);
        } else {
            this.tab.appendChild(a);
        }
    }
    this.hide = () => {
        if (this.view) {
            this.tab.style.display = "none";
            this.view = false;
        }
    }
    this.show = () => {
        if (!this.view) {
            this.tab.style.display = "block";
            this.view = true;
        }
    }
};