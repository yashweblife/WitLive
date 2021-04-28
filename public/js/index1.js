var webcam;
var camMode = "user";
const FMODE = "user";
const EMODE = "environment";

function Camera(p) {
    var tab = new Component({
        class: "camera-box",
        parent: p
    })

    var bFace = new Component({
        parent: tab,
        class: "c-backface"
    })
    var fFace = new Component({
        parent: bFace,
        class: "frontface"
    })
    var title_box = new Component({
        parent: fFace,
        setStyle: "display:flex;justify-content:center;align-items:center;"
    })
    var title = new Component({
        value: 'Camera',
        parent: title_box
    })
    var info = new Component({
        class: "material-icons",
        value: "info",
        parent: title_box,
        event: {
            type: "click",
            func: () => {
                window.alert("This is your camera Feed, The AI will look at this to train and predict");
            }
        }
    })
    var webcam = new Component({
        value: '<video autoplay playsinline muted id="webcam" width="224" height="224"></video>',
        parent: fFace,
        class: "webcam",
        id: "webcam-box"
    })
    var reverse = new Component({
            class: "material-icons",
            value: "cached",
            setStyle: "color:white",
            parent: fFace,
            event: {
                type: "click",
                func: () => {
                    if (camMode == "user") {
                        camMode = "environment";
                    } else {
                        camMode = "user";
                    }
                    //app();
                }
            }
        })
        //reverse.hide();
    var con = new Component({
        id: "console",
        parent: fFace,
        value: "OUTPUT"
    })
    var bar = new Component({
        id: "prob-bar",
        parent: fFace,
        setStyle: `height:1em;width:1em;margin:1em 0;border-radius:1em;`
    })
}

function Auth(p) {
    var tab = new Component({
        class: "auth-box",
        parent: p
    })
    var bFace = new Component({
        parent: tab,
        class: "c-backface"
    })
    var fFace = new Component({
        parent: bFace,
        class: "frontface"
    })
    var title_box = new Component({
        parent: fFace,
        setStyle: "display:flex;justify-content:center;align-items:center;"
    })
    var title = new Component({
        value: "Have The AI Blox?",
        parent: title_box
    })
    var info = new Component({
        value: "info",
        class: "material-icons",
        parent: title_box,
        event: {
            type: "click",
            func: () => {
                window.alert("If You Have an AI BLOX and you want to control it, Enter the auth token provided with it here")
            }
        }
    })
    var auth_inputs = new Component({
        class: "i-button-input",
        parent: fFace
    })
    var auth_inp_box = new Component({
        type: "input",
        parent: auth_inputs,
        placeholder: "Enter Auth Token (Optional)",
        id: "auth"
    })
    var connect_button = new Component({
        value: "Connect",
        class: "c-button",
        parent: auth_inputs,
        event: {
            type: "click",
            func: () => {
                labelView();
                connected.show();
            }
        }
    })
    var connected = new Component({
        value: "Connected!!!!&#129311;",
        parent: fFace
    })
    connected.hide();
}

function ControlButton(p) {
    if (!p) {
        p = {}
    }
    var input_box1 = new Component({
        class: "i-button-input",
        parent: p.parent
    })
    var i1 = new Component({
        type: "input",
        id: p.inpId,
        placeholder: p.pHolder || "",
        parent: input_box1
    })
    var b1 = new Component({
        value: "Train",
        class: "c-button",
        id: p.btnId,
        parent: input_box1
    })
}

function Controls(p) {
    var tab = new Component({
        class: "auth-box",
        parent: p
    })
    var bFace = new Component({
        parent: tab,
        class: "c-backface"
    })
    var fFace = new Component({
        parent: bFace,
        class: "frontface"
    })
    var title_box = new Component({
        parent: fFace,
        setStyle: "display:flex;justify-content:center;align-items:center;"
    })
    var title = new Component({
        value: "Train The AI Here",
        parent: title_box
    })
    var info = new Component({
        value: "info",
        class: "material-icons",
        parent: title_box,
        event: {
            type: "click",
            func: () => {
                window.alert("To train the AI:\nSetp 1:Enter a label into the boxes below\nStep 2: Orient this device so that the object is in the cameras range and hit train\nStep 3:Train at least 2 labels to get results\n\n For best results, train multiple times and in a brightly lit area");
            }
        }
    })
    ControlButton({ parent: fFace, inpId: "inp1", pHolder: "Enter Label For Port 1", btnId: "button-a" });
    ControlButton({ parent: fFace, inpId: "inp2", pHolder: "Enter Label For Port 2", btnId: "button-b" });
    ControlButton({ parent: fFace, inpId: "inp3", pHolder: "Enter Label For Port 3", btnId: "button-c" });
    ControlButton({ parent: fFace, inpId: "inp4", pHolder: "Enter Label For Port 4", btnId: "button-d" });

}

function Make() {
    Header({ exclude: 1, title: "Control Your Blox With AI" });
    var index = new Component({
        class: "main"
    })
    Auth(index);
    Camera(index);
    Controls(index);
}
Make();