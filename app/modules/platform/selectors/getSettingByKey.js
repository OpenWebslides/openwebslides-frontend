// @flow

import { type State } from 'types/state';

import * as m from '../model';

const getSettingByKey = <K: $Keys<m.UserSettings>>(
  state: State,
  props: { key: K },
): $ElementType<m.UserSettings, K> => {
  const { key } = props;
  return state.modules.platform.settings[key];
};

export default getSettingByKey;
