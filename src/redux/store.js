import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import * as reducers from 'redux/reducers';

export const history = createBrowserHistory();

export const store = createStore(
    combineReducers({
        router: connectRouter(history),
        ...reducers
    }),
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
);
