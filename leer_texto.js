//Importamos los modulos que permiten leer el texto insertado
const fs = require('fs');
const tts = require('google-tts-api');
const exec = require('child_process').exec;
const archivoBaseDatos = './baseDeDatos.txt';

//Obtenemos fecha y hora para guardar los logs de los textos
function obtenerFechaHoraActual() {
  const ahora = new Date();
  const opcionesFecha = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  const fecha = ahora.toLocaleDateString(undefined, opcionesFecha);
  const hora = ahora.toLocaleTimeString(undefined, opcionesHora);

  return `${fecha} ${hora}`;
}

//Se lee usando la voz de google-tts-api
async function leerEntradaPorVoz(entrada) {
  try {
    const url = await tts.getAudioUrl(entrada, { lang: 'es' });
    const fechaHoraActual = obtenerFechaHoraActual();

    // Se guarda todo en el archivo baseDeDatos.txt
    const registro = `[${fechaHoraActual}] ${entrada}\n`;
    fs.appendFileSync(archivoBaseDatos, registro, 'utf-8');

    // Lanza el audio usando este archivo temporal usando la api mpg123
    const archivoTemp = 'audio_temp.mp3';
    exec(`wget -q -O ${archivoTemp} "${url}"`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error al guardar el archivo de audio temporal:', error);
        return;
      }
      exec(`mpg123 ${archivoTemp}`, (error, stdout, stderr) => {
        if (error) {
          console.error('Error al reproducir el audio:', error);
        }

        // Una vez reproducido se elimina el archivo temporal de audio
        fs.unlinkSync(archivoTemp);
      });
    });

    console.log('Texto guardado en baseDeDatos.txt y reproducido por voz.');
  } catch (error) {
    console.error('Error al generar el audio:', error.message);
  }
}

// Exportamos la función para que pueda ser utilizada desde el menu
module.exports = { leerEntradaPorVoz };
