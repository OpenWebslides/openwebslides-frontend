// @flow

import NotYetImplementedError from 'errors/implementation-errors/NotYetImplementedError';

import * as t from '../../actionTypes';

// eslint-disable-next-line require-yield
const moveSaga = function* (action: t.MoveAction): Generator<*, *, *> {
  throw new NotYetImplementedError();
};

export default moveSaga;
