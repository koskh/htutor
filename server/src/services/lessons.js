// @flow
const _ = require('lodash');

const LessonBlock1 = require('./bd/block_1/');

const LessonBlocks = [
    LessonBlock1
];

const lessons = LessonBlock1.lessons;


let AllNatives: Array<string> = [];
_.each(lessons, lesson => {
    _.each(lesson.words, word => {
        AllNatives = _.concat(AllNatives, word.native);
    });
});

let AllForeigns: Array<string> = [];
_.each(lessons, lesson => {
    _.each(lesson.words, word => {
        AllForeigns = _.concat(AllForeigns, word.foreign);
    });
});


function getShuffledNativesWords(shuffledQnt: number): Array<string> {
    return _.slice(_.shuffle(AllNatives), 0, shuffledQnt);
}
function getShuffledForeignsWords(shuffledQnt: number): Array<string> {
    return _.slice(_.shuffle(AllForeigns), 0, shuffledQnt);
}

exports.getLessons = function getLessons(): ?Array<Lesson> {
    return lessons;
};

exports.getLesson = function getLesson(id: number): ?Lesson {
    return _.find(lessons, { id });
};


exports.getTestLesson = function getLesson(id: number, shuffledQnt: number = 10): ?TestLesson {
    const lesson = _.find(lessons, { id });
    if (!lesson) return;

    _.each(lesson.words, (v: TestWord) => {
        // eslint-disable-next-line
        v.shuffledNative = getShuffledNativesWords(shuffledQnt);
        v.shuffledForeign = getShuffledForeignsWords(shuffledQnt);
    });
    // lesson.words = _.shuffle(lesson.words);

    // eslint-disable-next-line
    return _.assign({}, lesson);
};

exports.getRandomLessonId = function getRandomLessonId(): number {
    return _.shuffle(lessons)[0].id || 0;
};
