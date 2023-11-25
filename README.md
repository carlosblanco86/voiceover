<h1 align="center"> Voiceover </h1>

Esta aplicación permite grabar nuestra voz y transformarlo en texto, que quedará almacenado en un archivo de log que registrará la grabación. Además, se podrá también volver a escuchar el audio original o, por el contrario, escribir un texto y que lo locute el ordenador. (Sólo admite Español).

Ejecuta en la terminal el comando git clone https://github.com/carlosblanco86/voiceover.git una vez ha finalizado el clonado, entra en la terminal a la carpeta en la que se instaló y ejecuta npm install así se incluirán todas las dependencias utilizadas.

Además, es necesario tener instalado en el sistema los programas mpg123 y sox.
Para ello inserta en el terminal:<br>
sudo apt-get install mpg123 sox

Ahora sólo tienes que escribir nmp start en la carpeta en la que se instaló Voiceover.

Puedes elegir varias opciones en la terminal:
1. Grabar un audio que quedará almacenado en un archivo .wav, además puedes ver en la base de datos su transcripción automática.
2. Escribir un texto por terminal, que leerá de forma automática el PC.
3. Interactuar con la versión HTML del proyecto.
4. Consultar en la base de datos los archivos de audio grabados y escuchar el que se desee, introduciendo el dígito de orden que hay a la izquierda.
5. Consultar los logs escritos, tanto con las transcripciones de audio, como con los textos introducidos en el terminal.
6. Salir del programa.


Dependencias:
colors: Permite añadir colores, como su propio nombre indica, y estilos, al menú en el que se seleccionan las opciones disponibles en el programa.
readline: Sirve junto a colors para hacer más amigable la interfaz de la terminal.
vosk: Encargado de la transcripción de los audios que capta el micrófono.
google-tts-api: Encargada de poner voz al texto que se introduce por la terminal.
node-audiorecorder: Nos permite grabar el audio del micrófono a través de SoX.
util: Proporciona funciones y utilidades de Nodejs.

Otros datos de interés:
Mpg123 es un programa de Linux que permite escuchar los audios a través del terminal. SoX, por su parte, sirve para manipular archivos de audio en distintos formatos.
