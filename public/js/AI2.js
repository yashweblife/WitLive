const webcamElement = document.getElementById('webcam');
const classifier = knnClassifier.create();
var classes = [];
async function app(a) {
    if (a) {
        return;
    }
    id("webcam-box").classList.add("loader");
    // Load the model.
    net = await mobilenet.load();

    // Create an object from Tensorflow.js data API which could capture image 
    // from the web camera as Tensor.
    var test = {
        facingMode: camMode
    }
    webcam = await tf.data.webcam(webcamElement, test);
    console.log(webcam);
    // Reads an image from the webcam and associates it with a specific class
    // index.
    if (webcam) {
        id("webcam-box").classList.remove("loader");
    }
    const addExample = async classId => {
        // Capture an image from the web camera.
        const img = await webcam.capture();
        var labelName = id("inp" + (classId + 1)).value;
        classes[classId] = labelName;
        // Get the intermediate activation of MobileNet 'conv_preds' and pass that
        // to the KNN classifier.
        const activation = net.infer(img, true);

        // Pass the intermediate activation to the classifier.
        classifier.addExample(activation, classId);
        if (token.length == 10) {
            db.ref(String(id("auth").value) + "/l" + (classId + 1)).set(id("inp" + (classId + 1)).value);

        }
        // Dispose the tensor to release the memory.
        img.dispose();
    };

    // When clicking a button, add an example for that class.
    document.getElementById('button-a').addEventListener('click', () => addExample(0));
    document.getElementById('button-b').addEventListener('click', () => addExample(1));
    document.getElementById('button-c').addEventListener('click', () => addExample(2));
    document.getElementById('button-d').addEventListener('click', () => addExample(3));

    while (true) {
        if (classifier.getNumClasses() > 0) {
            const img = await webcam.capture();

            // Get the activation from mobilenet from the webcam.
            const activation = net.infer(img, 'conv_preds');
            // Get the most likely class and confidence from the classifier module.
            const result = await classifier.predictClass(activation);
            document.getElementById('console').innerText = `
          prediction: ${classes[result.label]}`;
            var prob = String(result.confidences[result.label]).substr(0, 6);
            if (Number(prob) == 0) {
                id("prob-bar").style.width = "10%";
            }
            if (Number(prob) >= 0.5) {
                id("prob-bar").style.width = "50%";
            }
            if (Number(prob) >= 0.9) {
                id("prob-bar").style.width = "90%";
            }

            if (token.length > 0) {
                db.ref(token + "/op").set(classes[result.label]);
            }
            id("prob-bar").innerHTML = Number(prob) * 100 + "%";
            // Dispose the tensor to release the memory.
            img.dispose();
        }

        await tf.nextFrame();
    }
}
window.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
        console.log("XX");
        console.log(classifier);
    }
})
var token = "";

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