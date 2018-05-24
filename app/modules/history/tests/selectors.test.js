// @flow

import { getLocation } from '../selectors';

describe(`selectors`, (): void => {
  const dummyState: any = {
    modules: {
      history: {
        location: '/foobar',
      },
    },
  };
  const dummyEmptyState: any = {
    modules: {
      history: {
        location: null,
      },
    },
  };

  describe(`getLocation`, (): void => {
    it(`returns the location`, (): void => {
      expect(getLocation(dummyState)).toEqual('/foobar');
    });

    it(`returns null when the state is empty`, (): void => {
      expect(getLocation(dummyEmptyState)).toEqual(null);
    });
  });
});
