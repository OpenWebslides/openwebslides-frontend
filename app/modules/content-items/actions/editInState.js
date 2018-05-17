// @flow

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';
import validateActionStringArgs from 'lib/validation/action-arguments/string';
import type { Identifier } from 'types/model';
import * as t from '../actionTypes';
import { plainTextContentItemTypes } from '../model';
import type { ContentItemType } from '../model';

const validPropsForPlainTextTypes = [
  'text',
];

const editInState = (
  id: Identifier,
  type: ContentItemType,
  propsForType: t.ActionPayloadPropsForType,
): t.EditInStateAction => {
  const newId = id;
  let unprocessedPropsForType: t.ActionPayloadPropsForType = { ...propsForType };
  let newPropsForType: t.ActionPayloadPropsForType = {};

  if (_.includes(plainTextContentItemTypes, type)) {
    const validatedPlainTextStringArgs = validateActionStringArgs(
      propsForType,
      validPropsForPlainTextTypes,
      { throwOnEmpty: true, throwOnUndefined: false, trim: false },
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

  const newPropsForTypeWithoutUndefined = _.pickBy(
    newPropsForType,
    (value: ?string) => (value !== undefined),
  );

  if (_.isEmpty(newPropsForTypeWithoutUndefined)) {
    throw new UnsupportedOperationError(`Attempted to create superfluous action. This is probably a developer error.`);
  }

  return {
    type: t.EDIT_IN_STATE,
    payload: {
      id: newId,
      type,
      propsForType: newPropsForType,
    },
  };
};

export default editInState;
