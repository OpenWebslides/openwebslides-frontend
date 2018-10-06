// @flow

import create from './create';
import discard from './discard';
import fetch from './fetch';
import fetchWithContent from './fetchWithContent';
import fork from './fork';
import remove from './remove';
import update from './update';
import updateContent from './updateContent';

const taskSagaActions = {
  create,
  discard,
  fetch,
  fetchWithContent,
  fork,
  remove,
  update,
  updateContent,
};

export default taskSagaActions;
