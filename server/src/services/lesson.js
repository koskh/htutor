// @flow
const _ = require('lodash');

const Lesson1 = require('./bd/Lesson_1');
const Lesson2 = require('./bd/Lesson_2');

//eslint-disable-next-line
const lessons: Array<Lesson> = [
    Lesson1,
    Lesson2
];

// lessons.push(Lesson_1);
// lessons.push(Lesson_2);

let AllNatives: Array<string> = [];
_.each(lessons, lesson => {
    _.each(lesson.words, word => {
        AllNatives = _.concat(AllNatives, word.native);
    });
})


function getShuffledWords(): Array<string> {
    const shuffledQwnt = 5;
    return _.slice(_.shuffle(AllNatives), shuffledQwnt);
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
