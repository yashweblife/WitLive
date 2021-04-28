function Auth(parent) {
    var tab = new Component({
        parent: parent
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
        parent: fFace
    })
    var title = new Component({
        parent: fFace,
        value: "Have An AI Block?"
    })
    var box = new Component({
        parent: fFace,
        class: "i-button-input"
    })
    var input = new Component({
        type: "input",
        parent: box,
        placeholder: "Enter Your Auth Token Here",
        id: "auth"
    })
    var button = new Component({
        value: "Connect",
        parent: box,
        class: "c-button",
        event: {
            type: "click",
            func: () => {
                if (input.tab.value == mxgcq) {
                    window.open("../index.html", "_self");
                    return;
                }

                if (id("auth").value.length == 0) {
                    window.alert("Enter Valid Auth Token First");
                    return;
                }
                if (id("auth").value == "enterSecretMode") {
                    window.open("index1.html", "_self");
                    return;
                }
                db.ref().once("value").then(snap => {
                    var j = JSON.stringify(snap.val());
                    if (j.includes('"' + id("auth").value + '"')) {
                        token = id("auth").value;
                        console.log(token);
                        connected.show();
                        label_io.show();
                    } else {
                        connected.hide();
                        label_io.hide();
                        token = "";
                        window.alert("Enter Valid Auth Token First");
                    }
                });

            }
        }
    });
    var connected = new Component({
        value: "Connected!!&#129311;",
        parent: box,
        id: "connection-status"
    })
    connected.hide();
    var label_io = new Component({
        class: "label-io",
        parent: fFace,
        setStyle: "margin-bottom:1em"
    })
    var title_1_box = new Component({
        parent: label_io,
        setStyle: "display:flex;justify-content:center;align-items:center;"
    })
    var title1 = new Component({
        value: "Configure Your Block Here",
        parent: title_1_box,
        setStyle: "text-align:center;"
    })
    var info1 = new Component({
        class: "material-icons",
        value: "info",
        parent: title_1_box,
        event: {
            type: "click",
            func: () => {
                alert("Working With Your Blox\nStep 1: Select a label from the 'See What I Can Detect' menu or type one in\nStep 2: Once you have selected the labels, press Set Label.")
            }
        }
    })
    var io1 = new Component({
        class: "i-button-input",
        parent: label_io
    })
    var input1 = new Component({
        type: "input",
        parent: io1,
        placeholder: "Enter Label For Port 1",
        id: "label1"
    })
    var toggle1 = new Component({
        class: "material-icons ",
        value: "toggle_off",
        setStyle: "transform:rotateZ(270deg)",
        parent: io1,
        id: "toggle1"
    })
    var io2 = new Component({
        class: "i-button-input",
        parent: label_io
    })
    var input2 = new Component({
        type: "input",
        parent: io2,
        placeholder: "Enter Label For Port 2",
        id: "label2"
    })
    var toggle2 = new Component({
        class: "material-icons",
        value: "toggle_off",
        setStyle: "transform:rotateZ(270deg)",
        parent: io2,
        id: "toggle2"
    })
    var io3 = new Component({
        class: "i-button-input",
        parent: label_io
    })
    var input3 = new Component({
        type: "input",
        parent: io3,
        placeholder: "Enter Label For Port 3",
        id: "label3"
    })
    var toggle3 = new Component({
        class: "material-icons",
        value: "toggle_off",
        setStyle: "transform:rotateZ(270deg)",
        parent: io3,
        id: "toggle3"
    })
    var io4 = new Component({
        class: "i-button-input",
        parent: label_io
    })
    var input4 = new Component({
        type: "input",
        parent: io4,
        placeholder: "Enter Label For Port 4",
        id: "label4"
    })
    var toggle4 = new Component({
        class: "material-icons",
        value: "toggle_off",
        setStyle: "transform:rotateZ(270deg)",
        parent: io4,
        id: "toggle4"
    })
    var set_label = new Component({
        value: "Set Label!",
        class: "c-button",
        parent: label_io,
        setStyle: "border-radius:1em;text-align:center;",
        event: {
            type: "click",
            func: () => {
                setLabel();
            }
        }
    })
    label_io.hide();
}

function Camera(parent, a) {
    var tab = new Component({
        parent: parent
    })
    var bFace = new Component({
        parent: tab,
        class: "c-backface"
    })
    var fFace = new Component({
        parent: bFace,
        class: "frontface"
    })
    var title = new Component({
        parent: fFace,
        value: "Camera"
    });

    var webcam_box = new Component({
        class: "webcam-box",
        parent: fFace
    })
    var webcam_con = new Component({
        class: "webcam-container",
        id: "webcam-container",
        parent: webcam_box,
        event: {
            type: "click",
            func: () => {
                if (webcam_box.tab.classList.contains("loader")) {
                    webcam_box.tab.classList.remove("loader");
                } else {
                    webcam_box.tab.classList.add("loader");
                }
            }
        }
    });
    if (a == "video") {
        var video = new Component({
            value: '<video autoplay playsinline muted id="webcam"></video>',
            parent: webcam_con
        })
    }
    var label_output = new Component({
        value: "DETECTION",
        parent: fFace,
        id: "label-output"
    });

    var label_shower = new Component({
        parent: fFace,
        class: "label-shower"

    })
    var label_title = new Component({
        value: "See What I Can Detect",
        parent: label_shower,
        class: "title",
        event: {
            type: "click",
            func: () => {
                if (label_view.view) {
                    label_view.hide()
                } else {
                    label_view.show();
                }
            }
        }
    })
    var label_view = new Component({
        id: "label-view",
        parent: label_shower
    })
    var label_base = new Component({
        class: "label-base",
        parent: label_shower
    })
    label_view.hide();
}

function Camera1(parent) {
    var cam_box = new Component({
        parent: parent
    })
    var bFace = new Component({
        class: 'c-backface',
        parent: cam_box
    })
    var fFace = new Component({
        class: "frontface",
        parent: bFace
    })
    var title_box = new Component({
        parent: fFace,
        setStyle: "display:grid;grid-template-columns:1fr 1fr;width:100%;padding:1em 0;border-bottom:1px solid white"
    })
    var op1 = new Component({
        value: "Camera",
        parent: title_box,
        setStyle: "display:flex;justify-content:center;align-items:center;",
        event: {
            type: "click",
            func: () => {
                webcam.show();
                label_con.show();
                label_output.show();
                url_box.hide();

            }
        }
    })
    var op2 = new Component({
        value: "URL",
        parent: title_box,
        setStyle: "display:flex;justify-content:center;align-items:center;border-left:1px solid white",
        event: {
            type: "click",
            func: () => {
                url_box.show();
                webcam.hide();
                label_con.hide();
                label_output.hide();
            }
        }
    })
    var webcam = new Component({
        //setStyle: "display:flex;justify-content:center;align-items:center;width:20em;height:20em;background-color:white;margin:0.5em 0;border-radius:50%;border:0.5em solid black",
        class: "webcam-box",
        id: "webcam-box",
        parent: fFace
    })
    var webcam_container = new Component({
        id: "webcam-container",
        class: "webcam-container",
        parent: webcam,
        //setStyle: "width:100%;height:100%;border-radius:50%;overflow:hidden"
    })
    var url_box = new Component({
        parent: fFace,
        setStyle: "display:flex;justify-content:center;align-items:center;width:100%;min-height:50vh",
    });
    var url_input = new Component({
        parent: url_box,
        class: "i-button-input"
    })
    var url = new Component({
        parent: url_input,
        type: "input",
        placeholder: "Enter URL here"
    });
    var url_button = new Component({
        parent: url_input,
        class: "c-button",
        value: "Set",
        event: {
            type: "click",
            func: () => {
                webcam.show();
                url_box.hide();
            }
        }
    })
    var label_box = new Component({
        parent: fFace
    })
    var label_output = new Component({
        id: "label-output",
        parent: label_box,
        value: "HELLO"
    })
    var label_con = new Component({
        parent: fFace,
        setStyle: "width:90%"
    })
    var label_shower = new Component({
        parent: label_con,
        class: "label-shower"

    })
    var label_title = new Component({
        value: "See What I Can Detect",
        parent: label_shower,
        class: "title",
        event: {
            type: "click",
            func: () => {
                if (label_view.view) {
                    label_view.hide()
                } else {
                    label_view.show();
                }
            }
        }
    })
    var label_view = new Component({
        id: "label-view",
        parent: label_shower
    })
    var label_base = new Component({
        class: "label-base",
        parent: label_shower
    })
    url_box.hide();

}

function Index() {
    var disp = new Component({
        class: "i-index-display"
    })
    var index = new Component({
        class: "i-index-box",
        parent: disp
    })
    Camera1(index);
    Auth(index);
}

function Make() {
    Header({ title: "Control Your Blox Here", exclude: 2 });
    Index();

}
Make();

function labelView() {
    if (id("auth").value.length == 0) {
        window.alert("Enter Valid Auth Token First");
        return;
    }
    if (id("auth").value == "enterSecretMode") {
        window.open("index1.html", "_self");
        return;
    }
    db.ref().once("value").then(snap => {
        var j = JSON.stringify(snap.val());
        if (j.includes('"' + id("auth").value + '"')) {
            token = id("auth").value;
            console.log(token);
            return (true);
        } else {
            window.alert("Enter Valid Auth Token First");
            return (false);
        }
    });
}

function setLabel() {
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
        var str = `l1:${id("label1").value}\nl2:${id("label2").value}\nl3:${id("label3").value}\nl4:${id("label4").value}`;
        window.alert(str);
    }
}