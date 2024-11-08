class MainView {
    #controller = null;
    #video = null;
    #captureButton = null;
    #progressSlider = null;
    #imageOverlay = null;
    #capturedImage = null;
    #isInitialState;

    constructor(controller) {
        this.#controller = controller;
        this.#video = document.getElementById('webcam');
        this.#captureButton = document.getElementById('captureButton');
        this.#progressSlider = document.getElementById('progressSlider');
        this.#imageOverlay = document.getElementById('imageOverlay');
        this.#capturedImage = document.getElementById('capturedImage');
        this.#isInitialState = true;
        this.initializeWebcam();
    }

    setInitialState(boolean){
        this.#isInitialState = boolean;
        if( !boolean ){
            this.#captureButton.innerText = "Volver";
        }
    }

    // Configura los eventos de la vista
    captureEvents() {
        this.#captureButton?.addEventListener('click', () => {
        if(this.#isInitialState){
            this.#controller.startCapture();
        }else{
            this.restartView();
        }});
    }

    restartView() {
        this.hideCapturedImage();
        this.#captureButton.innerText = "Capturar imagen";
        this.updateSlider(0);
        this.#isInitialState = true;
    }

    // Inicializa la webcam
    initializeWebcam() {
        navigator.mediaDevices.getUserMedia({ video: true })
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

        this.#imageOverlay.style.display = 'none'; // Hace visible el contenedor de la imagen
        this.#capturedImage.src = '';
    }

    setCaptureButtonText( text ) {
        this.#captureButton.innerText = "Volver";
    }
}

export { MainView };