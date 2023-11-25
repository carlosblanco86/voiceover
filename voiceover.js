// Importamos los modulos necesarios para que funcione el programa

const readline = require('readline');
const colors = require('colors');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs').promises;
const path = require('path');
const leerTextoModule = require('./leer_texto');

//Crea una interfaz para poder leer y escribir en la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Sirve para devolver la promesa cuando el usuario elija la respuesta
function pregunta(opcion) {
  return new Promise((resolve) => {
    rl.question(opcion, resolve);
  });
}
//En esta función asincrona estan las funciones que se pueden seleccionar
async function mostrarMenu() {
  console.log(colors.bold.blue('Menú:'));
  console.log('1. ' + colors.green('Grabar voz'));
  console.log('2. ' + colors.green('Leer texto'));
  console.log('3. ' + colors.green('Ir a server.js'));
  console.log('4. ' + colors.yellow('Mostrar y reproducir archivos de audio'));
  console.log('5. ' + colors.yellow('Ver baseDeDatos.txt'));
  console.log('6. ' + colors.red('Salir'));
}

//Ejecuta el archivo que contine la opción seleccionada, si no funciona lanza un error
async function ejecutarArchivo(ruta) {
  try {
    await exec(`node ${ruta}`);
  } catch (error) {
    console.error('Error al ejecutar el archivo:', error.message);
  }
}
//Muestra la lista de archivos de audio que existen en el programa
async function mostrarArchivosDeAudio() {
  try {
    const directorioAudios = './audios';
    const archivos = await fs.readdir(directorioAudios);

    if (archivos.length === 0) {
      console.log('No hay archivos de audio en el directorio.');
    } else {
      console.log('Archivos de audio en el directorio:');
      archivos.forEach((archivo, index) => {
        console.log(`${index + 1}. ${archivo}`);
      });
    }
  } catch (error) {
    console.error('Error al leer el directorio de audios:', error.message);
  }
}
/*Muestra el archivo txt que contiene los textos introducidos en el sistema y
también incluye las transcripciones de los audios grabados*/
async function verBaseDeDatos() {
  try {
    const contenido = await fs.readFile('./baseDeDatos.txt', 'utf-8');
    console.log('Contenido de baseDeDatos.txt:');
    console.log(contenido);
  } catch (error) {
    console.error('Error al leer baseDeDatos.txt:', error.message);
  }
}
//Permite reproducir los archivos de audio grabados
async function reproducirAudio(archivo) {
  try {
    const rutaCompleta = path.join('./audios', archivo);
    await exec(`aplay ${rutaCompleta}`);
  } catch (error) {
    console.error('Error al reproducir el archivo de audio:', error.message);
  }
}
//Muestra el menu de opciones disponibles en el programa
async function menuPrincipal() {
  let opcion;
  do {
    await mostrarMenu();
    opcion = await pregunta(colors.blue('Selecciona una opción: '));

    switch (opcion) {
      case '1':
        console.log('Comienza la grabación, cuando se detecte silencio parará automáticamente');
        await ejecutarArchivo('./grabar_voz.js');
        break;
      case '2':
        console.log('Escribe el texto que desees que lea el PC, al finalizar pulsa Intro');
        const entrada = await pregunta('Introduce algo: ');
        await leerTextoModule.leerEntradaPorVoz(entrada);
        break;
      case '3':
        console.log('Versión HTML');
        await ejecutarArchivo('./server.js');
        break;
      case '4':
        await mostrarArchivosDeAudio();
        const seleccion = await pregunta('Indica el número del archivo que quieres escuchar: ');
        const archivos = await fs.readdir('./audios');
        const archivoSeleccionado = archivos[parseInt(seleccion) - 1];
        if (archivoSeleccionado) {
          console.log(`Reproduciendo: ${archivoSeleccionado}`);
          await reproducirAudio(archivoSeleccionado);
        } else {
          console.log(colors.red('Selección no válida'));
        }
        break;
      case '5':
        await verBaseDeDatos();
        break;
      case '6':
        rl.close(); // Salir del programa
        break;
      default:
        console.log(colors.red('Opción no válida'));
    }
  } while (opcion !== '6');
}

(async () => {
  await menuPrincipal();
})();
