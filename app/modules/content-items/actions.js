// @flow

import _ from 'lodash';

import type { Identifier } from 'types/model';

import * as t from './actionTypes';

export const editPlainTextInState = (
  id: Identifier,
  text: ?string,
): t.EditPlainTextInStateAction => {
  const newId = id;
  const newText = text != null ? _.trim(text) : text;

  if (newText === undefined) {
    throw new Error(`Attempted to create superfluous action.`);
  }
  if (newText === '') {
    throw new Error(`"text" prop cannot be an empty string.`);
  }

  return {
    type: t.EDIT_PLAIN_TEXT_IN_STATE,
    payload: {
      id: newId,
      text: newText,
    },
  };
};

export const editMediaInState = (
  id: Identifier,
  src: ?string,
  alt: ?string,
  caption: ?string,
): t.EditMediaInStateAction => {
  const newId = id;
  const newSrc = src != null ? _.trim(src) : src;
  const newAlt = alt != null ? _.trim(alt) : alt;
  let newCaption: ?string = caption != null ? _.trim(caption) : caption;

  if (newSrc === undefined && newAlt === undefined && newCaption === undefined) {
    throw new Error(`Attempted to create superfluous action.`);
  }
  if (newSrc === '') {
    throw new Error(`"src" prop cannot be an empty string.`);
  }
  if (newAlt === '') {
    throw new Error(`"alt" prop cannot be an empty string.`);
  }
  if (newCaption === '') {
    newCaption = null;
  }

  return {
    type: t.EDIT_MEDIA_IN_STATE,
    payload: {
      id: newId,
      src: newSrc,
      alt: newAlt,
      caption: newCaption,
    },
  };
};

export const editPlainText = (
  id: Identifier,
  text: ?string,
): t.EditPlainTextAction => {
  return {
    type: t.EDIT_PLAIN_TEXT,
    payload: {
      id,
      text,
    },
  };
};

export const editMedia = (
  id: Identifier,
  src: ?string,
  alt: ?string,
  caption: ?string,
): t.EditMediaAction => {
  return {
    type: t.EDIT_MEDIA,
    payload: {
      id,
      src,
      alt,
      caption,
    },
  };
};
