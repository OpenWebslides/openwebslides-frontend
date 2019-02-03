// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { type Dispatch } from 'redux';

import { type ModulesAction } from 'types/redux';

import actions from '../../actions';
import * as m from '../../model';

type DispatchProps = {|
  onUpdateDeviceType: (deviceType: m.DeviceType) => void,
|};

type Props = {| ...DispatchProps |};

const mapDispatchToProps = (
  dispatch: Dispatch<ModulesAction>,
): DispatchProps => {
  return {
    onUpdateDeviceType: (deviceType: m.DeviceType): void => {
      dispatch(actions.updateDeviceType(deviceType));
    },
  };
};

const PureDeviceTypeSpy = (props: Props): React.Node => null;

const DeviceTypeSpy = connect(null, mapDispatchToProps)(PureDeviceTypeSpy);

export { PureDeviceTypeSpy };
export default DeviceTypeSpy;
