// @flow

import add from './add';
import edit from './edit';
import get from './get';
import getAllByUserId from './getAllByUserId';
import load from './load';
import remove from './remove';
import save from './save';

const taskSagaActions = {
  add,
  edit,
  get,
  getAllByUserId,
  load,
  remove,
  save,
};

export default taskSagaActions;
