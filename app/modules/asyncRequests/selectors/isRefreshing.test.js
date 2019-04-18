// @flow

import selectors from '.';

describe(`isRefreshing`, (): void => {

  it(`returns TRUE, when refreshing is TRUE`, (): void => {
    const dummyState: any = {
      modules: {
        asyncRequests: {
          byId: {},
          refreshing: true,
        },
      },
    };
    expect(selectors.isRefreshing(dummyState)).toBe(true);
  });

  it(`returns FALSE, when refreshing is FALSE`, (): void => {
    const dummyState: any = {
      modules: {
        asyncRequests: {
          byId: {},
          refreshing: false,
        },
      },
    };
    expect(selectors.isRefreshing(dummyState)).toBe(false);
  });

});
