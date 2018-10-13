// @flow

import create from './create';
import discard from './discard';
import fetch from './fetch';
import fetchWithContent from './fetchWithContent';
import fork from './fork';
import remove from './remove';
import updateWithContent from './updateWithContent';

const taskSagaActions = {
  create,
  discard,
  fetch,
  fetchWithContent,
  fork,
  remove,
  updateWithContent,
};

export default taskSagaActions;
