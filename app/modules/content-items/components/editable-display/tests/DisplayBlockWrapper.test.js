// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { dummyTranslatorProps } from 'config/tests';

import { PureDisplayBlockWrapper } from '../DisplayBlockWrapper';

describe(`DisplayBlockWrapper`, (): void => {

  const dummyBaseClassName = 'DisplayBlockWrapperBaseClass';
  const dummyIconName = 'paragraph';
  const dummyText = 'Lorem ipsum dolor sit amet.';
  const DummyChildComponent = (): React.Node => (
    <p>{dummyText}</p>
  );

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureDisplayBlockWrapper
        {...dummyTranslatorProps}
        iconName={dummyIconName}
        baseClassName={dummyBaseClassName}
      >
        <DummyChildComponent />
      </PureDisplayBlockWrapper>,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders an icon with the given iconName`, (): void => {
    const enzymeWrapper = mount(
      <PureDisplayBlockWrapper
        {...dummyTranslatorProps}
        iconName={dummyIconName}
        baseClassName={dummyBaseClassName}
      >
        <DummyChildComponent />
      </PureDisplayBlockWrapper>,
    );
    expect(enzymeWrapper.find(`.icon.${dummyIconName}`).hostNodes()).toHaveLength(1);
  });

  it(`renders its children`, (): void => {
    const enzymeWrapper = mount(
      <PureDisplayBlockWrapper
        {...dummyTranslatorProps}
        iconName={dummyIconName}
        baseClassName={dummyBaseClassName}
      >
        <DummyChildComponent />
      </PureDisplayBlockWrapper>,
    );
    expect(enzymeWrapper.find(DummyChildComponent)).toHaveLength(1);
  });

});
