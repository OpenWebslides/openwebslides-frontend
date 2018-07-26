// @flow

import _ from 'lodash';

import { type State } from 'types/state';

import * as m from '../model';

import getAllById from './getAllById';

const getById = (state: State, props: { id: string }): ?m.ContentItem => {
  const { id } = props;
  return _.get(getAllById(state), id, null);
};

export default getById;
