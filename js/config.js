/* =====================================================================
   CONFIGURACIÓN EDITABLE DE INVITA-EXPRO
   Aquí se cambian los datos de contacto sin tocar el resto del código.
   ===================================================================== */
window.INVITA_CONFIG = {

    /* Número de WhatsApp con código de país y SIN "+", espacios ni guiones.
       Ejemplo para Bolivia: "59170000000"
       Si queda vacío, el botón abre WhatsApp para que la persona elija el contacto. */
    whatsappNumber: "59172272781",

    /* Correo oficial del proyecto. Ejemplo: "contacto@dominio.com"
       Si queda vacío, el pie de página muestra el espacio reservado. */
    email: "",

    /* Mensaje inicial general que se envía por WhatsApp. */
    whatsappMessage:
        "Hola, buenas tardes. Estoy interesado/a en solicitar una invitación digital " +
        "para mi fiesta de expromoción. Quisiera conocer los modelos disponibles y " +
        "recibir información sobre el servicio. ¿Podrían brindarme más detalles? Muchas gracias.",

    /* Enlace de la invitación de ejemplo en vivo (a donde lleva el código QR).
       Ejemplo: "https://tusitio.com/ejemplo". Si queda vacío, no se muestra el botón. */
    exampleUrl: "https://kashiraweb.github.io/beimar/",

    /* Imagen del código QR que lleva al ejemplo.
       Copia el archivo en assets/ejemplo/ con alguno de estos nombres. */
    exampleQrCandidates: [
        "assets/ejemplo/qr-ejemplo.png",
        "assets/ejemplo/qr-ejemplo.jpg",
        "assets/ejemplo/qr-ejemplo.jpeg",
        "assets/ejemplo/qr-ejemplo.webp",
        "assets/ejemplo/qr-ejemplo.svg"
    ]
};
