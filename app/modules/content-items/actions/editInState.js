// @flow

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';
import type { Identifier } from 'types/model';
import * as t from '../actionTypes';
import { plainTextContentItemTypes } from '../model';
import type { ContentItemType } from '../model';

const editInState = (
  id: Identifier,
  type: ContentItemType,
  propsForType: t.ActionPayloadPropsForType,
): t.EditInStateAction => {
  const newId = id;
  let unprocessedPropsForType: t.ActionPayloadPropsForType = { ...propsForType };
  const newPropsForType: t.ActionPayloadPropsForType = {};

  if (_.includes(plainTextContentItemTypes, type)) {
    if (propsForType.text != null) {
      const newText = _.trim(propsForType.text);

      if (newText === '') {
        throw new InvalidArgumentError(`"text" prop cannot be an empty string.`);
      }

      newPropsForType.text = newText;
    }
    unprocessedPropsForType = _.omit(unprocessedPropsForType, 'text');
  }
  else {
    throw new NotYetImplementedError(`ContentItemType not yet supported`);
  }

  if (!_.isEmpty(unprocessedPropsForType)) {
    throw new InvalidArgumentError(`"props" object contains invalid props for this contentItem type. Type was: "${type}". Invalid props were: "${JSON.stringify(unprocessedPropsForType)}"`);
  }

  if (_.isEmpty(newPropsForType)) {
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
