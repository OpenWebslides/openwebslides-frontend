// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { PureTypeBlockWrapper } from '.';

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
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders an icon with the given iconName`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.icon.${dummyIconName}`).hostNodes()).toHaveLength(1);
  });

  it(`attaches a --selected modifier when the passed isSelected is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={true}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.content-item-editable-display-block--selected`).hostNodes()).toHaveLength(1);
  });

  it(`does not attach a --selected modifier when the passed isSelected is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.content-item-editable-display-block--selected`).hostNodes()).toHaveLength(0);
  });

  it(`renders its children`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(DummyChildComponent)).toHaveLength(1);
  });

});
