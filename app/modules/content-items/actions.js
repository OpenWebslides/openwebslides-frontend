// @flow

import _ from 'lodash';

import type { Identifier } from 'types/model';

import * as t from './actionTypes';
import { generateId } from './model';

export const add = (

): t.AddAction => {
  const newId = generateId();

  // #TODO stub

  return {
    type: t.ADD,
    payload: {
      id: newId,
    },
  };
};

export const editPlainText = (
  id: Identifier,
  text: ?string,
): t.EditPlainTextAction => {
  const newId = id;
  const newText = text != null ? _.trim(text) : text;

  if (newText === undefined) {
    throw new Error(`Attempted to create superfluous action.`);
  }
  if (newText === '') {
    throw new Error(`"text" prop cannot be an empty string.`);
  }

  return {
    type: t.EDIT_PLAIN_TEXT,
    payload: {
      id: newId,
      text: newText,
    },
  };
};

export const editMedia = (
  id: Identifier,
  src: ?string,
  alt: ?string,
  caption: ?string,
): t.EditMediaAction => {
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
    type: t.EDIT_MEDIA,
    payload: {
      id: newId,
      src: newSrc,
      alt: newAlt,
      caption: newCaption,
    },
  };
};

export const remove = (
  id: Identifier,
): t.RemoveAction => {
  return {
    type: t.REMOVE,
    payload: {
      id,
    },
  };
};

export const updatePlainText = (
  id: Identifier,
  text: ?string,
): t.UpdatePlainTextAction => {
  return {
    type: t.UPDATE_PLAIN_TEXT,
    payload: {
      id,
      text,
    },
  };
};

export const updateMedia = (
  id: Identifier,
  src: ?string,
  alt: ?string,
  caption: ?string,
): t.UpdateMediaAction => {
  return {
    type: t.UPDATE_MEDIA,
    payload: {
      id,
      src,
      alt,
      caption,
    },
  };
};
