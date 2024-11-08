import { MainView } from './MainView.js';
import { Model } from './Model.js';

class MainController {
    #view = null;
    #video = null;
    #model = null;

    constructor() {
        this.init();
    }

    async init() {
        console.log('Iniciando aplicación');
        this.#view = new MainView(this);
        this.#video = document.getElementById('webcam');
        this.#view.captureEvents();
        this.#model = new Model();
    }

    async startCapture() {
        this.#view.hideCapturedImage();
        const video = this.#video;
        let progress = 0;

        const updateProgress = () => {
            progress += 1;
            this.#view.updateSlider(progress);

            if (progress >= 100) {
                clearInterval(interval);
                this.captureImage(video);
                this.#view.setWaitingMode();
            }
        };

        const interval = setInterval(updateProgress, 30);
    }

    captureImage(video) {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL('image/png');
        this.#view.displayCapturedImage(imageDataUrl);

        console.log("Imagen capturada");
        // Llama a la función de predicción con el canvas
        prediction = this.#model.predict(canvas, 0.85);
        this.#view.displayPrediction(prediction);

    }
}

window.onload = () => new MainController();