// @flow

import * as actions from '../actions';
import * as t from '../actionTypes';
import { statusTypes } from '../model';

describe(`actions`, (): void => {

  describe(`setStatusInState`, (): void => {

    it(`returns a SET_STATUS action, when parameters are valid`, (): void => {
      const generatedAction: t.ApiAction = actions.setStatusInState('foobar', statusTypes.FAILURE);

      expect(generatedAction).toEqual({
        type: t.SET_STATUS_IN_STATE,
        payload: {
          request: 'foobar',
          status: statusTypes.FAILURE,
        },
      });
    });

    it(`throws an error, when no request given`, (): void => {
      expect(() => actions.setStatusInState('', statusTypes.FAILURE)).toThrow();
    });

  });

});
