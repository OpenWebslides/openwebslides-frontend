// @flow

import { type AppState } from 'types/redux';

import * as m from '../model';

const getSettingByKey = <K: $Keys<m.UserSettings>>(
  state: AppState,
  props: { key: K },
): $ElementType<m.UserSettings, K> => {
  const { key } = props;
  return state.modules.platform.settings[key];
};

export default getSettingByKey;
