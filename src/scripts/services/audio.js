const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioContext && new AudioContext();

let audioSrv = null;

const _proxyStorage = {

    set: (url, arrayAsString) => {
        localStorage.setItem(url, arrayAsString);
    },

    get: url => {
        return localStorage.getItem(url);
    }
};


function play(url) {
    if (!audioCtx) {
        const audio = new window.Audio();
        audio.src = url;
        audio.play();
    } else {
        if (_proxyStorage.get(url)) {
            _decodeAudio(_proxyStorage.get(url));
            return;
        }

        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.send();

        request.onload = () => {
            _proxyStorage.set(url, new Int8Array(request.response).toString());
            _decodeAudio( _proxyStorage.get(url));
        };
    }
}

function _decodeAudio(bufferString) {
    const fullBuffer = Int8Array.from(bufferString.split(',')).buffer;

    audioCtx.decodeAudioData(fullBuffer, buffer => {
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.start();
    });
}

function initialize() {
    audioSrv = audioSrv || { play };
    return audioSrv;
}

export default initialize();
