// @flow
const _ = require('lodash');

const LessonBlock1: LessonsBlock = require('./bd/block_1');
const LessonBlock2: LessonsBlock = require('./bd/block_2');

const LessonBlocks = [
    LessonBlock1,
    LessonBlock2
];

exports.LessonBlocks = LessonBlocks;

exports.getBlock = function (blockId: number): ?LessonsBlock {
    return  _.find(LessonBlocks, { id: blockId });
};

exports.getRandomBlockId = function (): number {
    return _.shuffle(LessonBlocks)[0].id || 0;
};
