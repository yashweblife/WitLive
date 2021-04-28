const defaultURL = "https://teachablemachine.withgoogle.com/models/VW1Hfwhnp/";
var userURL = "";
let model, webcam, labelContainer, maxPredictions;
var token = "";

async function init(a) {
    if (a) {
        return;
    }
    id("webcam-box").classList.add("loader");

    id("label-view").innerHTML = "";
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
    model._metadata.labels.forEach(label => {
        var x = new Component({
            parent: "label-view",
            event: {
                type: "click",
                func: () => {
                    if (button_disp.view) {
                        button_disp.hide();
                    } else { button_disp.show() }
                }
            }
        })
        var title = new Component({
            value: label,
            parent: x

        })
        var button_disp = new Component({
            parent: x
        })
        var buttons = new Component({
            parent: button_disp,
            class: "button-box"
        })
        button_disp.hide();
        for (var i = 1; i <= 4; i++) {
            makeButton(buttons, i);
        }

        function makeButton(a, b) {
            var button = new Component({
                parent: a,
                value: "Port" + String(b),
                class: "button",
                event: {
                    type: "click",
                    func: () => {
                        id("label" + b).value = label;
                    }
                }
            })
        }
    });
    const flip = true;
    if (!webcam) {
        webcam = new tmImage.Webcam(200, 200, flip);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);
        document.getElementById("webcam-container").appendChild(webcam.canvas);
    }
    if (webcam.canvas) {
        id("webcam-box").classList.remove("loader");
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
    id("label-output").innerHTML = ob;
    for (var i = 1; i <= 4; i++) {
        if (id("label" + i).value == ob) {
            id("toggle" + i).innerHTML = "toggle_on";
            id("toggle" + i).style.color = "yellow";
            //console.log(id("label" + i).innerHTML);
        } else {
            id("toggle" + i).innerHTML = "toggle_off";
            id("toggle" + i).style.color = "white";

        }
    }
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    return prediction;
}