// @flow

import * as actions from '../actions';
import * as t from '../actionTypes';

describe(`actions`, (): void => {
  describe(`signinEmail`, (): void => {
    it(`returns signin email action on correct params`, (): void => {
      const action = actions.signinEmail('foo', 'bar');

      expect(action).toEqual({
        type: t.SIGNIN_EMAIL,
        payload: {
          email: 'foo',
          password: 'bar',
        },
      });
    });

    it(`returns signin email error action on missing email`, (): void => {
      const action = actions.signinEmail('', 'bar');

      expect(action.type).toEqual(t.SIGNIN_EMAIL_ERROR);
    });

    it(`returns signin email error action on missing password`, (): void => {
      const action = actions.signinEmail('foo', '');

      expect(action.type).toEqual(t.SIGNIN_EMAIL_ERROR);
    });
  });

  describe(`signinOAuth`, (): void => {
    it(`returns signin oauth action on correct params`, (): void => {
      const action = actions.signinOAuth('foo');

      expect(action).toEqual({
        type: t.SIGNIN_OAUTH,
        payload: {
          email: 'foo',
        },
      });
    });

    it(`returns signin oauth error action on missing email`, (): void => {
      const action = actions.signinOAuth('');

      expect(action.type).toEqual(t.SIGNIN_OAUTH_ERROR);
    });
  });

  describe(`signout`, (): void => {
    it(`returns signout action on correct params`, (): void => {
      const action = actions.signout();

      expect(action).toEqual({
        type: t.SIGNOUT,
      });
    });
  });

  describe(`signup`, (): void => {
    it(`returns signup action on correct params`, (): void => {
      const action = actions.signup('foo', 'barbar', 'baz', 'bat');

      expect(action).toEqual({
        type: t.SIGNUP,
        payload: {
          email: 'foo',
          password: 'barbar',
          firstName: 'baz',
          lastName: 'bat',
        },
      });
    });

    it(`returns signup action on correct params without lastName`, (): void => {
      const action = actions.signup('foo', 'barbar', 'baz');

      expect(action).toEqual({
        type: t.SIGNUP,
        payload: {
          email: 'foo',
          password: 'barbar',
          firstName: 'baz',
          lastName: null,
        },
      });
    });

    it(`returns signup error action on missing email`, (): void => {
      const action = actions.signup('', 'barbar', 'baz', 'bat');

      expect(action.type).toEqual(t.SIGNUP_ERROR);
    });

    it(`returns signup error action on missing password`, (): void => {
      const action = actions.signup('foo', '', 'baz', 'bat');

      expect(action.type).toEqual(t.SIGNUP_ERROR);
    });

    it(`returns signup error action on too short password`, (): void => {
      const action = actions.signup('foo', 'bar', 'baz', 'bat');

      expect(action.type).toEqual(t.SIGNUP_ERROR);
    });

    it(`returns signup error action on too long password`, (): void => {
      const action = actions.signup('foo', 'barbarbarbarbarbarbarbar', 'baz', 'bat');

      expect(action.type).toEqual(t.SIGNUP_ERROR);
    });

    it(`returns signup error action on missing firstName`, (): void => {
      const action = actions.signup('foo', 'barbar', '', 'bat');

      expect(action.type).toEqual(t.SIGNUP_ERROR);
    });
  });

  describe(`reset`, (): void => {
    it(`returns reset action on correct params`, (): void => {
      const action = actions.reset('foo');

      expect(action).toEqual({
        type: t.RESET,
        payload: {
          email: 'foo',
        },
      });
    });

    it(`returns reset error action on missing email`, (): void => {
      const action = actions.reset('');

      expect(action.type).toEqual(t.RESET_ERROR);
    });
  });

  describe(`confirm`, (): void => {
    it(`returns confirm action on correct params`, (): void => {
      const action = actions.confirm('foo');

      expect(action).toEqual({
        type: t.CONFIRM,
        payload: {
          email: 'foo',
        },
      });
    });

    it(`returns confirm error action on missing email`, (): void => {
      const action = actions.confirm('');

      expect(action.type).toEqual(t.CONFIRM_ERROR);
    });
  });

  describe(`update token`, (): void => {
    it(`returns update token action on correct params`, (): void => {
      const action = actions.updateToken('foo');

      expect(action).toEqual({
        type: t.UPDATE_TOKEN,
        payload: {
          token: 'foo',
        },
      });
    });
  });
});
