// @flow
const _ = require('lodash');

//eslint-disable-next-line
const lessons: Array<Lesson> = [
    {
        id: 1,
        words: [
            { foreign: ['hare'], native: ['заяц'], sounds: ['hare0001.mp3'] },
            { foreign: ['careless'], native: ['небрежный', 'невнимательный', 'несерьёзный'], sounds: ['careless.wav'] },
            { foreign: ['next'], native: ['cледующий', 'ближайший'], sounds: ['next.wav'] },
        ],
        title: 'Lesson 1'
    }
];

function getShuffledWords(): Array<string> {
    return ['abc', 'dcb', 'ert', 'qweqweqwe', 'qweqwr'];
}

exports.getLesson = function getLesson(id: number = 1): ?Lesson {
    return _.find(lessons, { id });
};


exports.getTestLesson = function getLesson(id: number = 1): ?TestLesson {
    const lesson = _.find(lessons, { id });
    if (!lesson) return;

    const words: Array<Word> = lesson.words;

    _.each(words, (v: TestWord) => {
        //eslint-disable-next-line
        v.shuffle = getShuffledWords();
    });

    //eslint-disable-next-line
    return _.assign({}, lesson, { words });
};
