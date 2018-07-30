// @flow

import _ from 'lodash';

import { InvalidArgumentError, NotYetImplementedError, UnsupportedOperationError } from 'errors';
import validate from 'lib/validate';

import * as a from '../../actionTypes';
import * as m from '../../model';

const editPropsForTypeInState = (
  contentItem: m.ContentItem,
  propsForType: $Shape<m.AllPropsForAllTypes>,
): a.EditPropsForTypeInStateAction => {
  if (!_.includes(m.plainTextContentItemTypes, contentItem.type)) throw new NotYetImplementedError(`ContentItemType not yet supported`);
  if (!_.isEmpty(_.omit(propsForType, m.editablePropsForType[contentItem.type]))) throw new InvalidArgumentError(`"props" object contains invalid props for this contentItem type. Type was: "${contentItem.type}". Invalid props were: "${JSON.stringify(_.omit(propsForType, m.editablePropsForType[contentItem.type]))}"`);

  const validatedPropsForType = validate.actionArguments(
    propsForType,
    m.editablePropsForType[contentItem.type],
    {
      throwOnEmptyString: !contentItem.isEditing,
      throwOnUndefined: false,
      trimString: !contentItem.isEditing,
    },
  );

  const validatedPropsForTypeWithoutUndefined = _.pickBy(
    validatedPropsForType,
    (value: ?string) => (value !== undefined),
  );
  if (_.isEmpty(validatedPropsForTypeWithoutUndefined)) throw new UnsupportedOperationError(`Attempted to create superfluous action. This is probably a developer error.`);

  return {
    type: a.EDIT_PROPS_FOR_TYPE_IN_STATE,
    payload: {
      contentItem,
      propsForType: { ...validatedPropsForType }, // Make a copy to shut up Flow
    },
  };
};

export default editPropsForTypeInState;
