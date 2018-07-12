// @flow

import _ from 'lodash';

import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import validate from 'lib/validate';
import type { Identifier } from 'types/model';

import * as t from '../actionTypes';
import { contentItemTypes, plainTextContentItemTypes, editablePropsForType } from '../model';
import type { ContentItemType, AllPropsForAllTypes, VerticalContext } from '../model';

const addToState = (
  id: Identifier,
  type: ContentItemType,
  context: ?VerticalContext,
  propsForType: $Shape<AllPropsForAllTypes>,
): t.AddToStateAction => {
  if (!(_.includes(plainTextContentItemTypes, type) || type === contentItemTypes.ROOT)) throw new NotYetImplementedError(`ContentItemType not yet supported`);
  if (!_.isEmpty(_.omit(propsForType, editablePropsForType[type]))) throw new InvalidArgumentError(`"props" object contains invalid props for this contentItem type. Type was: "${type}". Invalid props were: "${JSON.stringify(_.omit(propsForType, editablePropsForType[type]))}"`);

  const validatedPropsForType = validate.actionArguments(
    propsForType,
    editablePropsForType[type],
    {
      throwOnEmptyString: false,
      throwOnUndefined: true,
      trimString: true,
    },
  );

  return {
    type: t.ADD_TO_STATE,
    payload: {
      id,
      type,
      context,
      propsForType: { ...validatedPropsForType }, // Make a copy to shut up Flow
    },
  };
};

export default addToState;
