//Importamos los modulos necesarios para que se grabe la voz
const AudioRecorder = require('node-audiorecorder');
const fs = require('fs');
const vosk = require('vosk');
const path = require('path');
const modelPath = './vosk-model-small-es-0.42';

//Establecemos las configuraciones de grabacion
const voskModel = new vosk.Model(modelPath, { sampleRate: 16000 });
let recording = false;
let silenceTimer;
const silenceThreshold = 1000;

//Almacenar los archivos en la carpeta audios dentro del proyecto
const folderPath = 'audios';
const audioRecorder = new AudioRecorder({
  sampleRate: 16000,
  channels: 1,
  bitsPerSample: 16,
});

let audioStream;

//Funcion que permite iniciar una nueva grabacion
function startNewRecording() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `grabacion_${timestamp}.wav`;

  // Si no existe la carpeta 'audios' se crea
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Se creó la carpeta "${folderPath}"`);
  }

  const filePath = path.join(folderPath, filename);
  console.log(`Iniciando nueva grabación en ${filePath}`);
  return fs.createWriteStream(filePath, { encoding: 'binary' });
}

audioRecorder.start().stream().on('data', (data) => {
  if (!recording) {
    recording = true;
    audioStream = startNewRecording();
  }

  //Cuando se detecta un silencio, la grabación se para y se reinicia el contador
  clearTimeout(silenceTimer);
  silenceTimer = setTimeout(async () => {
    console.log('Silencio detectado. Grabación finalizada.');
    audioRecorder.stop();
    audioStream.end();

    // Se imprime la transcripcion en la consola y se guarda en el archivo baseDeDatos.txt
    const audioBuffer = fs.readFileSync(audioStream.path);
    const filename = audioStream.path; // Almacena el nombre del archivo
    const transcription = transcribeAudio(audioBuffer, filename);
    console.log('Transcripción:', transcription);
    appendToDatabaseFile(`Transcripción (${filename}): ${transcription}`);

  }, silenceThreshold);

  audioStream.write(data);
});

console.log('Esperando sonido...');

// El modulo Vosk se encarga de la transcripcion
function transcribeAudio(audioBuffer, filename) {
  const recognizer = new vosk.Recognizer({ model: voskModel, sampleRate: 16000 });
  recognizer.acceptWaveform(audioBuffer);

  const result = recognizer.result();
  const transcription = result.text;
  return transcription;
}

// Cada grabacion se añade al archivo txt sin borrar lo anterior
function appendToDatabaseFile(line) {
  fs.appendFileSync('./baseDeDatos.txt', `${line}\n`);
}
