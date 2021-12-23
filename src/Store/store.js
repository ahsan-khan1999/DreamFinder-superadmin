/* eslint-disable */
import { createStore,applyMiddleware } from "redux";
import reducers from './Reducers/Reducers';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import thunk from 'redux-thunk'
const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk)
);
export default store;