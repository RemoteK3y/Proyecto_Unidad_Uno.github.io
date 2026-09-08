// seed-data.js
// Datos iniciales para la versión ESTÁTICA (GitHub Pages) del repositorio.
// Aquí no hay backend: todo se guarda en localStorage del navegador de
// cada visitante, así que esta variable solo se usa la primera vez que
// alguien abre la página (o después de "Restablecer").

const CIFRADO_CESAR_JS = `// Requerimos el módulo nativo 'readline' de Node.js para leer datos ingresados por el usuario en la terminal
const readline = require('readline');

// Creamos la interfaz de lectura/escritura asociada a la entrada y salida estándar de la consola
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Definición de los alfabetos extendidos en español (27 caracteres, incluyendo la Ñ)
const alfabetoMay = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
const alfabetoMin = "abcdefghijklmnñopqrstuvwxyz";

/**
 * Función para cifrar un texto usando el Cifrado César
 * @param {string} texto - El texto original a cifrar
 * @param {number} desplazamiento - El número de posiciones a desplazar (clave)
 * @returns {string} - El texto cifrado resultante
 */
function cifrarTexto(texto, desplazamiento) {
    let salida = "";

    // Normalizamos el desplazamiento en Módulo 27 para manejar valores negativos o mayores a 27
    desplazamiento = ((desplazamiento % 27) + 27) % 27;

    // Recorremos cada carácter del texto de entrada
    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        let encontrada = false;

        // 1. Verificamos si el carácter es una letra mayúscula
        let posMay = alfabetoMay.indexOf(caracter);
        if (posMay !== -1) {
            salida += alfabetoMay[(posMay + desplazamiento) % 27];
            encontrada = true;
        }

        // 2. Si no fue mayúscula, verificamos si es una letra minúscula
        if (!encontrada) {
            let posMin = alfabetoMin.indexOf(caracter);
            if (posMin !== -1) {
                salida += alfabetoMin[(posMin + desplazamiento) % 27];
                encontrada = true;
            }
        }

        // 3. Si no es letra (espacios, números, signos), se conserva intacto
        if (!encontrada) {
            salida += caracter;
        }
    }
    return salida;
}

/**
 * Función para descifrar un texto previamente cifrado con Cifrado César
 * @param {string} texto - El texto cifrado
 * @param {number} desplazamiento - La clave utilizada para el cifrado
 * @returns {string} - El texto descifrado original
 */
function descifrarTexto(texto, desplazamiento) {
    let salida = "";

    desplazamiento = ((desplazamiento % 27) + 27) % 27;

    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];
        let encontrada = false;

        let posMay = alfabetoMay.indexOf(caracter);
        if (posMay !== -1) {
            salida += alfabetoMay[(posMay - desplazamiento + 27) % 27];
            encontrada = true;
        }

        if (!encontrada) {
            let posMin = alfabetoMin.indexOf(caracter);
            if (posMin !== -1) {
                salida += alfabetoMin[(posMin - desplazamiento + 27) % 27];
                encontrada = true;
            }
        }

        if (!encontrada) {
            salida += caracter;
        }
    }
    return salida;
}

console.log("Elija una opcion:");
console.log("1. Cifrar texto");
console.log("2. Descifrar texto");

rl.question("> ", (opcion) => {
    rl.question("Ingrese el texto: ", (texto) => {
        rl.question("Ingrese el desplazamiento (numero entero): ", (desplazamientoStr) => {
            const desplazamiento = parseInt(desplazamientoStr, 10);

            if (opcion === '1') {
                const resultado = cifrarTexto(texto, desplazamiento);
                console.log("Texto cifrado:", resultado);
            } else if (opcion === '2') {
                const resultado = descifrarTexto(texto, desplazamiento);
                console.log("Texto descifrado:", resultado);
            } else {
                console.log("Opcion invalida.");
            }

            rl.close();
        });
    });
});
`;

const SEED_TEAMS = {
  teams: [
    { id: 1, name: 'Equipo 1', files: { js: CIFRADO_CESAR_JS, html: '', css: '' }, updatedAt: null },
    { id: 2, name: 'Equipo 2', files: { js: '', html: '', css: '' }, updatedAt: null },
    { id: 3, name: 'Equipo 3', files: { js: '', html: '', css: '' }, updatedAt: null },
    { id: 4, name: 'Equipo 4', files: { js: '', html: '', css: '' }, updatedAt: null },
    { id: 5, name: 'Equipo 5', files: { js: '', html: '', css: '' }, updatedAt: null },
  ],
};
