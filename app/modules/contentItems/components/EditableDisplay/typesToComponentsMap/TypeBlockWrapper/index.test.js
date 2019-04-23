// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { PureTypeBlockWrapper } from '.';

describe(`TypeBlockWrapper`, (): void => {

  let dummyContentItemId: string;
  let dummyIconName: string;
  let dummyText: string;
  let DummyChildComponent: () => React.Node;

  let dummyOnFocus: any;
  let dummyOnBlur: any;

  beforeEach((): void => {
    dummyContentItemId = 'dummyContentItemId';
    dummyIconName = 'paragraph';
    dummyText = 'Lorem ipsum dolor sit amet.';
    DummyChildComponent = (): React.Node => (
      <p>{dummyText}</p>
    );

    dummyOnFocus = jest.fn();
    dummyOnBlur = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTypeBlockWrapper contentItemId={dummyContentItemId} iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders an icon with the given iconName`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper contentItemId={dummyContentItemId} iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.icon.${dummyIconName}`).hostNodes()).toHaveLength(1);
  });

  it(`attaches a --selected modifier when the passed isSelected is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper contentItemId={dummyContentItemId} iconName={dummyIconName} isSelected={true} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.content-item-editable-display-block--selected`).hostNodes()).toHaveLength(1);
  });

  it(`does not attach a --selected modifier when the passed isSelected is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper contentItemId={dummyContentItemId} iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.content-item-editable-display-block--selected`).hostNodes()).toHaveLength(0);
  });

  it(`renders its children`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper contentItemId={dummyContentItemId} iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(DummyChildComponent)).toHaveLength(1);
  });

  it(`calls the passed onFocus function with the correct arguments when the component is focused`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper contentItemId={dummyContentItemId} iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    enzymeWrapper.find('[data-test-id="type-block-wrapper"]').hostNodes().simulate('focus');
    expect(dummyOnFocus).toHaveBeenCalledWith(dummyContentItemId);
  });

  it(`calls the passed onBlur function with the correct arguments when the component is blurred`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper contentItemId={dummyContentItemId} iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    enzymeWrapper.find('[data-test-id="type-block-wrapper"]').hostNodes().simulate('blur');
    expect(dummyOnBlur).toHaveBeenCalledWith();
  });

});
