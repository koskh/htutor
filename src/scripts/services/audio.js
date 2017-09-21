
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioContext && new AudioContext();

let audioSrv = null;


function play(url) {
    if (!audioCtx) {
        const audio = new window.Audio();
        audio.src = url;
        audio.load();
        audio.play();
    } else {
        const request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.send();

        request.onload = () => {
            audioCtx.decodeAudioData(request.response, buffer => {
                const source = audioCtx.createBufferSource();
                source.buffer = buffer;
                source.connect(audioCtx.destination);
                source.start(0);
            });
        };
    }
}

function initialize() {
    audioSrv = audioSrv || {play};
    return audioSrv;
}

export default initialize();
