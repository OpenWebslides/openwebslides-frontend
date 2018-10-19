// @flow

import rootReducer from 'store/rootReducer';

const initialState = rootReducer(undefined, { type: 'dummy' });

export default initialState;
