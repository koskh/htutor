import homeReducer from '../features/Home/store/reducer';
import learnReducer from '../features/Learn/store/reducer';
import testReducer from '../features/Test/store/reducer';
import settingsReducer from '../services/appSettings/store/reducer/index';


export default {
    homeComponentStore: homeReducer,
    learnComponentStore: learnReducer,
    testComponentStore: testReducer,
    settingsStore: settingsReducer
};
