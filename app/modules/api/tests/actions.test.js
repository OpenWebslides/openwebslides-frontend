// @flow

import * as actions from '../actions';
import * as t from '../actionTypes';

import { statusTypes } from '../model';

describe(`actions`, (): void => {

  describe(`setStatusInState`, (): void => {

    it(`returns a SET_STATUS action, when parameters are valid`, (): void => {
      const generatedAction: t.ApiAction = actions.setStatusInState('foobar', statusTypes.FAILURE);

      expect(generatedAction).toEqual({
        type: t.SET_STATUS,
        payload: {
          request: 'foobar',
          status: statusTypes.FAILURE,
        },
      });
    });

    it(`returns a SET_STATUS_ERROR action, when no request given`, (): void => {
      const generatedAction: t.ApiAction = actions.setStatusInState('', statusTypes.FAILURE);

      expect(generatedAction.type).toEqual(t.SET_STATUS_ERROR);
    });

  });

});
