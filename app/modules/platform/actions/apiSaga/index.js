// @flow

import apiDeleteToken from './apiDeleteToken';
import apiPatchConfirmation from './apiPatchConfirmation';
import apiPatchPassword from './apiPatchPassword';
import apiPostConfirmation from './apiPostConfirmation';
import apiPostPassword from './apiPostPassword';
import apiPostToken from './apiPostToken';

const apiSagaActions = {
  apiDeleteToken,
  apiPatchConfirmation,
  apiPatchPassword,
  apiPostConfirmation,
  apiPostPassword,
  apiPostToken,
};

export default apiSagaActions;
