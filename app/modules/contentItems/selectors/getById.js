// @flow

import _ from 'lodash';

import type { State } from 'types/state';
import type { Identifier } from 'types/model';

import type { ContentItem } from '../model';

import getAllById from './getAllById';

const getById = (state: State, props: { id: Identifier }): ?ContentItem => {
  const { id } = props;
  return _.get(getAllById(state), id, null);
};

export default getById;
