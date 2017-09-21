const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioContext && new AudioContext();

let audioSrv = null;
const encoder = new TextEncoder();

const proxyStorage = {

    set: (url, arrayAsString) => {
        localStorage.setItem(url, arrayAsString);
    },

    get: url => {
        return localStorage.getItem(url);
    }
};


// const proxyStorage = {};

function play(url) {
    if (!audioCtx) {
        const audio = new window.Audio();
        audio.src = url;
        audio.load();
        audio.play();
    } else {

        if (proxyStorage.get(url)) {
            _decodeAudio(proxyStorage.get(url));
            return;
        }

        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.send();

        request.onload = () => {
            proxyStorage.set (url, new Int16Array(request.response, 0, Math.floor(request.response.byteLength / 2)).toString());
            _decodeAudio(proxyStorage.get(url));
        };
    }
}

function _decodeAudio(arrayAsString) {
    const arr = arrayAsString.split(',');
    const fullBuffer = Int16Array.from(arr).buffer;

    // debugger

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
