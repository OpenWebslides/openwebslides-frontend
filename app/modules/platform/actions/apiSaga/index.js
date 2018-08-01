// @flow

import apiDeleteToken from './apiDeleteToken';
import apiPostConfirmation from './apiPostConfirmation';
import apiPatchConfirmation from './apiPatchConfirmation';
import apiPostPassword from './apiPostPassword';
import apiPatchPassword from './apiPatchPassword';
import apiPostSigninToTokenAndGetUserAuth from './apiPostSigninToTokenAndGetUserAuth';

const apiSagaActions = {
  apiDeleteToken,
  apiPatchConfirmation,
  apiPatchPassword,
  apiPostConfirmation,
  apiPostPassword,
  apiPostSigninToTokenAndGetUserAuth,
};

export default apiSagaActions;
