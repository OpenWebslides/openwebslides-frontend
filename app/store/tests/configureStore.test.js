// @flow

import configureStore from '../configureStore';

describe(`configureStore`, (): void => {

  it(`returns a redux store`, (): void => {
    const configuredStore = configureStore();
    expect(configuredStore.getState()).not.toBeFalsy();
  });

});
