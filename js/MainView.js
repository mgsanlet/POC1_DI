class MainView {
    #controller = null;
    #video = null;
    #captureButton = null;
    #progressSlider = null;
    #imageOverlay = null;
    #capturedImage = null;
    #predictionMessage = null;
    #isReadyForCaption;

    constructor(controller) {
        this.#controller = controller;
        this.#video = document.getElementById('webcam');
        this.#captureButton = document.getElementById('captureButton');
        this.#progressSlider = document.getElementById('progressSlider');
        this.#imageOverlay = document.getElementById('imageOverlay');
        this.#capturedImage = document.getElementById('capturedImage');
        this.#predictionMessage = document.getElementById('predictionMessage');
        this.#isReadyForCaption = true;
        this.initializeWebcam();
    }

    setWaitingMode(boolean){
        this.#isReadyForCaption = false;
        this.#captureButton.innerText = "Volver";
    }

    // Configura los eventos de la vista
    captureEvents() {
        this.#captureButton?.addEventListener('click', () => {
            if(this.#isReadyForCaption){
                this.#controller.startCapture();
            }else{
                this.restartView();
            }});
    }

    restartView() {
        this.hideCapturedImage();
        this.#captureButton.innerText = "Capturar imagen";
        this.updateSlider(0);
        this.#isReadyForCaption = true;
    }

    // Inicializa la webcam
    initializeWebcam() {
        const constraints = { video: true };
        const getUserMedia = navigator.mediaDevices?.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
        //Se asegura de conectar con la webcam según distintos navegadores

        if (!getUserMedia) {
            console.error("La API getUserMedia no es compatible con este navegador.");
            return;
        }

        getUserMedia.call(navigator.mediaDevices, constraints)
            .then(stream => {
            if (this.#video) {
                this.#video.srcObject = stream;
            }
        })
            .catch(error => {
            console.error("Error al acceder a la webcam:", error);
        });
    }


    // Actualiza el valor del slider
    updateSlider(progress) {
        this.#progressSlider?.setAttribute('value', progress);
    }

    displayCapturedImage(imageDataUrl) {

        this.#imageOverlay.style.display = 'flex'; // Hace visible el contenedor de la imagen
        this.#capturedImage.src = imageDataUrl;
    }

    hideCapturedImage() {

        this.#imageOverlay.style.display = 'none'; // Hace invisible el contenedor de la imagen
        this.#capturedImage.src = '';
        this.hidePrediction(); /*oculta prediction con imagen*/
    }

    /*Mostrar el mensaje de prediccion*/
    displayPrediction(message) {
        this.#predictionMessage.innerText = message;
        this.#predictionMessage.style.display = 'block';
    }

    /*Ocultar el mensaje*/
    hidePrediction() {
        this.#predictionMessage.style.display = 'none';
        this.#predictionMessage.innerText = '';
    }

}

export { MainView };