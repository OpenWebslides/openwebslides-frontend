// @flow

import { takeLatest } from 'redux-saga/effects';

import { fetch } from './sagaHelpers';
import { FETCH_FEED } from './actionTypes';

const sagas = [
  takeLatest(FETCH_FEED, fetch),
];

export default sagas;
