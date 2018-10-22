import React from 'react';
import { Provider } from 'react-redux';
import { Platform, UIManager } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Reactotron from 'reactotron-react-native';
import reducer from './reducers';
import AppContainer from './AppContainer';
import '../ReactotronConfig';

const middlewares = [thunkMiddleware];
if (__DEV__) {
  const logger = createLogger();
  middlewares.push(logger);
}

function configureStores(initialState) {
  const enhancer = compose(
    applyMiddleware(
      ...middlewares,
    ),
  );
  return Reactotron.createStore(reducer, initialState, enhancer);
}

const store = configureStores({});

const App = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
