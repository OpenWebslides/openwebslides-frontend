// @flow

import { createStore } from 'redux';

import configureStore from '../configureStore';
import rootReducer from '../rootReducer';

describe(`configureStore`, (): void => {

  it(`returns a store created with the rootReducer`, (): void => {
    const persistedState = {
      // modules: {
      //   authentication: {
      //     authenticated: false,
      //     account: null,
      //     token: null,
      //   },
      // },
    };
    const configuredStore = configureStore();
    const rootReducerStore = createStore(rootReducer, persistedState);
    expect(configuredStore.getState()).toEqual(rootReducerStore.getState());
  });

});
