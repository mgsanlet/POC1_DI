import { MainView } from './mainView.js'

class MainController {
    #view = null;
    #video = null;

    constructor() {
        console.log('Starting app.');
        this.#view = new MainView(this);
        this.#video = document.getElementById('webcam');
        this.#view.captureEvents();
    }

     async startCapture() {

        const video = this.#video;
        let progress = 0;
        const updateProgress = () => {
            progress += 1;
            this.#view.updateSlider(progress);  // Actualiza el slider

            if (progress >= 100) {
                clearInterval(interval);
                this.captureImage(video);
                this.#view.updateSlider(0);
            }
        };

        const interval = setInterval(updateProgress, 30);  // Define la función fuera del setInterval para mayor claridad
    }

    captureImage(video) {
            // Crea un canvas para capturar el cuadro actual del video
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Obtén la URL de la imagen en formato base64
            const imageDataUrl = canvas.toDataURL('image/png');

            // Muestra la imagen capturada en la vista
            this.#view.displayCapturedImage(imageDataUrl);

            console.log("Imagen capturada y guardada!");
        }

}

window.onload = () => new MainController();
