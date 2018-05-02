// @flow

import { createStore } from 'redux';

import topics from 'modules/topics';
import contentItems from 'modules/content-items';
import feed from 'modules/feed';
import users from 'modules/users';
import authentication from 'modules/authentication';

import modulesReducer from '../modulesReducer';

describe(`modulesReducer`, (): void => {

  it(`has an initialState that is a combination of the initialStates of its combined reducers`, (): void => {
    const dummyState = createStore(modulesReducer).getState();
    expect(dummyState.topics).toEqual(topics.reducer(undefined, ({}: any)));
    expect(dummyState.contentItems).toEqual(contentItems.reducer(undefined, ({}: any)));
    expect(dummyState.feed).toEqual(feed.reducer(undefined, ({}: any)));
    expect(dummyState.users).toEqual(users.reducer(undefined, ({}: any)));
    expect(dummyState.authentication).toEqual(authentication.reducer(undefined, ({}: any)));
  });

});
