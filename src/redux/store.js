import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Reducer, modalReducer, userReducer } from './Reducer';

export const store = createStore(
	combineReducers({ Reducer, modalReducer, userReducer }),
	undefined,
	window.__REDUX_DEVTOOLS_EXTESION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
