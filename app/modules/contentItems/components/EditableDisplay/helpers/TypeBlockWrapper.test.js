// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { PureTypeBlockWrapper } from './TypeBlockWrapper';

describe(`TypeBlockWrapper`, (): void => {

  let dummyIconName: string;
  let dummyText: string;
  let DummyChildComponent: () => React.Node;

  beforeEach((): void => {
    dummyIconName = 'paragraph';
    dummyText = 'Lorem ipsum dolor sit amet.';
    DummyChildComponent = (): React.Node => (
      <p>{dummyText}</p>
    );
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTypeBlockWrapper iconName={dummyIconName}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders an icon with the given iconName`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.icon.${dummyIconName}`).hostNodes()).toHaveLength(1);
  });

  it(`renders its children`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(DummyChildComponent)).toHaveLength(1);
  });

});
