const Default = {
    serverApi: 'http://192.168.1.10:3001',
    localStorageTokenKey: 'some.token',
    tokenLifetimeSeconds: 600
};

//eslint-disable-next-line
const modifier = require(`./${PROJECT_ENV}.json`); // как иначе передать меняющ имя файла?

export default {...Default, ...modifier};
