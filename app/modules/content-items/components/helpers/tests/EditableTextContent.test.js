// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import EditableTextContent from '../EditableTextContent';

describe(`EditableTextContent`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <EditableTextContent
        text="Test"
        onActivate={(): void => {}}
        onDeactivate={(): void => {}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
