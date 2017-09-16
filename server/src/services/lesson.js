// @flow
const _ = require('lodash');

const Lesson_1 = require('./bd/Lesson_1');

//eslint-disable-next-line
const lessons: Array<Lesson> = [];

lessons.push(Lesson_1);

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
