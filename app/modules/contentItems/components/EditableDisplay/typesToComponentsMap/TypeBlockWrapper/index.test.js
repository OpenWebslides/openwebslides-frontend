// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { PureTypeBlockWrapper } from '.';

describe(`TypeBlockWrapper`, (): void => {

  let dummyIconName: string;
  let dummyText: string;
  let DummyChildComponent: () => React.Node;

  let dummyOnFocus: any;
  let dummyOnBlur: any;
  let dummyBlockRef: any;

  beforeEach((): void => {
    dummyIconName = 'paragraph';
    dummyText = 'Lorem ipsum dolor sit amet.';
    DummyChildComponent = (): React.Node => (
      <p>{dummyText}</p>
    );

    dummyOnFocus = jest.fn();
    dummyOnBlur = jest.fn();
    dummyBlockRef = { focus: jest.fn(), blur: jest.fn() };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders an icon with the given iconName`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.icon.${dummyIconName}`).hostNodes()).toHaveLength(1);
  });

  it(`attaches a --selected modifier when the passed isSelected is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={true} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.content-item-editable-display-block--selected`).hostNodes()).toHaveLength(1);
  });

  it(`does not attach a --selected modifier when the passed isSelected is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.content-item-editable-display-block--selected`).hostNodes()).toHaveLength(0);
  });

  it(`renders its children`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    expect(enzymeWrapper.find(DummyChildComponent)).toHaveLength(1);
  });

  it(`calls the passed onFocus function when the component is focused`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    enzymeWrapper.find('[data-test-id="type-block-wrapper"]').hostNodes().simulate('focus');
    expect(dummyOnFocus).toHaveBeenCalledTimes(1);
  });

  it(`calls the passed onBlur function when the component is blurred`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );
    enzymeWrapper.find('[data-test-id="type-block-wrapper"]').hostNodes().simulate('blur');
    expect(dummyOnBlur).toHaveBeenCalledTimes(1);
  });

  it(`focuses the component when the contentItem is selected`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={false} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );

    enzymeWrapper.instance().blockRef = dummyBlockRef;

    enzymeWrapper.setProps({ isSelected: true });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the onFocus callback, but we can test the reference focus() call
    expect(dummyBlockRef.focus).toHaveBeenCalledTimes(1);
    expect(dummyBlockRef.blur).not.toHaveBeenCalled();
  });

  it(`blurs the component when the contentItem is deselected`, (): void => {
    const enzymeWrapper = mount(
      <PureTypeBlockWrapper iconName={dummyIconName} isSelected={true} onFocus={dummyOnFocus} onBlur={dummyOnBlur}>
        <DummyChildComponent />
      </PureTypeBlockWrapper>,
    );

    enzymeWrapper.instance().blockRef = dummyBlockRef;

    enzymeWrapper.setProps({ isSelected: false });

    // Enzyme does not support event propagation yet, so we cannot test out
    // the onFocus callback, but we can test the reference focus() call
    expect(dummyBlockRef.focus).not.toHaveBeenCalled();
    expect(dummyBlockRef.blur).toHaveBeenCalledTimes(1);
  });

});
