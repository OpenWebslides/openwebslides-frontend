// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import { PureParagraph } from './Paragraph';

describe(`Paragraph`, (): void => {

  let dummyParagraph: m.ParagraphContentItem;
  let dummyFunctionProps: any;

  beforeEach((): void => {
    dummyParagraph = { ...dummyData.paragraphContentItem };
    dummyFunctionProps = {
      onEndEditing: jest.fn(),
      onEditPlainText: jest.fn(),
      onAddEmptySiblingItemBelow: jest.fn(),
      onRemove: jest.fn(),
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders its text prop`, (): void => {
    const enzymeWrapper = mount(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
      />,
    );
    expect(enzymeWrapper.text()).toContain(dummyParagraph.text);
  });

  it(`calls the passed onEditPlainText function when onEditableTextContentSubmit passed to the EditableTextContent is called`, (): void => {
    const dummyText = 'Lorem ipsum';
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentSubmit(dummyText);
    expect(dummyFunctionProps.onEditPlainText).toHaveBeenCalledWith(dummyParagraph.id, dummyText);
  });

  it(`calls the passed onEndEditing and onAddEmptySiblingItemBelow functions, when onEditableTextContentDeactivate passed to the EditableTextContent is called with TRUE as argument`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentDeactivate(true);
    expect(dummyFunctionProps.onEndEditing).toHaveBeenCalledWith(dummyParagraph.id);
    expect(dummyFunctionProps.onAddEmptySiblingItemBelow).toHaveBeenCalledWith(dummyParagraph.id);
  });

  it(`calls the passed onEndEditing function when onEditableTextContentDeactivate passed to the EditableTextContent is called with FALSE as argument`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentDeactivate(false);
    expect(dummyFunctionProps.onEndEditing).toHaveBeenCalledWith(dummyParagraph.id);
    expect(dummyFunctionProps.onAddEmptySiblingItemBelow).not.toHaveBeenCalled();
  });

  it(`calls the passed onRemove function when onEditableTextContentRemove passed to the EditableTextContent is called`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentRemove();
    expect(dummyFunctionProps.onRemove).toHaveBeenCalledWith(dummyParagraph.id);
  });

});
