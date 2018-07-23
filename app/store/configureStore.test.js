// @flow

import configureStore from './configureStore';

describe(`configureStore`, (): void => {

  it(`returns a redux store`, (): void => {
    const { store } = configureStore();
    expect(store.getState()).not.toBeFalsy();
  });

});
