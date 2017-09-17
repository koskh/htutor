// @flow
const _ = require('lodash');

const Lesson1 = require('./bd/Lesson_1');
const Lesson2 = require('./bd/Lesson_2');

//eslint-disable-next-line
const lessons: Array<Lesson> = [
    Lesson1,
    Lesson2
];

let AllNatives: Array<string> = [];
_.each(lessons, lesson => {
    _.each(lesson.words, word => {
        AllNatives = _.concat(AllNatives, word.native);
    });
});

let AllForeigns: Array<string> = [];
_.each(lessons, lesson => {
    _.each(lesson.words, word => {
        AllForeigns = _.concat(AllNatives, word.foreign);
    });
});


function getShuffledNativesWords(): Array<string> {
    const shuffledQwnt = 5;
    return _.slice(_.shuffle(AllNatives), shuffledQwnt);
}
function getShuffledAllForeignsWords(): Array<string> {
    const shuffledQwnt = 5;
    return _.slice(_.shuffle(AllForeigns), shuffledQwnt);
}

exports.getLessons = function getLessons(): ?Array<Lesson> {
    return lessons;
};

exports.getLesson = function getLesson(id: number): ?Lesson {
    return _.find(lessons, { id });
};


exports.getTestLesson = function getLesson(id: number): ?TestLesson {
    const lesson = _.find(lessons, { id });
    if (!lesson) return;

    _.each(lesson.words, (v: TestWord) => {
        //eslint-disable-next-line
        v.shuffle = getShuffledNativesWords();
    });
    // lesson.words = _.shuffle(lesson.words);

    //eslint-disable-next-line
    return _.assign({}, lesson);
};

exports.getRandomLessonId = function getRandomLessonId(): number {
    return _.shuffle(lessons)[0].id || 0;
};
