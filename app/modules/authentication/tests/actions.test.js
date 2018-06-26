// @flow

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';

import * as actions from '../actions';
import * as t from '../actionTypes';

describe(`actions`, (): void => {

  describe(`reducer actions`, (): void => {

    describe(`setAccountInState`, (): void => {

      it(`returns set account action`, (): void => {
        const user = {
          id: 'foo',
          email: 'foo@bar',
          firstName: 'Foo',
        };
        const action = actions.setAccountInState(user);

        expect(action).toEqual({
          type: t.SET_ACCOUNT,
          payload: {
            account: user,
          },
        });
      });
    });

    describe(`setTokenInState`, (): void => {

      it(`returns set token action`, (): void => {
        const action = actions.setTokenInState('foobar');

        expect(action).toEqual({
          type: t.SET_TOKEN,
          payload: {
            token: 'foobar',
          },
        });
      });

    });

  });

  describe(`task saga actions`, (): void => {

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

      it(`throws InvalidArgumentError on missing email`, (): void => {
        expect((): void => {
          actions.signinEmail('', 'bar');
        }).toThrow(InvalidArgumentError);
      });

      it(`throws InvalidArgumentError on missing password`, (): void => {
        expect((): void => {
          actions.signinEmail('foo', '');
        }).toThrow(InvalidArgumentError);
      });

    });

    describe(`signout`, (): void => {

      it(`returns signout action`, (): void => {
        const action = actions.signout();

        expect(action).toEqual({
          type: t.SIGNOUT,
        });
      });

    });

    describe(`signup`, (): void => {

      it(`returns signup action on correct params`, (): void => {
        const action = actions.signup('foo@bar', 'Foo', 'Bar', 'barbar', true);

        expect(action).toEqual({
          type: t.SIGNUP,
          payload: {
            email: 'foo@bar',
            password: 'barbar',
            firstName: 'Foo',
            lastName: 'Bar',
            tosAccepted: true,
          },
        });
      });

      it(`returns signup action on correct params without lastName`, (): void => {
        const action = actions.signup('foo@bar', 'Foo', '', 'barbar', true);

        expect(action).toEqual({
          type: t.SIGNUP,
          payload: {
            email: 'foo@bar',
            password: 'barbar',
            firstName: 'Foo',
            lastName: '',
            tosAccepted: true,
          },
        });
      });

      it(`throws InvalidArgumentError on missing email`, (): void => {
        expect((): void => {
          actions.signup('', 'Foo', 'Bar', 'barbar', true);
        }).toThrow(InvalidArgumentError);
      });

      it(`throws InvalidArgumentError on missing password`, (): void => {
        expect((): void => {
          actions.signup('foo@bar', 'Foo', 'Bar', '', true);
        }).toThrow(InvalidArgumentError);
      });

      it(`throws InvalidArgumentError on too short password`, (): void => {
        expect((): void => {
          actions.signup('', 'Foo', 'Bar', 'bar', true);
        }).toThrow(InvalidArgumentError);
      });

      it(`throws InvalidArgumentError on too long password`, (): void => {
        expect((): void => {
          actions.signup('', 'Foo', 'Bar', 'barbarbarbarbarbarbarbar', true);
        }).toThrow(InvalidArgumentError);
      });

      it(`throws InvalidArgumentError on missing firstName`, (): void => {
        expect((): void => {
          actions.signup('foo@bar', '', 'Bar', 'bar', true);
        }).toThrow(InvalidArgumentError);
      });

      it(`throws InvalidArgumentError on tos not accepted`, (): void => {
        expect((): void => {
          actions.signup('foo@bar', 'Foo', 'Bar', 'barbar', false);
        }).toThrow(InvalidArgumentError);
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

      it(`throws InvalidArgumentError on missing email`, (): void => {
        expect((): void => {
          actions.reset('');
        }).toThrow(InvalidArgumentError);
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

      it(`throws InvalidArgumentError on missing email`, (): void => {
        expect((): void => {
          actions.confirm('');
        }).toThrow(InvalidArgumentError);
      });
    });

  });

  describe(`API saga actions`, (): void => {

    describe(`apiPostToken`, (): void => {

      it(`returns post token action`, (): void => {
        const action = actions.apiPostToken('email', 'password');

        expect(action).toEqual({
          type: t.API_POST_TOKEN,
          payload: {
            email: 'email',
            password: 'password',
          },
        });
      });

    });

    describe(`apiDeleteToken`, (): void => {

      it(`returns delete token action`, (): void => {
        const action = actions.apiDeleteToken();

        expect(action).toEqual({
          type: t.API_DELETE_TOKEN,
        });
      });

    });

    describe(`apiPostUsers`, (): void => {

      it(`returns post users action`, (): void => {
        const action = actions.apiPostUsers('email', 'firstName', 'lastName', 'password', true);

        expect(action)
          .toEqual({
            type: t.API_POST_USERS,
            payload: {
              email: 'email',
              firstName: 'firstName',
              lastName: 'lastName',
              password: 'password',
              tosAccepted: true,
            },
          });
      });

    });

    describe(`apiPostPassword`, (): void => {

      it(`returns post password action`, (): void => {
        const action = actions.apiPostPassword('foo@bar');

        expect(action).toEqual({
          type: t.API_POST_PASSWORD,
          payload: {
            email: 'foo@bar',
          },
        });
      });

      describe(`apiPostConfirmation`, (): void => {

        it(`returns post confirmation action`, (): void => {
          const action = actions.apiPostConfirmation('foo@bar');

          expect(action).toEqual({
            type: t.API_POST_CONFIRMATION,
            payload: {
              email: 'foo@bar',
            },
          });
        });

      });

    });

  });

});
