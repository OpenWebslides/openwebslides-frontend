// @flow

import apiDeleteToken from './apiDeleteToken';
import apiPatchConfirmation from './apiPatchConfirmation';
import apiPatchPassword from './apiPatchPassword';
import apiPostConfirmation from './apiPostConfirmation';
import apiPostPassword from './apiPostPassword';
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
