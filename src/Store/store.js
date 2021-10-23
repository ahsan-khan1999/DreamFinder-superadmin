/* eslint-disable */
import { createStore,applyMiddleware } from "redux";
import reducers from './Reducers/Reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import thunk from 'redux-thunk'
const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(thunk))
);
export default store;