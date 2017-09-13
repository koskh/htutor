import config from './config';

//eslint-disable-next-line
const modifier = require(`./${PROJECT_ENV}.json`); // как иначе передать меняющ имя файла?


export default { ...config, ...modifier };