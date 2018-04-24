// @flow

import {
  isAuthenticated,
  getAccount,
  getToken,
} from '../selectors';

const exampleState = {
  modules: {
    authentication: {
      authenticated: true,
      token: 'foobartoken',
      account: {
        id: '1',
        email: 'foo@bar',
        firstName: 'Foo',
        lastName: 'Bar',
      },
    },
  },
};

describe(`selectors`, (): void => {
  describe(`isAuthenticated`, (): void => {
    it(`gets authenticated from the state`, (): void => {
      // $FlowFixMe
      expect(isAuthenticated(exampleState)).toEqual(true);
    });
  });

  describe(`getAccount`, (): void => {
    it(`gets account from the state`, (): void => {
      // $FlowFixMe
      expect(getAccount(exampleState)).toEqual({
        id: '1',
        email: 'foo@bar',
        firstName: 'Foo',
        lastName: 'Bar',
      });
    });
  });

  describe(`getToken`, (): void => {
    it(`gets token from the state`, (): void => {
      // $FlowFixMe
      expect(getToken(exampleState)).toEqual('foobartoken');
    });
  });
});
