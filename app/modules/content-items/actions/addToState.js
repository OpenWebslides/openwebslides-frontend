// @flow

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import validateActionStringArgs from 'lib/validation/action-arguments/string';
import type { Identifier } from 'types/model';
import * as t from '../actionTypes';
import { plainTextContentItemTypes } from '../model';
import type { ContentItemType } from '../model';

const validPropsForPlainTextTypes = [
  'text',
];

const addToState = (
  id: Identifier,
  type: ContentItemType,
  propsForType: t.ActionPayloadPropsForType,
): t.AddToStateAction => {
  const newId = id;
  let unprocessedPropsForType: t.ActionPayloadPropsForType = { ...propsForType };
  let newPropsForType: t.ActionPayloadPropsForType = {};

  if (_.includes(plainTextContentItemTypes, type)) {
    const validatedPlainTextStringArgs = validateActionStringArgs(
      propsForType,
      validPropsForPlainTextTypes,
      { throwOnEmpty: true, throwOnUndefined: true, trim: true },
    );
    newPropsForType = { ...newPropsForType, ...validatedPlainTextStringArgs };
    unprocessedPropsForType = _.omit(unprocessedPropsForType, validPropsForPlainTextTypes);
  }
  else {
    throw new NotYetImplementedError(`ContentItemType not yet supported`);
  }

  if (!_.isEmpty(unprocessedPropsForType)) {
    throw new InvalidArgumentError(`"props" object contains invalid props for this contentItem type. Type was: "${type}". Invalid props were: "${JSON.stringify(unprocessedPropsForType)}"`);
  }

  return {
    type: t.ADD_TO_STATE,
    payload: {
      id: newId,
      type,
      propsForType: newPropsForType,
    },
  };
};

export default addToState;
