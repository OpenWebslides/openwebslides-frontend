// @flow

import _ from 'lodash';

import { InvalidArgumentError, NotYetImplementedError } from 'errors';
import validate from 'lib/validate';

import * as a from '../../actionTypes';
import * as m from '../../model';

const addToState = (
  id: string,
  type: m.ContentItemType,
  context: ?m.SuperContext,
  propsForType: $Shape<m.AllPropsForAllTypes>,
): a.AddToStateAction => {
  if (!(_.includes(m.plainTextContentItemTypes, type) || type === m.contentItemTypes.ROOT)) throw new NotYetImplementedError(`ContentItemType not yet supported`);
  if (!_.isEmpty(_.omit(propsForType, m.editablePropsForType[type]))) throw new InvalidArgumentError(`"props" object contains invalid props for this contentItem type. Type was: "${type}". Invalid props were: "${JSON.stringify(_.omit(propsForType, m.editablePropsForType[type]))}"`);

  const validatedPropsForType = validate.actionArguments(
    propsForType,
    m.editablePropsForType[type],
    {
      throwOnEmptyString: false,
      throwOnUndefined: true,
      trimString: true,
    },
  );

  return {
    type: a.ADD_TO_STATE,
    payload: {
      id,
      type,
      context,
      propsForType: { ...validatedPropsForType }, // Make a copy to shut up Flow
    },
  };
};

export default addToState;
