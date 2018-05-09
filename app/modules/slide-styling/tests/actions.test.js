// @flow

import { contentItemTypes } from 'modules/content-items';
import * as t from '../actionTypes';
import { editContentTypeColorInState } from '../actions';


describe('actions', (): void => {

  describe('editContentTypeColorInState', (): void => {
    const dummyId = 'hijklmnopq';
    const dummyColor = '#564894';
    const dummyContentItemType = contentItemTypes.HEADING;

    it('returns a slideStyling EDIT_CONTENTTYPE_COLOR_IN_STATE action containing the passed props', (): void => {
      const expectedAction: t.EditContentTypeColorAction = {
        type: t.EDIT_CONTENTTYPE_COLOR_IN_STATE,
        payload: {
          id: dummyId,
          contentItemType: dummyContentItemType,
          newColor: dummyColor,
        },
      };
      expect(editContentTypeColorInState(dummyId, dummyContentItemType, dummyColor)).toEqual(expectedAction);
    });

  });
});
