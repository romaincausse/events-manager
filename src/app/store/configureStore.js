import { createStore, applyMiddleware } from 'redux'
import rootReducer from "../reducers/rootReducer"
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export const configureStore = (preloadedtate) => {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer]

  const composedEnhancer = composeWithDevTools(...storeEnhancers)

  const store = createStore(
    rootReducer,
    preloadedtate,
    composedEnhancer
  )

    if(process.env.NODE_ENV !== "production") {
      if(module.hot) {
        module.hot.accept("../reducers/rootReducer", () => {
          const newRootReducer = require('../reducers/rootReducer').default
          store.replaceReducer(newRootReducer);
        })
      };
    };

  return store
}