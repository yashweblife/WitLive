var firebaseConfig = {
    apiKey: "AIzaSyCW4Mr59FznlQ4MeuEFZ8uJJQ3qfitUPYY",
    authDomain: "nodeiot-fe34a.firebaseapp.com",
    databaseURL: "https://nodeiot-fe34a.firebaseio.com",
    projectId: "nodeiot-fe34a",
    storageBucket: "nodeiot-fe34a.appspot.com",
    messagingSenderId: "375353888759",
    appId: "1:375353888759:web:ef4b364b7b3354a41e68f2",
    measurementId: "G-67HPF8WZLX"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.database();
var mxgcq = "XXCCYX";

var app = new Component({
    id: "app"
})
var mxgcq = "XXCCYX";

function Header(a) {
    if (!a) {
        a = {}
    }
    var header = new Component({
        class: "c-header"
    })
    var bFace = new Component({
        class: "c-backface",
        parent: header
    })
    var fFace = new Component({
        class: "frontface",
        parent: bFace
    })
    var logo = new Component({
        type: "img",
        value: "img/logo2.svg",
        parent: fFace,
        event: {
            type: "click",
            func: () => {
                window.open("index.html", "_self");
            }
        }
    })
    var title = new Component({
        class: "title",
        parent: fFace,
        value: a.title || "Le Brain Is Here"
    })
    var navBar = new Component({
        class: "nav-bar",
        parent: fFace
    })
    if (a.exclude != 1) {
        var latest = new Component({
            value: "Train Your Own",
            parent: navBar,
            event: {
                type: "click",
                func: () => {
                    window.open("index1.html", '_self')
                }
            }
        })
    }
    if (a.exclude != 2) {
        var home = new Component({
            value: "home",
            parent: navBar,
            class: "material-icons",
            event: {
                type: "click",
                func: () => {
                    window.open("index.html", '_self')
                }
            }
        })
    }
    if (a.exclude != 3) {
        var tutorial = new Component({
            value: "school",
            parent: navBar,
            class: "material-icons",
            event: {
                type: "click",
                func: () => {
                    window.open("tutorial.html", '_self')
                }
            }
        })
    }
    if (a.exclude != 4) {
        var shop = new Component({
            value: "shopping_cart",
            parent: navBar,
            class: "material-icons",
            event: {
                type: "click",
                func: () => {
                    window.open("https://witblox.com/shop/#!/AI-Vision-Blox/p/260252140/category=31017019", '_self')
                }
            }
        })
    }
    return (header);
}



function Toast(p) {
    if (!p) {
        var p = {}
    }
    this.tab = new Component({
        parent: p.parent || "app",
        setStyle: "position:fixed;bottom:10vh;background-color:white;color:black;z-index:100;padding:1em;box-shadow:0 4px 8px 0 rgba(0,0,0,0.5);min-width:10vw;text-align:center"
    });
    this.message = new Component({
        parent: this.tab,
        value: "HELL"
    });
    this.tab.hide();
    this.show = (msg, time) => {
        var t = 1000;
        if (time) {
            t = time;
        }
        this.message.tab.innerHTML = msg;
        this.message.value = msg;
        this.tab.show();
        setTimeout(() => {
            this.tab.hide();
        }, t);
    }

}