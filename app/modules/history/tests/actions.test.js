// @flow

import * as actions from '../actions';
import * as t from '../actionTypes';

describe(`actions`, (): void => {
  describe(`reducer actions`, (): void => {
    describe(`setInState`, (): void => {
      it(`returns a history SET_IN_STATE action`, (): void => {
        expect(actions.setInState('/foobar')).toEqual({
          type: t.SET_IN_STATE,
          payload: {
            location: '/foobar',
          },
        });
      });
    });
  });

  describe(`task saga actions`, (): void => {
    describe(`redirect`, (): void => {
      it(`returns a history REDIRECT action`, (): void => {
        expect(actions.redirect('/foobar')).toEqual({
          type: t.REDIRECT,
          payload: {
            location: '/foobar',
          },
        });
      });
    });
  });
});
