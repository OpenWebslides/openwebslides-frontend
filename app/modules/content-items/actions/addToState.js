// @flow

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import validateActionArguments from 'lib/validate/actionArguments';
import type { Identifier } from 'types/model';
import * as t from '../actionTypes';
import {
  contentItemTypes,
  plainTextContentItemTypes,
} from '../model';
import type { ContentItemType } from '../model';

const validPropsForPlainTextTypes = [
  'text',
];

const addToState = (
  id: Identifier,
  type: ContentItemType,
  context: ?t.ActionPayloadReducerContext,
  propsForType: t.ActionPayloadPropsForType,
): t.AddToStateAction => {
  const newId = id;
  let unprocessedPropsForType: t.ActionPayloadPropsForType = { ...propsForType };
  let newPropsForType: t.ActionPayloadPropsForType = {};

  if (_.includes(plainTextContentItemTypes, type)) {
    const validatedPlainTextStringArgs = validateActionArguments(
      propsForType,
      validPropsForPlainTextTypes,
      {
        throwOnEmptyString: false,
        throwOnUndefined: true,
        trimString: true,
      },
    );
    newPropsForType = { ...newPropsForType, ...validatedPlainTextStringArgs };
    unprocessedPropsForType = _.omit(unprocessedPropsForType, validPropsForPlainTextTypes);
  }
  else if (type === contentItemTypes.ROOT) {
    // ROOT doesn't have any propsForType to validate
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
      context,
      propsForType: newPropsForType,
    },
  };
};

export default addToState;
