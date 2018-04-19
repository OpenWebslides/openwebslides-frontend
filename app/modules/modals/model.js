// @flow

import type { Identifier } from 'types/model';

export type Modal = {
  +id: Identifier,
  +modalType: string,
};

export type ModalsState = {
  +id: Identifier,
  +modalType: string,
};
