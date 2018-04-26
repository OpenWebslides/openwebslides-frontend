// @flow

import * as t from '../actionTypes';
import {
  addToState,
  editPlainTextInState,
  editMediaInState,
  add,
  editPlainText,
  editMedia,
} from '../actions';
import { contentItemTypes } from '../model';

describe(`actions`, (): void => {

  describe(`addToState`, (): void => {

    const dummyId = 'abcdefghij';
    const dummyPlainTextType = contentItemTypes.HEADING;
    const dummyPlainTextProps = {
      text: 'Lorem ipsum dolor sit amet.',
    };

    it(`returns a contentItem ADD_TO_STATE action containing the passed props`, (): void => {
      const expectedAction: t.AddToStateAction = {
        type: t.ADD_TO_STATE,
        payload: {
          id: dummyId,
          type: dummyPlainTextType,
          props: dummyPlainTextProps,
        },
      };
      expect(addToState(dummyId, dummyPlainTextType, dummyPlainTextProps)).toEqual(expectedAction);
    });

    it(`throws an error, when the passed type is a plainText type and the passed props don't match this type`, (): void => {
      expect((): any => addToState(
        dummyId,
        dummyPlainTextType,
        {
          definitelyNotAPlainTextProp: 'abcde',
        },
      )).toThrowError(`"text" prop must be defined.`);
    });

    it(`trims all passed plainText string props, when the passed string props contain unnecessary whitespace`, (): void => {
      const expectedAction: t.AddToStateAction = {
        type: t.ADD_TO_STATE,
        payload: {
          id: dummyId,
          type: dummyPlainTextType,
          props: dummyPlainTextProps,
        },
      };
      expect(addToState(
        dummyId,
        dummyPlainTextType,
        {
          text: `   ${dummyPlainTextProps.text}   `,
        },
      )).toEqual(expectedAction);
    });

    it(`throws an error, when a non-nullable plainText string prop is an empty string`, (): void => {
      expect((): any => addToState(
        dummyId,
        dummyPlainTextType,
        {
          text: '   ',
        },
      )).toThrowError(`"text" prop cannot be an empty string.`);
    });

  });

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
      expect(editMediaInState(dummyId, dummySrc, dummyAlt, '   ')).toEqual(expectedAction);
    });

  });

  describe(`add`, (): void => {

    const dummyType = contentItemTypes.HEADING;
    const dummyProps = {
      text: 'Lorem ipsum dolor sit amet.',
    };

    it(`returns a contentItem ADD action containing the passed props`, (): void => {
      const expectedAction: t.AddAction = {
        type: t.ADD,
        payload: {
          type: dummyType,
          props: dummyProps,
        },
      };
      expect(add(dummyType, dummyProps)).toEqual(expectedAction);
    });

  });

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

  });

});
