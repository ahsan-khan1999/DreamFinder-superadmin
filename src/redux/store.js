/* eslint-disable */

import { createStore, applyMiddleware } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import reducers from './reducers';
// import sagas from './sagas';

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

// eslint-disable-next-line import/prefer-default-export
export function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    // applyMiddleware(thunk)
    composeEnhancers(applyMiddleware(thunk))
  );

  // sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
