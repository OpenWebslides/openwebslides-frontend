// @flow

import _ from 'lodash';
import InvalidArgumentError from 'errors/implementation-errors/InvalidArgumentError';
import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';
import type { Identifier } from 'types/model';
import * as t from '../actionTypes';
import { plainTextContentItemTypes } from '../model';
import type { ContentItemType } from '../model';

const addToState = (
  id: Identifier,
  type: ContentItemType,
  props: t.ActionPayloadProps,
): t.AddToStateAction => {
  const newId = id;
  const newProps: t.ActionPayloadProps = {};

  if (_.includes(plainTextContentItemTypes, type)) {
    if (props.text == null) {
      throw new InvalidArgumentError(`"text" prop must be defined.`);
    }

    const newText = _.trim(props.text);

    if (newText === '') {
      throw new InvalidArgumentError(`"text" prop cannot be an empty string.`);
    }

    newProps.text = newText;
  }
  else {
    throw new NotYetImplementedError(`ContentItemType not yet supported`);
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

export default addToState;
