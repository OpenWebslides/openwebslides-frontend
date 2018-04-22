// @flow

import { dummyContentItemsById } from '../dummyData';

import reducer from '../reducer';
import * as t from '../actionTypes';
import { contentItemTypes } from '../model';
import type {
  PlainTextContentItem,
  MediaContentItem,
  ContentItemsState,
} from '../model';
import * as dummyContentItemData from '../lib/test-resources/dummyContentItemData';

describe(`reducer`, (): void => {

  describe(`initial`, (): void => {

    const dummyInitialState: ContentItemsState = {
      byId: dummyContentItemsById,
    };

    it(`returns the initial state, when state parameter is undefined`, (): void => {
      const dummyAction: any = {
        type: 'DUMMY_ACTION',
      };

      expect(reducer(undefined, dummyAction)).toEqual(dummyInitialState);
    });

  });

  describe(`EDIT_PLAIN_TEXT_IN_STATE`, (): void => {

    const dummyPlainTextContentItem: $Exact<PlainTextContentItem> = {
      id: 'abcdefghij',
      type: contentItemTypes.HEADING,
      text: 'Lorem ipsum dolor sit amet',
    };

    it(`changes the plainText contentItem's props, when the passed props are strings`, (): void => {
      const editedText = 'Consectetur adipiscing elit';
      const editedPlainTextContentItem: PlainTextContentItem = {
        ...dummyPlainTextContentItem,
        text: editedText,
      };
      const prevState: ContentItemsState = {
        byId: {
          [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
        },
      };
      const editPlainTextInStateAction: t.EditPlainTextInStateAction = {
        type: t.EDIT_PLAIN_TEXT_IN_STATE,
        payload: {
          id: dummyPlainTextContentItem.id,
          text: editedText,
        },
      };
      const nextState: ContentItemsState = {
        byId: {
          [dummyPlainTextContentItem.id]: editedPlainTextContentItem,
        },
      };
      const resultState = reducer(prevState, editPlainTextInStateAction);

      expect(resultState).toEqual(nextState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.byId).not.toBe(prevState.byId);
      expect(resultState.byId[dummyPlainTextContentItem.id]).not.toBe(prevState.byId[dummyPlainTextContentItem.id]);
    });

    it(`leaves the state unchanged, when all passed props are undefined`, (): void => {
      const prevState: ContentItemsState = {
        byId: {
          [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
        },
      };
      const editPlainTextInStateAction: t.EditPlainTextInStateAction = {
        type: t.EDIT_PLAIN_TEXT_IN_STATE,
        payload: {
          id: dummyPlainTextContentItem.id,
          text: undefined,
        },
      };
      const resultState = reducer(prevState, editPlainTextInStateAction);

      expect(resultState).toBe(prevState);
      expect(resultState.byId).toBe(prevState.byId);
      expect(resultState.byId[dummyPlainTextContentItem.id]).toBe(prevState.byId[dummyPlainTextContentItem.id]);
    });

    it(`throws an error, when the passed text prop is NULL`, (): void => {
      const prevState: ContentItemsState = {
        byId: {
          [dummyPlainTextContentItem.id]: dummyPlainTextContentItem,
        },
      };
      const editPlainTextInStateAction: t.EditPlainTextInStateAction = {
        type: t.EDIT_PLAIN_TEXT_IN_STATE,
        payload: {
          id: dummyPlainTextContentItem.id,
          text: null,
        },
      };
      expect((): any => reducer(prevState, editPlainTextInStateAction)).toThrowError(`"text" prop cannot be NULL.`);
    });

    it(`throws an error, when the contentItem for the passed id cannot be found`, (): void => {
      const prevState: ContentItemsState = {
        byId: {},
      };
      const editPlainTextInStateAction: t.EditPlainTextInStateAction = {
        type: t.EDIT_PLAIN_TEXT_IN_STATE,
        payload: {
          id: 'abcdefghij',
          text: undefined,
        },
      };
      expect((): any => reducer(prevState, editPlainTextInStateAction)).toThrowError(`ContentItem with id "abcdefghij" could not be found.`);
    });

    it(`throws an error, when the contentItem for the passed id is not a plainText contentItem`, (): void => {
      const prevState: ContentItemsState = {
        byId: {
          [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
        },
      };
      const editPlainTextInStateAction: t.EditPlainTextInStateAction = {
        type: t.EDIT_PLAIN_TEXT_IN_STATE,
        payload: {
          id: dummyContentItemData.rootContentItem.id,
          text: undefined,
        },
      };
      expect((): any => reducer(prevState, editPlainTextInStateAction))
        .toThrowError(`ContentItem with id "${dummyContentItemData.rootContentItem.id}" is not a plainText contentItem. Its type is "${dummyContentItemData.rootContentItem.type}".`);
    });

  });

  describe(`EDIT_MEDIA_IN_STATE`, (): void => {

    const dummyMediaContentItem: $Exact<MediaContentItem> = {
      id: 'abcdefghij',
      type: contentItemTypes.IMAGE,
      src: 'https://google.com',
      alt: 'Alt text goes here',
      caption: 'Caption goes here',
    };

    it(`changes the media contentItem's props, when the passed props are strings`, (): void => {
      const editedSrc = 'https://wikipedia.org';
      const editedAlt = 'Edited alt text';
      const editedCaption = 'Edited caption';
      const editedMediaContentItem: MediaContentItem = {
        ...dummyMediaContentItem,
        src: editedSrc,
        alt: editedAlt,
        caption: editedCaption,
      };
      const prevState: ContentItemsState = {
        byId: {
          [dummyMediaContentItem.id]: dummyMediaContentItem,
        },
      };
      const editMediaInStateAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: dummyMediaContentItem.id,
          src: editedSrc,
          alt: editedAlt,
          caption: editedCaption,
        },
      };
      const nextState: ContentItemsState = {
        byId: {
          [dummyMediaContentItem.id]: editedMediaContentItem,
        },
      };
      const resultState = reducer(prevState, editMediaInStateAction);

      expect(resultState).toEqual(nextState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.byId).not.toBe(prevState.byId);
      expect(resultState.byId[dummyMediaContentItem.id]).not.toBe(prevState.byId[dummyMediaContentItem.id]);
    });

    it(`leaves the state unchanged, when all passed props are undefined`, (): void => {
      const prevState: ContentItemsState = {
        byId: {
          [dummyMediaContentItem.id]: dummyMediaContentItem,
        },
      };
      const editMediaInStateAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: dummyMediaContentItem.id,
          src: undefined,
          alt: undefined,
          caption: undefined,
        },
      };
      const resultState = reducer(prevState, editMediaInStateAction);

      expect(resultState).toBe(prevState);
      expect(resultState.byId).toBe(prevState.byId);
      expect(resultState.byId[dummyMediaContentItem.id]).toBe(prevState.byId[dummyMediaContentItem.id]);
    });

    it(`throws an error, when the passed src prop is NULL`, (): void => {
      const prevState: ContentItemsState = {
        byId: {
          [dummyMediaContentItem.id]: dummyMediaContentItem,
        },
      };
      const editMediaInStateAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: dummyMediaContentItem.id,
          src: null,
          alt: undefined,
          caption: undefined,
        },
      };
      expect((): any => reducer(prevState, editMediaInStateAction)).toThrowError(`"src" prop cannot be NULL.`);
    });

    it(`throws an error, when the passed alt prop is NULL`, (): void => {
      const prevState: ContentItemsState = {
        byId: {
          [dummyMediaContentItem.id]: dummyMediaContentItem,
        },
      };
      const editMediaInStateAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: dummyMediaContentItem.id,
          src: undefined,
          alt: null,
          caption: undefined,
        },
      };
      expect((): any => reducer(prevState, editMediaInStateAction)).toThrowError(`"alt" prop cannot be NULL.`);
    });

    it(`changes the media contentItem's caption prop to NULL, when the passed caption prop is NULL`, (): void => {
      const editedMediaContentItem: MediaContentItem = {
        ...dummyMediaContentItem,
        caption: null,
      };
      const prevState: ContentItemsState = {
        byId: {
          [dummyMediaContentItem.id]: dummyMediaContentItem,
        },
      };
      const editMediaInStateAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: dummyMediaContentItem.id,
          src: undefined,
          alt: undefined,
          caption: null,
        },
      };
      const nextState: ContentItemsState = {
        byId: {
          [dummyMediaContentItem.id]: editedMediaContentItem,
        },
      };
      const resultState = reducer(prevState, editMediaInStateAction);

      expect(resultState).toEqual(nextState);
      expect(resultState).not.toBe(prevState);
      expect(resultState.byId).not.toBe(prevState.byId);
      expect(resultState.byId[dummyMediaContentItem.id]).not.toBe(prevState.byId[dummyMediaContentItem.id]);
    });

    it(`throws an error, when the contentItem for the passed id cannot be found`, (): void => {
      const prevState: ContentItemsState = {
        byId: {},
      };
      const editMediaInStateAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: 'abcdefghij',
          src: undefined,
          alt: undefined,
          caption: undefined,
        },
      };
      expect((): any => reducer(prevState, editMediaInStateAction)).toThrowError(`ContentItem with id "abcdefghij" could not be found.`);
    });

    it(`throws an error, when the contentItem for the passed id is not a media contentItem`, (): void => {
      const prevState: ContentItemsState = {
        byId: {
          [dummyContentItemData.rootContentItem.id]: dummyContentItemData.rootContentItem,
        },
      };
      const editMediaInStateAction: t.EditMediaInStateAction = {
        type: t.EDIT_MEDIA_IN_STATE,
        payload: {
          id: dummyContentItemData.rootContentItem.id,
          src: undefined,
          alt: undefined,
          caption: undefined,
        },
      };
      expect((): any => reducer(prevState, editMediaInStateAction))
        .toThrowError(`ContentItem with id "${dummyContentItemData.rootContentItem.id}" is not a media contentItem. Its type is "${dummyContentItemData.rootContentItem.type}".`);
    });

  });

});
