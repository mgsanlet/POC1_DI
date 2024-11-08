import { MainView } from './mainView.js';

class MainController {
    #view = null;
    #video = null;
    #model = null;
    #URL = "../model/";

    constructor() {
        this.init();
    }

    async init() {
        console.log('Starting app');
        this.#view = new MainView(this);
        this.#video = document.getElementById('webcam');
        this.#view.captureEvents();

        const modelURL = this.#URL + "model.json";
        const metadataURL = this.#URL + "metadata.json";

        // Cargar el modelo de Teachable Machine
        this.#model = await tmImage.load(modelURL, metadataURL);
        console.log("Modelo cargado exitosamente");
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
                this.#view.updateSlider(0);
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

        console.log("Imagen capturada y guardada");
        this.predict(canvas); // Llama a la función de predicción con el canvas
    }

    async predict(canvas) {
        if (!this.#model) {
            console.error("Modelo no cargado");
            return;
        }

        const predictions = await this.#model.predict(canvas);
        let classPrediction = null;
        const threshold = 0.7;
        predictions.forEach(prediction => {

            if (prediction.probability > threshold){
                // Se formatea y muestra el resultado de la predicción si es confiable (supera el umbral determinado)
                classPrediction = `${prediction.className}: ${(prediction.probability * 100).toFixed(0)}%`;
                console.log(classPrediction);
            }

        });

        if( classPrediction === null){
            console.log("Desconocido")
        }
    }
}

window.onload = () => new MainController();
