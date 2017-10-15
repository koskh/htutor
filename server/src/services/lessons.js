// @flow
const _ = require('lodash');

const { LessonBlocks } = require('./blocks');

function getAllNatives(lessons): Array<string> {
    let natives = [];
    _.each(lessons, lesson => {
        _.each(lesson.words, word => {
            natives = _.concat(natives, word.native);
        });
    });

    return natives;
}


function getAllForeigns(lessons): Array<string> {
    let foreigns = [];
    _.each(lessons, lesson => {
        _.each(lesson.words, word => {
            foreigns = _.concat(foreigns, word.foreign);
        });
    });
    return foreigns;
}


function getShuffledNativesWords(lessons: Array<Lesson>, shuffledQnt: number): Array<string> {
    const AllNatives = getAllNatives(lessons);
    return _.slice(_.shuffle(AllNatives), 0, shuffledQnt);
}
function getShuffledForeignsWords(lessons: Array<Lesson>, shuffledQnt: number): Array<string> {
    const AllForeigns = getAllForeigns(lessons);
    return _.slice(_.shuffle(AllForeigns), 0, shuffledQnt);
}

function getLessons(blockId: number): ?Array<Lesson> {
    const lessonBlock = _.find(LessonBlocks, { id: blockId });
    const lessons = lessonBlock && lessonBlock.lessons;
    return lessons || [];
}

function getLesson(blockId: number, LessonId: number): ?Lesson {
    const lessons = getLessons(blockId);
    return _.find(lessons, { id: LessonId });
}

exports.getLessons = function (blockId: number): ?Array<Lesson> {
    return getLessons(blockId);
};

exports.getLesson = function (blockId: number, LessonId: number): ?Lesson {
    return getLesson(blockId, LessonId);
};


exports.getTestLesson = function (blockId: number, LessonId: number, shuffledQnt: number = 10): ?TestLesson {
    const lessons = getLessons(blockId);
    const lesson = getLesson(blockId, LessonId);

    if (!lessons || !lesson)
        return;

    _.each(lesson.words, (v: TestWord) => {
        // eslint-disable-next-line
        v.shuffledNative = getShuffledNativesWords(lessons, shuffledQnt);
        v.shuffledForeign = getShuffledForeignsWords(lessons, shuffledQnt);
    });
    // lesson.words = _.shuffle(lesson.words);

    // eslint-disable-next-line
    return _.assign({}, lesson);
};


exports.getRandomBlockId = function (): number {
    return _.shuffle(LessonBlocks)[0].id || 0;
};

exports.getRandomLessonId = function (blockId: number): number {
    const lessons = getLessons(blockId);
    return _.shuffle(lessons)[0].id || 0;
};
