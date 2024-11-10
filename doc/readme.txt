Autores
Deisy Pedraza
Mauro Mayorala
Mario G. Sánchez

Detección de Partes del Cuerpo
Este proyecto permite realizar la detección de partes del cuerpo como la cara, la mano, el ojo y la oreja utilizando un
modelo entrenado con Teachable Machine y TensorFlow.js. La aplicación usa la cámara web para capturar la imagen y
realizar la predicción en tiempo real. Los resultados se muestran junto con el porcentaje de certeza de la predicción.

Contenido del Proyecto
HTML: Contiene la estructura básica de la página, incluyendo la vista principal, el sidebar con las instrucciones, y la
sección para mostrar la webcam.
CSS: Estilos básicos para el diseño de la interfaz, que incluye un sidebar y una ventana principal de visualización.
JavaScript: Archivos que contienen la lógica para la interacción de la interfaz, manejo de eventos, integración con la
cámara web y la ejecución de la predicción utilizando el modelo de TensorFlow.js.
Requisitos
Navegador moderno: Se recomienda usar un navegador como Chrome, Firefox o Edge que soporte WebRTC para el acceso a la
cámara.
Conexión a Internet: Para cargar el modelo entrenado y las bibliotecas necesarias.

Estructura del Proyecto
/project-folder
│
├── index.html           # Página principal con la estructura HTML
├── css/
│   └── style.css        # Estilos CSS para la interfaz
├── js/
│   ├── main-controller.js # Lógica del controlador, gestiona los eventos y la captura
│   ├── main-view.js       # Lógica de la vista, gestiona la interfaz y los eventos del DOM
│   └── model.js           # Inicialización del modelo y función de predicción
├── img/
│   └── github-mark-white.png # Logo de GitHub para el footer
├── model/
│   ├── metadata.json # Metadatos del modelo, incluye etiquetas y estructura de clases
│   ├── model.json    # Configuración del modelo, define la arquitectura de la red neuronal
│   └── weights.bin   # Pesos del modelo, parámetros aprendidos durante el entrenamiento
└── doc/
    └──README.txt           # Documentación del proyecto

Tecnologías Utilizadas
HTML5: Estructura básica de la página web.
CSS3: Estilos de la interfaz.
JavaScript (ECMA-262): Lógica de la aplicación, incluyendo integración con TensorFlow.js.
TensorFlow.js: Biblioteca utilizada para realizar predicciones de partes del cuerpo.
Teachable Machine: Herramienta para crear el modelo de detección de partes del cuerpo.