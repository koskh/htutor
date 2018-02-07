import 'babel-polyfill';

import * as React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.pcss';

import history from './services/history';
import Reducers from './store/reducers';

import { makeFetch as getAppSettingsAction } from './services/appSettings/store/actions/fetch';

import DefaultLayout from './layouts/Default';


const routerMiiddleware = routerMiddleware(history);

// eslint-disable-next-line
const preloadedState = process.env.NODE_ENV !== 'production' ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || {} : {};

//
const store = createStore(
    combineReducers({
        ...Reducers,
        router: routerReducer
    }),
    preloadedState,
    applyMiddleware(routerMiiddleware, thunkMiddleware)
);


const add = (a: number, b: number): number => a + b;
console.log(add(1, 2));
console.log(add(1, false));

async function applicationStart() {
    try {
        const settingsThunkAction = await getAppSettingsAction();
        await settingsThunkAction(store.dispatch);

        ReactDOM.render(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" component={DefaultLayout} />
                    </Switch>
                </ConnectedRouter>
            </Provider>,
            document.getElementById('root')
        );
    } catch (e) {
        console.log('Cant get application settings');
    }
}

applicationStart();
