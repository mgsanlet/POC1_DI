class Model{
    #URL = "http://localhost/POC1_DI/model/";
    #model = null;

    constructor(){
    }

    async init(){
        const modelURL = this.#URL + "model.json";
        const metadataURL = this.#URL + "metadata.json";

        // Cargar el modelo de Teachable Machine
        this.#model = await tmImage.load(modelURL, metadataURL);
        console.log("Modelo cargado exitosamente");
    }

    async predict(canvas, threshold) {
        if (!this.#model) {
            console.error("Modelo no cargado");
            return;
        }

        const predictions = await this.#model.predict(canvas);
        let classPrediction = "Desconocido";
        console.log("Predicción: ");
        predictions.forEach(prediction => {
            if (prediction.probability > threshold){
                // Se formatea el resultado de la predicción si es confiable (supera el umbral determinado)
                classPrediction = `${prediction.className}: ${(prediction.probability * 100).toFixed(0)}%`;
            }

        });

        console.log(classPrediction);
        return classPrediction;
    }

}
export { Model };