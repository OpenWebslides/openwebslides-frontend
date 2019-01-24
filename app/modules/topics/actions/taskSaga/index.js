// @flow

import create from './create';
import discard from './discard';
import fetch from './fetch';
import fetchWithContent from './fetchWithContent';
import fork from './fork';
import patchWithContent from './patchWithContent';
import remove from './remove';
import update from './update';

const taskSagaActions = {
  create,
  discard,
  fetch,
  fetchWithContent,
  fork,
  patchWithContent,
  remove,
  update,
};

export default taskSagaActions;
