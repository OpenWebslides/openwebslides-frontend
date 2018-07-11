// @flow

import { createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import rootReducer from '../rootReducer';
import modulesReducer from '../modulesReducer';
import errorReducer from '../errorReducer';

describe(`rootReducer`, (): void => {

  it(`allows creating the store`, (): void => {
    createStore(rootReducer);
  });

  it(`has an initialState that is a combination of the initialStates of its combined reducers`, (): void => {
    const dummyState = createStore(rootReducer).getState();
    expect(dummyState.modules).toEqual(modulesReducer(undefined, ({}: any)));
    expect(dummyState.form).toEqual(formReducer(undefined, ({}: any)));
    expect(dummyState.error).toEqual(errorReducer(undefined, ({}: any)));
  });

});
