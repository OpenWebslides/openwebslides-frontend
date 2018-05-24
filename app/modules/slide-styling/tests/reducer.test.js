// @flow

import { contentItemTypes } from 'modules/content-items';
import { dummySlideStylingById } from '../dummyData';

import reducer from '../reducer';
import * as t from '../actionTypes';
import type { SlideStyling, SlideStylingState } from '../model';


describe('reducer', (): void => {
  const dummySlideStyling: $Exact<SlideStyling> = {
    id: 'abcdefghij',
    userId: 'asdfrqSfgd',
    rules: {
      [contentItemTypes.HEADING]: {
        color: '#000000',
        font: 'Verdana',
      },
    },
  };
  describe('initial', (): void => {
    const dummyInitialState: SlideStylingState = {
      byId: dummySlideStylingById,
    };

    it('returns the initial state, when state parameter is undefined', (): void => {
      const dummyAction: any = {
        type: 'DUMMY_ACTION',
      };

      expect(reducer(undefined, dummyAction)).toEqual(dummyInitialState);
    });
  });

  describe('ADD_TO_STATE action', (): void => {
    it(`handles slideStyling ADD_TO_STATE action`, (): void => {
      const prevState: SlideStylingState = {
        byId: {
          [dummySlideStyling.id]: dummySlideStyling,
        },
      };
      const dummyId = 'abcdefghij';
      const dummyUserId = 'asdfrqSfgd';
      const addToStateAction: t.AddToStateAction = {
        type: t.ADD_TO_STATE,
        payload: {
          id: dummyId,
          userId: dummyUserId,
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
      const nextState: SlideStylingState = {
        byId: {
          [dummySlideStyling.id]: dummySlideStyling,
          abcdefghij: {
            id: dummyId,
            userId: dummyUserId,
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
        },
      };
      expect(reducer(prevState, addToStateAction)).toEqual(nextState);
    });
  });


  describe('EDIT_CONTENTTYPE_COLOR_IN_STATE', (): void => {


    it('changes the color of a contentItemType, when the passed color is valid', (): void => {
      const editedColor = '#134678';
      const editedContentItem = contentItemTypes.PARAGRAPH;
      /* const editedSlideStyling: SlideStyling = {
        ...dummySlideStyling,
        rules: {
          [editedContentItem]: { color: editedColor },
        },
      }; */
      const prevState: SlideStylingState = {
        byId: {
          [dummySlideStyling.id]: dummySlideStyling,
        },
      };
      const editContentTypeColorInStateAction: t.EditContentTypeColorAction = {
        type: t.EDIT_CONTENTTYPE_COLOR_IN_STATE,
        payload: {
          id: dummySlideStyling.id,
          contentItemType: editedContentItem,
          newColor: editedColor,
          font: 'Verdana',
        },
      };
      const nextState: SlideStylingState = {
        byId: {
          [dummySlideStyling.id]: {
            id: dummySlideStyling.id,
            userId: 'asdfrqSfgd',
            rules: {
              [contentItemTypes.HEADING]: { color: '#000000', font: 'Verdana' },
              [contentItemTypes.PARAGRAPH]: { color: '#134678', font: 'Verdana' },
            },
          },
        },
      };
      const resultState = reducer(prevState, editContentTypeColorInStateAction);

      expect(resultState).toEqual(nextState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.byId).not.toBe(prevState.byId);
      expect(resultState.byId[dummySlideStyling.id]).not.toBe(prevState.byId[dummySlideStyling.id]);
    });

    it(`throws an error, when the slideStyling for the passed id cannot be found`, (): void => {
      const prevState: SlideStylingState = {
        byId: {},
      };
      const editContentTypeColorInStateAction: t.EditContentTypeColorAction = {
        type: t.EDIT_CONTENTTYPE_COLOR_IN_STATE,
        payload: {
          id: 'zdq3dz5e67',
          contentItemType: contentItemTypes.HEADING,
          newColor: '#124796',
          font: 'Verdana',
        },
      };
      expect((): any => reducer(prevState, editContentTypeColorInStateAction)).toThrowError('ContentItem with id "zdq3dz5e67" could not be found.');
    });
  });

  describe('EDIT_FONT_IN_STATE', (): void => {


    it('changes the font of the contentItemTypes, when the passed font is valid', (): void => {
      const editedFont = 'Ariel';
      const prevState: SlideStylingState = {
        byId: {
          [dummySlideStyling.id]: dummySlideStyling,
        },
      };
      const editFontInStateAction: t.EditFontAction = {
        type: t.EDIT_FONT_IN_STATE,
        payload: {
          id: dummySlideStyling.id,
          newFont: editedFont,
          colorHeading: '#000000',
          colorParagraph: '#000000',
        },
      };
      const nextState: SlideStylingState = {
        byId: {
          [dummySlideStyling.id]: {
            id: dummySlideStyling.id,
            userId: 'asdfrqSfgd',
            rules: {
              [contentItemTypes.HEADING]: { color: '#000000', font: 'Ariel' },
              [contentItemTypes.PARAGRAPH]: { color: '#000000', font: 'Ariel' },
            },
          },
        },
      };
      const resultState = reducer(prevState, editFontInStateAction);

      expect(resultState).toEqual(nextState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.byId).not.toBe(prevState.byId);
      expect(resultState.byId[dummySlideStyling.id]).not.toBe(prevState.byId[dummySlideStyling.id]);
    });

    it(`throws an error, when the slideStyling for the passed id cannot be found`, (): void => {
      const prevState: SlideStylingState = {
        byId: {},
      };
      const editFontInStateAction: t.EditFontAction = {
        type: t.EDIT_FONT_IN_STATE,
        payload: {
          id: 'zdq3dz5e67',
          newFont: 'Verdana',
          colorHeading: '#000000',
          colorParagraph: '#000000',
        },
      };
      expect((): any => reducer(prevState, editFontInStateAction)).toThrowError('ContentItem with id "zdq3dz5e67" could not be found.');
    });
  });
});
