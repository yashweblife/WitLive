const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();
var webcam;
var faceMode = "user";
var classes = [];
var auth_token = "";
async function app() {
    net = await mobilenet.load();

    webcam = await tf.data.webcam(webcamElement, { facingMode: faceMode });
    console.clear();
    const addExample = async classId => {
        var label = id("label");
        if (label.value.length > 0) {
            if (auth_token.length == 10) {
                db.ref(auth_token + "/l" + String(classId + 1)).set(label.value);
            }
            const img = await webcam.capture();
            classes[classId] = label.value;
            const activation = net.infer(img, true);
            classifier.addExample(activation, classId);
            if (classId < 4) {
                id("toast").innerHTML = "For Better Accuracy, Train It Some More";
            } else {
                id("toast").innerHTML = "Try Training the other OP's again";
            }
            img.dispose();
        }
    };

    id('exp-button').addEventListener('click', () => addExample(Number(id("number").innerHTML) - 1));
    id("label").addEventListener("keyup", e => {
        if (e.key == "Enter") {
            if (id("label").value.length == 0) {
                id("toast").innerHTML = "Enter Someting First";
            } else {
                addExample(Number(id("number").innerHTML) - 1);
                id("toast").innerHTML = "Train Successful!";
            }
            id("toast-show").classList.add("toast-animate");
            setTimeout(() => {
                id("toast-show").classList.remove("toast-animate");
            }, 2000);
        }
    });
    while (true) {
        if (classifier.getNumClasses() > 0) {
            const img = await webcam.capture();

            const activation = net.infer(img, 'conv_preds');
            const result = await classifier.predictClass(activation);
            document.getElementById('label-box').innerHTML = `${classes[result.label]}`;
            var prob = String(result.confidences[result.label]).substr(0, 6);
            if (Number(prob) == 0) {
                id("prob-loader").style.width = "10%";
            }
            if (Number(prob) >= 0.5) {
                id("prob-loader").style.width = "50%";
            }
            if (Number(prob) >= 0.9) {
                id("prob-loader").style.width = "90%";
            }
            if (auth_token.length > 0) {
                db.ref(auth_token + "/op").set(classes[result.label]);
            }
            id("prob-loader").innerHTML = Number(prob) * 100 + "%";
            img.dispose();
        }
        await tf.nextFrame();
    }
}