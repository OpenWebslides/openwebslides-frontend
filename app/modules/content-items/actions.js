// @flow

import _ from 'lodash';

import type { Identifier } from 'types/model';

import * as t from './actionTypes';
import { plainTextContentItemTypes } from './model';
import type { ContentItemType } from './model';

export const addToState = (
  id: Identifier,
  type: ContentItemType,
  props: t.ActionPayloadProps,
): t.AddToStateAction => {
  const newId = id;
  const newProps: t.ActionPayloadProps = {};

  if (_.includes(plainTextContentItemTypes, type)) {
    if (props.text == null) {
      throw new Error(`"text" prop must be defined.`);
    }

    const newText = _.trim(props.text);

    if (newText === '') {
      throw new Error(`"text" prop cannot be an empty string.`);
    }

    newProps.text = newText;
  }
  else {
    throw new Error(`contentItemType not yet supported`);
  }

  return {
    type: t.ADD_TO_STATE,
    payload: {
      id: newId,
      type,
      props: newProps,
    },
  };
};

export const editInState = (
  id: Identifier,
  type: ContentItemType,
  props: t.ActionPayloadProps,
): t.EditInStateAction => {
  const newId = id;
  let propsToProcess: t.ActionPayloadProps = { ...props };
  const newProps: t.ActionPayloadProps = {};

  if (_.includes(plainTextContentItemTypes, type)) {
    if (props.text != null) {
      const newText = _.trim(props.text);

      if (newText === '') {
        throw new Error(`"text" prop cannot be an empty string.`);
      }

      newProps.text = newText;
    }
    propsToProcess = _.omit(propsToProcess, 'text');
  }
  // #TODO other contentItemTypes

  if (!_.isEmpty(propsToProcess)) {
    throw new Error(`"props" object contains invalid props for this contentItem type. Type was: "${type}". Invalid props were: "${JSON.stringify(propsToProcess)}"`);
  }

  if (_.isEmpty(newProps)) {
    throw new Error(`Attempted to create superfluous action. This is probably a developer error.`);
  }

  return {
    type: t.EDIT_IN_STATE,
    payload: {
      id: newId,
      type,
      props: newProps,
    },
  };
};

export const add = (
  type: ContentItemType,
  props: t.ActionPayloadProps,
): t.AddAction => {
  return {
    type: t.ADD,
    payload: {
      type,
      props,
    },
  };
};

export const edit = (
  id: Identifier,
  type: ContentItemType,
  props: t.ActionPayloadProps,
): t.EditAction => {
  return {
    type: t.EDIT,
    payload: {
      id,
      type,
      props,
    },
  };
};
