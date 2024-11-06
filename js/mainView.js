class MainView {
    #controller = null;
    #video = null;
    #captureButton = null;
    #progressSlider = null;
    #imageOverlay = null;
    #capturedImage = null;

    constructor(controller) {
        this.#controller = controller;
        this.#video = document.getElementById('webcam');
        this.#captureButton = document.getElementById('captureButton');
        this.#progressSlider = document.getElementById('progressSlider');
        this.#imageOverlay = document.getElementById('imageOverlay');
        this.#capturedImage = document.getElementById('capturedImage');
        this.initializeWebcam();
    }

    // Configura los eventos de la vista
    captureEvents() {
        console.log("Loaded view.");
        this.#captureButton?.addEventListener('click', () => this.#controller.startCapture());
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
}

export { MainView };
