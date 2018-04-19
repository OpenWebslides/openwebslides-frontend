// @flow

import { createStore } from 'redux';

import configureStore from '../configureStore';
import rootReducer from '../rootReducer';

describe(`configureStore`, (): void => {

  it(`returns a store created with the rootReducer`, (): void => {
    const configuredStore = configureStore();
    const rootReducerStore = createStore(rootReducer);
    expect(configuredStore.getState()).toEqual(rootReducerStore.getState());
  });

});
