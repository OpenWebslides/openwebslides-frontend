// @flow

import * as actions from '../actions';
import * as t from '../actionTypes';

describe(`actions`, (): void => {

  describe(`toggle`, (): void => {

    it(`returns a sidebar TOGGLE action, when parameters are valid`, (): void => {
      const sidebarName = 'sidebarName/SLIDE';

      const expectedAction: t.ToggleAction = {
        type: t.TOGGLE,
        payload: {
          sidebarName,
        },
      };
      // eslint-disable-next-line
      const generatedAction: t.ToggleAction = ((actions.toggle(sidebarName): any): t.ToggleAction);

      expect(generatedAction.type).toEqual(expectedAction.type);
      expect(generatedAction.payload.sidebarName).toEqual(expectedAction.payload.sidebarName);
    });

    it(`returns a topic TOGGLE_ERROR action, when sidebarName parameter is an empty string`, (): void => {
      const sidebarName = '';

      const expectedAction: t.ToggleErrorAction = {
        type: t.TOGGLE_ERROR,
        error: {
          message: 'SidebarName cannot be empty.',
        },
      };

      expect(actions.toggle(sidebarName)).toEqual(expectedAction);
    });

  });

});
