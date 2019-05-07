// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import { PureHeading } from './Heading';

describe(`Heading`, (): void => {

  let dummyHeading: m.HeadingContentItem;
  let dummyFunctionProps: any;

  beforeEach((): void => {
    dummyHeading = { ...dummyData.headingContentItem };
    dummyFunctionProps = {
      onEndEditing: jest.fn(),
      onEditPlainText: jest.fn(),
      onAddEmptySubItem: jest.fn(),
      onRemove: jest.fn(),
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyHeading}
        {...dummyFunctionProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders its text prop`, (): void => {
    const enzymeWrapper = mount(
      <PureHeading
        contentItem={dummyHeading}
        {...dummyFunctionProps}
      />,
    );
    expect(enzymeWrapper.text()).toContain(dummyHeading.text);
  });

  it(`calls the passed onEditPlainText function when onEditableTextContentSubmit passed to the EditableTextContent is called`, (): void => {
    const dummyText = 'Lorem ipsum';
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyHeading}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentSubmit(dummyText);
    expect(dummyFunctionProps.onEditPlainText).toHaveBeenCalledWith(dummyHeading.id, dummyText);
  });

  it(`calls the passed onEndEditing and onAddEmptySubItem functions, when onEditableTextContentDeactivate passed to the EditableTextContent is called with TRUE as argument`, (): void => {
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyHeading}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentDeactivate(true);
    expect(dummyFunctionProps.onEndEditing).toHaveBeenCalledWith(dummyHeading.id);
    expect(dummyFunctionProps.onAddEmptySubItem).toHaveBeenCalledWith(dummyHeading.id);
  });

  it(`calls the passed onEndEditing function when onEditableTextContentDeactivate passed to the EditableTextContent is called with FALSE as argument`, (): void => {
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyHeading}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentDeactivate(false);
    expect(dummyFunctionProps.onEndEditing).toHaveBeenCalledWith(dummyHeading.id);
    expect(dummyFunctionProps.onAddEmptySubItem).not.toHaveBeenCalled();
  });

  it(`calls the passed onRemove function when onEditableTextContentRemove passed to the EditableTextContent is called`, (): void => {
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyHeading}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentRemove();
    expect(dummyFunctionProps.onRemove).toHaveBeenCalledWith(dummyHeading.id);
  });

});
