// @flow

import * as t from '../actionTypes';
import { editPlainText, editMedia } from '../actions';

describe(`actions`, (): void => {

  describe(`editPlainText`, (): void => {

    const dummyId = 'abcdefghij';
    const dummyText = 'Lorem ipsum dolor sit amet.';

    it(`returns a contentItem EDIT_PLAIN_TEXT action containing the passed props`, (): void => {
      const expectedAction: t.EditPlainTextAction = {
        type: t.EDIT_PLAIN_TEXT,
        payload: {
          id: dummyId,
          text: dummyText,
        },
      };
      expect(editPlainText(dummyId, dummyText)).toEqual(expectedAction);
    });

    it(`throws an error, when all passed props are undefined`, (): void => {
      expect((): any => editPlainText(dummyId)).toThrowError(`Attempted to create superfluous action.`);
    });

    it(`trims all passed string props, when the passed string props contain unnecessary whitespace`, (): void => {
      const expectedAction: t.EditPlainTextAction = {
        type: t.EDIT_PLAIN_TEXT,
        payload: {
          id: dummyId,
          text: dummyText,
        },
      };
      expect(editPlainText(dummyId, `   ${dummyText}   `)).toEqual(expectedAction);
    });

    it(`throws an error, when a non-nullable string prop is an empty string`, (): void => {
      expect((): any => editPlainText(dummyId, '   ')).toThrowError(`"text" prop cannot be an empty string.`);
    });

  });

  describe(`editMedia`, (): void => {

    const dummyId = 'abcdefghij';
    const dummySrc = 'https//google.com';
    const dummyAlt = 'An alt text';
    const dummyCaption = 'A caption text';

    it(`returns a contentItem EDIT_MEDIA action containing the passed props`, (): void => {
      const expectedAction: t.EditMediaAction = {
        type: t.EDIT_MEDIA,
        payload: {
          id: dummyId,
          src: dummySrc,
          alt: dummyAlt,
          caption: dummyCaption,
        },
      };
      expect(editMedia(dummyId, dummySrc, dummyAlt, dummyCaption)).toEqual(expectedAction);
    });

    it(`throws an error, when all passed props are undefined`, (): void => {
      expect((): any => editMedia(dummyId)).toThrowError(`Attempted to create superfluous action.`);
    });

    it(`trims all passed string props, when the passed string props contain unnecessary whitespace`, (): void => {
      const expectedAction: t.EditMediaAction = {
        type: t.EDIT_MEDIA,
        payload: {
          id: dummyId,
          src: dummySrc,
          alt: dummyAlt,
          caption: dummyCaption,
        },
      };
      expect(editMedia(dummyId, `   ${dummySrc}   `, `   ${dummyAlt}   `, `   ${dummyCaption}   `)).toEqual(expectedAction);
    });

    it(`throws an error, when a non-nullable string prop is an empty string`, (): void => {
      expect((): any => editMedia(dummyId, '   ')).toThrowError(`"src" prop cannot be an empty string.`);
      expect((): any => editMedia(dummyId, undefined, '   ')).toThrowError(`"alt" prop cannot be an empty string.`);
    });

    it(`converts all nullable string props to NULL, when the prop contains an empty string`, (): void => {
      const expectedAction: t.EditMediaAction = {
        type: t.EDIT_MEDIA,
        payload: {
          id: dummyId,
          src: dummySrc,
          alt: dummyAlt,
          caption: null,
        },
      };
      expect(editMedia(dummyId, dummySrc, dummyAlt, '')).toEqual(expectedAction);
    });

  });

});
