const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioContext && new AudioContext();

let audioSrv = null;
const encoder = new TextEncoder();

// const proxyStorage = {
//
//     set: (url, int16array) => {
//         localStorage.setItem(url, int16array);
//     },
//
//     get: url => {
//         const bufferString = localStorage.getItem(url);
//
//         return bufferString ? new Int16Array(encoder.encode(bufferString).buffer) : undefined;
//     }
// };

const proxyStorage = {};

function play(url) {
    if (!audioCtx) {
        const audio = new window.Audio();
        audio.src = url;
        audio.load();
        audio.play();
    } else {
        // if (proxyStorage.get(url)) {
        //     _decodeAudio(proxyStorage.get(url));
        //     return;
        // }

        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.send();

        request.onload = () => {
            // proxyStorage[url] = new Int16Array(request.response, 0, Math.floor(request.response.byteLength / 2)).toString();
            proxyStorage[url] = new Int16Array(request.response, 0, Math.floor(request.response.byteLength / 2));
            _decodeAudio(proxyStorage[url]);
        };
    }
}

function _decodeAudio(array) {
    // const fullBuffer = (new Int16Array(encoder.encode(arrayString).buffer)).buffer;
    const fullBuffer = new Int16Array(array).buffer;

    debugger

    audioCtx.decodeAudioData(fullBuffer, buffer => {
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start(0);
    });
}

function initialize() {
    audioSrv = audioSrv || { play };
    return audioSrv;
}

export default initialize();
