// @flow

import createBrowserHistory from 'history/createBrowserHistory';

import createRootReducer from 'store/createRootReducer';

const history = createBrowserHistory();

const initialState = createRootReducer(history)(undefined, { type: 'dummy' });

export default initialState;
