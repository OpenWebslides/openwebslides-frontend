// @flow

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import UnsupportedOperationError from 'errors/implementation-errors/UnsupportedOperationError';
import validateActionStringArgs from 'lib/validation/action-arguments/string';
import type { Identifier } from 'types/model';
import * as t from '../actionTypes';
import { plainTextContentItemTypes, editablePropsForType } from '../model';
import type { ContentItemType } from '../model';

const editPropsForTypeInState = (
  id: Identifier,
  type: ContentItemType,
  propsForType: t.ActionPayloadPropsForType,
  isEditing: boolean = false,
): t.EditPropsForTypeInStateAction => {
  if (!_.includes(plainTextContentItemTypes, type)) throw new NotYetImplementedError(`ContentItemType not yet supported`);
  if (!_.isEmpty(_.omit(propsForType, editablePropsForType[type]))) throw new InvalidArgumentError(`"props" object contains invalid props for this contentItem type. Type was: "${type}". Invalid props were: "${JSON.stringify(_.omit(propsForType, editablePropsForType[type]))}"`);

  const newId = id;
  const validatedPropsForType = validateActionStringArgs(
    propsForType,
    editablePropsForType[type],
    { throwOnEmpty: !isEditing, throwOnUndefined: false, trim: !isEditing },
  );

  const validatedPropsForTypeWithoutUndefined = _.pickBy(
    validatedPropsForType,
    (value: ?string) => (value !== undefined),
  );
  if (_.isEmpty(validatedPropsForTypeWithoutUndefined)) throw new UnsupportedOperationError(`Attempted to create superfluous action. This is probably a developer error.`);

  return {
    type: t.EDIT_PROPS_FOR_TYPE_IN_STATE,
    payload: {
      id: newId,
      type,
      isEditing,
      propsForType: { ...validatedPropsForType }, // Make a copy to shut up Flow
    },
  };
};

export default editPropsForTypeInState;
