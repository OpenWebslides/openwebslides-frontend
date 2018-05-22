// @flow

import * as actions from '../actions';
import * as t from '../actionTypes';

import { sidebar } from '../model';

describe(`actions`, (): void => {

  describe(`toggle`, (): void => {

    it(`returns a sidebar TOGGLE action, when parameters are valid`, (): void => {
      const sidebarName = sidebar.SLIDE;

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

  });

});
