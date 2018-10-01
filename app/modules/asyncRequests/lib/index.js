// @flow

import generateId from './generateId';
import putAndGetId from './putAndGetId';
import putAndReturn from './putAndReturn';
import takeByIdAndStatusType from './takeByIdAndStatusType';
import takeFailureById from './takeFailureById';
import takeSuccessById from './takeSuccessById';
import sagaWrapper from './sagaWrapper';

const lib = {
  generateId,
  putAndGetId,
  putAndReturn,
  takeByIdAndStatusType,
  takeFailureById,
  takeSuccessById,
  sagaWrapper,
};

export default lib;
