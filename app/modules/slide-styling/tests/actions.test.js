// @flow

import { contentItemTypes } from 'modules/content-items';
import * as t from '../actionTypes';
import { editContentTypeColorInState, addToState } from '../actions';


describe('actions', (): void => {

  describe('addToState', (): void => {
    const dummyId = 'hijklmnopq';
    const dummyUserID = 'qs1ds3qsz4';

    const expectedAction: t.AddToStateAction = {
      type: t.ADD_TO_STATE,
      payload: {
        id: dummyId,
        userId: dummyUserID,
        rules: {
          [contentItemTypes.HEADING]: {
            color: '#000000',
          },
          [contentItemTypes.PARAGRAPH]: {
            color: '#000000',
          },
        },
      },
    };
    expect(addToState(dummyId, dummyUserID)).toEqual(expectedAction);
  });

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
