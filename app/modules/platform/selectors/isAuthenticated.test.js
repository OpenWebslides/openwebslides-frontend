// @flow

import selectors from '.';

describe(`isAuthenticated`, (): void => {

  it(`returns TRUE, when the current user is authenticated`, (): void => {
    const dummyState: any = { modules: { platform: {
      userAuth: {
        userId: 'dummyUserId',
        apiToken: 'foobarToken',
      },
    } } };
    expect(selectors.isAuthenticated(dummyState)).toBe(true);
  });

  it(`returns FALSE, when the current user is not authenticated`, (): void => {
    const dummyState: any = { modules: { platform: {
      userAuth: null,
    } } };
    expect(selectors.isAuthenticated(dummyState)).toBe(false);
  });

});
