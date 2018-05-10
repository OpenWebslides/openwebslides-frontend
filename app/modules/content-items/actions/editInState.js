// @flow

import _ from 'lodash';
import type { Identifier } from 'types/model';
import * as t from '../actionTypes';
import { plainTextContentItemTypes } from '../model';
import type { ContentItemType } from '../model';

const editInState = (
  id: Identifier,
  type: ContentItemType,
  props: t.ActionPayloadProps,
): t.EditInStateAction => {
  const newId = id;
  let propsToProcess: t.ActionPayloadProps = { ...props };
  const newProps: t.ActionPayloadProps = {};

  if (_.includes(plainTextContentItemTypes, type)) {
    if (props.text != null) {
      const newText = _.trim(props.text);

      if (newText === '') {
        throw new Error(`"text" prop cannot be an empty string.`);
      }

      newProps.text = newText;
    }
    propsToProcess = _.omit(propsToProcess, 'text');
  }
  // #TODO other contentItemTypes

  if (!_.isEmpty(propsToProcess)) {
    throw new Error(`"props" object contains invalid props for this contentItem type. Type was: "${type}". Invalid props were: "${JSON.stringify(propsToProcess)}"`);
  }

  if (_.isEmpty(newProps)) {
    throw new Error(`Attempted to create superfluous action. This is probably a developer error.`);
  }

  return {
    type: t.EDIT_IN_STATE,
    payload: {
      id: newId,
      type,
      props: newProps,
    },
  };
};

export default editInState;
