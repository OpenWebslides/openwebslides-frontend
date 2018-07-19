// @flow

import selectors from '.';

describe(`getUserAuth`, (): void => {

  it(`returns the UserAuth object, when the current user is authenticated`, (): void => {
    const dummyUserAuth = {
      userId: 'dummyUserId',
      apiToken: 'foobarToken',
    };
    const dummyState: any = { modules: { platform: {
      userAuth: dummyUserAuth,
    } } };
    expect(selectors.getUserAuth(dummyState)).toBe(dummyUserAuth);
  });

  it(`returns NULL, when the current user is not authenticated`, (): void => {
    const dummyState: any = { modules: { platform: {
      userAuth: null,
    } } };
    expect(selectors.getUserAuth(dummyState)).toBeNull();
  });

});
