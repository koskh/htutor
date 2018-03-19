import {getBlocks, getBlock, getRandomBlockId} from '../../../../server/src/services/blocks';
import {getLesson, getRandomLessonId} from '../../../../server/src/services/lessons';

export function blocks(blockId) {
    const localBlockId = Number.parseInt(blockId, 10);
    return localBlockId? getBlock(localBlockId): getBlocks();
}

export function randomLesson(blockId) {
    const localBlockId = Number.parseInt(blockId, 10);
    return getRandomLessonId(localBlockId)
}

export function lesson(blockId, lessonId) {
    const localBlockId = Number.parseInt(blockId, 10);
    const localLessonId = Number.parseInt(lessonId, 10);

    return getLesson(localBlockId, localLessonId)
}
