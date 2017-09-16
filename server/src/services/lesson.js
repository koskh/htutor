// @flow
const _ = require('lodash');

const LocalSoundsFolder = '/media/Video/soft/Linux_Soft/StarDict_Словари/en_snd/en_snd/';

//eslint-disable-next-line
const lessons: Array<Lesson> = [
    {
        id: 1,
        words: [
            { foreign: ['hare'], native: ['заяц'], sounds: ['/sounds/h/hare.wav'] },
            { foreign: ['careless'], native: ['небрежный', 'невнимательный', 'несерьёзный'], sounds: ['/sounds/c/careless.wav'] },
            { foreign: ['next'], native: ['cледующий', 'ближайший'], sounds: ['/sounds/n/next.wav'] },
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

    _.each(lesson.words, (v: TestWord) => {
        //eslint-disable-next-line
        v.shuffle = getShuffledWords();
    });
    // lesson.words = _.shuffle(lesson.words);

    //eslint-disable-next-line
    return _.assign({}, lesson);
};
