// @flow

import { contentItemTypes } from 'modules/content-items';
import * as t from '../actionTypes';
import { editContentTypeColorInState, addToState, editFontInState } from '../actions';


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
            font: 'Verdana',
          },
          [contentItemTypes.PARAGRAPH]: {
            color: '#000000',
            font: 'Verdana',
          },
        },
      },
    };
    expect(addToState(dummyId, dummyUserID))
      .toEqual(expectedAction);
  });

  describe('editContentTypeColorInState', (): void => {
    const dummyId = 'hijklmnopq';
    const dummyColor = '#564894';
    const dummyContentItemType = contentItemTypes.HEADING;
    const dummyFont = 'Verdana';

    it('returns a slideStyling EDIT_CONTENTTYPE_COLOR_IN_STATE action containing the passed props', (): void => {
      const expectedAction: t.EditContentTypeColorAction = {
        type: t.EDIT_CONTENTTYPE_COLOR_IN_STATE,
        payload: {
          id: dummyId,
          contentItemType: dummyContentItemType,
          newColor: dummyColor,
          font: dummyFont,
        },
      };
      expect(editContentTypeColorInState(dummyId, dummyContentItemType, dummyColor, dummyFont))
        .toEqual(expectedAction);
    });
  });
  describe('editFontInState', (): void => {
    const dummyId = 'hijklmnopq';
    const dummyColorHeading = '#564894';
    const dummyColorParagraph = '#000000';
    const dummyFont = 'Times New Roman';

    it('returns a slideStyling EDIT_CONTENTTYPE_COLOR_IN_STATE action containing the passed props', (): void => {
      const expectedAction: t.EditFontAction = {
        type: t.EDIT_FONT_IN_STATE,
        payload: {
          id: dummyId,
          newFont: dummyFont,
          colorHeading: dummyColorHeading,
          colorParagraph: dummyColorParagraph,
        },
      };
      expect(editFontInState(dummyId, dummyFont, dummyColorHeading, dummyColorParagraph))
        .toEqual(expectedAction);
    });

  });
});
