<h1 align="center"> Voiceover </h1>

Esta aplicación permite grabar nuestra voz y transformarlo en texto, que quedará almacenado en un archivo de log que registrará la grabación. Además, se podrá también volver a escuchar el audio original o, por el contrario, escribir un texto y que lo locute el ordenador. (Sólo admite Español).

Ejecuta en la terminal el comando git clone https://github.com/carlosblanco86/voiceover.git una vez ha finalizado el clonado, entra en la terminal a la carpeta en la que se instaló y ejecuta npm install así se incluirán todas las dependencias utilizadas.

Además, es necesario tener instalado en el sistema los programas mpg123 y sox.
Para ello inserta en el terminal:<br>
sudo apt-get install mpg123 sox

Ahora sólo tienes que escribir nmp start en la carpeta en la que se instaló Voiceover.<br>

Puedes elegir varias opciones en la terminal:<br>
1. Grabar un audio que quedará almacenado en un archivo .wav, además puedes ver en la base de datos su transcripción automática.<br>
2. Escribir un texto por terminal, que leerá de forma automática el PC.<br>
3. Interactuar con la versión HTML del proyecto.<br>
4. Consultar en la base de datos los archivos de audio grabados y escuchar el que se desee, introduciendo el dígito de orden que hay a la izquierda.<br>
5. Consultar los logs escritos, tanto con las transcripciones de audio, como con los textos introducidos en el terminal.<br>
6. Salir del programa.<br>


Dependencias:<br>
colors: Permite añadir colores, como su propio nombre indica, y estilos, al menú en el que se seleccionan las opciones disponibles en el programa.<br>
readline: Sirve junto a colors para hacer más amigable la interfaz de la terminal.<br>
vosk: Encargado de la transcripción de los audios que capta el micrófono.<br>
google-tts-api: Encargada de poner voz al texto que se introduce por la terminal.<br>
node-audiorecorder: Nos permite grabar el audio del micrófono a través de SoX.<br>
util: Proporciona funciones y utilidades de Nodejs.<br>

Otros datos de interés:<br>
Mpg123 es un programa de Linux que permite escuchar los audios a través del terminal. SoX, por su parte, sirve para manipular archivos de audio en distintos formatos.
