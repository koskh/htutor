// @flow
import invariant from 'invariant';
import config from '../../config';

const apiPatch: string = `${config.serverApi}/api`;

const urls: {[key: string]: any} = {
    references: () => `${apiPatch}/references`,
    lessons: blockId => `${apiPatch}/lessons/${blockId}`,
    randomLesson: blockId => `${apiPatch}/lessons/${blockId}/randomLesson`,
    lesson: (blockId, lessonId) => `${apiPatch}/lessons/${blockId}/${lessonId}`,
    'lesson/test': (blockId, lessonId) => `${apiPatch}/lessons/${blockId}/${lessonId}/test`,

    // 'auth/login': () => `${apiPatch}/auth/login`,
};

export default (name: string, ...args?: Array<any>): string => {
    invariant(urls[name], 'The name url must be in urls[]');
    return urls[name](...args);
};
