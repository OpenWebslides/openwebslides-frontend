// @flow

import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../../actionTypes';

// eslint-disable-next-line require-yield
const removeSaga = function* (action: t.RemoveAction): Generator<*, *, *> {
  throw new NotYetImplementedError();
};

export default removeSaga;
