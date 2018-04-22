// @flow

import * as t from '../actionTypes';
import { editPlainTextInState, editMediaInState } from '../actions';

describe(`actions`, (): void => {

  describe(`editPlainTextInState`, (): void => {

    const dummyId = 'abcdefghij';
    const dummyText = 'Lorem ipsum dolor sit amet.';

    it(`returns a contentItem EDIT_PLAIN_TEXT_IN_STATE action containing the passed props`, (): void => {
      const expectedAction: t.EditPlainTextInStateAction = {
        type: t.EDIT_PLAIN_TEXT_IN_STATE,
        payload: {
          id: dummyId,
          text: dummyText,
        },
      };
      expect(editPlainTextInState(dummyId, dummyText)).toEqual(expectedAction);
    });

    it(`throws an error, when all passed props are undefined`, (): void => {
      expect((): any => editPlainTextInState(dummyId)).toThrowError(`Attempted to create superfluous action.`);
    });

    it(`trims all passed string props, when the passed string props contain unnecessary whitespace`, (): void => {
      const expectedAction: t.EditPlainTextInStateAction = {
        type: t.EDIT_PLAIN_TEXT_IN_STATE,
        payload: {
          id: dummyId,
          text: dummyText,
        },
      };
      expect(editPlainTextInState(dummyId, `   ${dummyText}   `)).toEqual(expectedAction);
    });

    it(`throws an error, when a non-nullable string prop is an empty string`, (): void => {
      expect((): any => editPlainTextInState(dummyId, '   ')).toThrowError(`"text" prop cannot be an empty string.`);
    });

  });

  describe(`editMediaInState`, (): void => {

    const dummyId = 'abcdefghij';
    const dummySrc = 'https//google.com';
    const dummyAlt = 'An alt text';
    const dummyCaption = 'A caption text';

    it(`returns a contentItem EDIT_MEDIA_IN_STATE action containing the passed props`, (): void => {
      const expectedAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: dummyId,
          src: dummySrc,
          alt: dummyAlt,
          caption: dummyCaption,
        },
      };
      expect(editMediaInState(dummyId, dummySrc, dummyAlt, dummyCaption)).toEqual(expectedAction);
    });

    it(`throws an error, when all passed props are undefined`, (): void => {
      expect((): any => editMediaInState(dummyId)).toThrowError(`Attempted to create superfluous action.`);
    });

    it(`trims all passed string props, when the passed string props contain unnecessary whitespace`, (): void => {
      const expectedAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: dummyId,
          src: dummySrc,
          alt: dummyAlt,
          caption: dummyCaption,
        },
      };
      expect(editMediaInState(dummyId, `   ${dummySrc}   `, `   ${dummyAlt}   `, `   ${dummyCaption}   `)).toEqual(expectedAction);
    });

    it(`throws an error, when a non-nullable string prop is an empty string`, (): void => {
      expect((): any => editMediaInState(dummyId, '   ')).toThrowError(`"src" prop cannot be an empty string.`);
      expect((): any => editMediaInState(dummyId, undefined, '   ')).toThrowError(`"alt" prop cannot be an empty string.`);
    });

    it(`converts all nullable string props to NULL, when the prop contains an empty string`, (): void => {
      const expectedAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: dummyId,
          src: dummySrc,
          alt: dummyAlt,
          caption: null,
        },
      };
      expect(editMediaInState(dummyId, dummySrc, dummyAlt, '')).toEqual(expectedAction);
    });

  });

});
