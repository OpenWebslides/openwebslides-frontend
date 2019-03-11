// @flow

import apiDeleteToken from './apiDeleteToken';
import apiPatchConfirmation from './apiPatchConfirmation';
import apiPatchPassword from './apiPatchPassword';
import apiPatchToken from './apiPatchToken';
import apiPostConfirmation from './apiPostConfirmation';
import apiPostPassword from './apiPostPassword';
import apiPostToken from './apiPostToken';

const apiSagaActions = {
  apiDeleteToken,
  apiPatchConfirmation,
  apiPatchPassword,
  apiPatchToken,
  apiPostConfirmation,
  apiPostPassword,
  apiPostToken,
};

export default apiSagaActions;
