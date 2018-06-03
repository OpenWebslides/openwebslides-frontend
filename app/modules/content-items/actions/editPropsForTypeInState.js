// @flow

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';
import validateActionStringArgs from 'lib/validation/action-arguments/string';
import * as t from '../actionTypes';
import { plainTextContentItemTypes, editablePropsForType } from '../model';
import type { ContentItem } from '../model';

const editPropsForTypeInState = (
  contentItem: ContentItem,
  propsForType: t.ActionPayloadPropsForType,
): t.EditPropsForTypeInStateAction => {
  if (!_.includes(plainTextContentItemTypes, contentItem.type)) throw new NotYetImplementedError(`ContentItemType not yet supported`);
  if (!_.isEmpty(_.omit(propsForType, editablePropsForType[contentItem.type]))) throw new InvalidArgumentError(`"props" object contains invalid props for this contentItem type. Type was: "${contentItem.type}". Invalid props were: "${JSON.stringify(_.omit(propsForType, editablePropsForType[contentItem.type]))}"`);

  const validatedPropsForType = validateActionStringArgs(
    propsForType,
    editablePropsForType[contentItem.type],
    { throwOnEmpty: !contentItem.isEditing, throwOnUndefined: false, trim: !contentItem.isEditing },
  );

  const validatedPropsForTypeWithoutUndefined = _.pickBy(
    validatedPropsForType,
    (value: ?string) => (value !== undefined),
  );
  if (_.isEmpty(validatedPropsForTypeWithoutUndefined)) throw new UnsupportedOperationError(`Attempted to create superfluous action. This is probably a developer error.`);

  return {
    type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
    payload: {
      contentItem,
      propsForType: { ...validatedPropsForType }, // Make a copy to shut up Flow
    },
  };
};

export default editPropsForTypeInState;
