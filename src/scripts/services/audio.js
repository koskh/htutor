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

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
}

function str2ab(str) {
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i<strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}


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
            proxyStorage[url] = new Int16Array(request.response, 0, Math.floor(request.response.byteLength / 2)).toString();
            // let buffer = new Int16Array(request.response, 0, Math.floor(request.response.byteLength / 2));
            // let string = ab2str(new Int16Array(request.response, 0, Math.floor(request.response.byteLength / 2)));

            _decodeAudio(proxyStorage[url]);
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
