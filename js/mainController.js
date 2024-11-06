import { MainView } from './mainView.js'

class MainController {
    #view = null;

    constructor() {
        console.log('Starting app.');
        this.#view = new MainView(this);
        this.#view.captureEvents();
    }

    startCapture() {
        let progress = 0;
        const updateProgress = () => {
            progress += 1;
            this.#view.updateSlider(progress);  // Actualiza el slider

            if (progress >= 100) {
                clearInterval(interval);
                this.captureImage();
            }
        };

        const interval = setInterval(updateProgress, 30);  // Define la función fuera del setInterval para mayor claridad
    }

    captureImage() {
        console.log("Imagen capturada!");  // Aquí se agregará la lógica de captura de imagen
    }
}

window.onload = () => new MainController();
