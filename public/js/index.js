const defaultURL = "https://teachablemachine.withgoogle.com/models/VW1Hfwhnp/";
var userURL = "";
let model, webcam, labelContainer, maxPredictions;
var token = "";
async function init() {
    id("all-class-names").innerHTML = "";
    var modelURL = "";
    var metadataURL = "";
    if (userURL.length > 0) {
        modelURL = userURL + "model.json";
        metadataURL = userURL + "metadata.json";
    } else {
        modelURL = defaultURL + "model.json";
        metadataURL = defaultURL + "metadata.json";
    }

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    model._metadata.labels.forEach(name => {
        var tab = create("div");
        tab.style.display = "flex";
        tab.style.justifyContent = "center";
        tab.style.alignItems = "center";
        tab.style.flexDirection = "column";
        tab.style.borderBottom = "1px solid black";
        tab.style.fontSize = "1em";
        tab.style.fontWeight = "300";

        var btnHider = create("div");
        btnHider.setAttribute("class", "dis-off");
        btnHider.style.width = "100%";

        var buttons = create("div");
        buttons.style.display = "grid";
        buttons.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
        buttons.style.gridGap = "1px";
        buttons.style.width = "100%";
        tab.onclick = () => {
            if (btnHider.classList == "dis-off") {
                btnHider.setAttribute("class", "dis-on");
            } else {
                btnHider.setAttribute("class", "dis-off");
            }
        }

        var labelText = create("div");
        labelText.innerHTML = "Select Your Output Port";

        var button1 = create("div");
        button1.innerHTML = "Port 1";
        var button2 = create("div");
        button2.innerHTML = "Port 2";
        var button3 = create("div");
        button3.innerHTML = "Port 3";
        var button4 = create("div");
        button4.innerHTML = "Port 4";

        button1.setAttribute("class", "button1");
        button2.setAttribute("class", "button1");
        button3.setAttribute("class", "button1");
        button4.setAttribute("class", "button1");

        button1.onclick = () => {
            id("label1").value = name;
        }
        button2.onclick = () => {
            id("label2").value = name;
        }
        button3.onclick = () => {
            id("label3").value = name;
        }
        button4.onclick = () => {
            id("label4").value = name;
        }
        var lab = create("div");
        lab.innerHTML = name;

        btnHider.appendChild(labelText);
        buttons.appendChild(button1);
        buttons.appendChild(button2);
        buttons.appendChild(button3);
        buttons.appendChild(button4);
        btnHider.appendChild(buttons);
        tab.appendChild(lab);
        tab.appendChild(btnHider);

        id("all-class-names").appendChild(tab);
    });
    const flip = true;
    if (!webcam) {
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);
        id("webcam-load").setAttribute("class", "dis-on");
        document.getElementById("webcam-container").appendChild(webcam.canvas);
        id("webcam-load").setAttribute("class", "dis-off");
        id("load-circle").setAttribute("class", "");
    }

}

async function loop() {
    webcam.update();
    var op = await predict();
    var max = 0;
    var ob = undefined;

    op.forEach(o => {
        if (o.probability > max && o.className != ob) {
            max = o.probability;
            ob = o.className;
        }

    })
    if (id("auth").value.length > 0 && token.length > 0 && id("auth").value == token) {
        db.ref(String(id("auth").value) + "/op").set(ob);
    }
    id("classifier-output-label").innerHTML = ob;

    if (id("all-class-names").childNodes.length > 0) {
        id("all-class-names").childNodes.forEach(a => {
            if (a.childNodes[0].innerHTML == ob) {
                a.style.backgroundColor = "rgb(62,62,62)";
                a.style.color = "white";
            } else {
                a.style.backgroundColor = "white";
                a.style.color = "black";
            }
        });
    }

    for (var i = 1; i <= 4; i++) {
        var tab = id("label" + i);
        var tab1 = id("t" + i);

        if (tab.value.toUpperCase() == ob.toUpperCase()) {
            tab.style.color = "yellow";
            tab1.innerHTML = "toggle_on";
            tab1.style.color = "yellow";
        } else {
            tab.style.color = "white";
            tab1.innerHTML = "toggle_off";
            tab1.style.color = "white";
        }
    }

    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    return prediction;
}

function set_label() {
    var auth = id("auth").value;
    if (auth.length == 10) {
        token = auth;
        db.ref().once("value").then(snap => {
            var j = JSON.stringify(snap.val());
            if (j.includes('"' + token + '"')) {
                db.ref(String(id("auth").value) + "/l1").set(id("label1").value);
                db.ref(String(id("auth").value) + "/l2").set(id("label2").value);
                db.ref(String(id("auth").value) + "/l3").set(id("label3").value);
                db.ref(String(id("auth").value) + "/l4").set(id("label4").value);
            } else {
                window.alert("Activate Your Blox First");
            }
        })
    }
}