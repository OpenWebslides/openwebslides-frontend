// @flow

import create from './create';
import edit from './edit';
import fetch from './fetch';
import load from './load';
import remove from './remove';
import save from './save';

const taskSagaActions = {
  create,
  edit,
  fetch,
  load,
  remove,
  save,
};

export default taskSagaActions;
