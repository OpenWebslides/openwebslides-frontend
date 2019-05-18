// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import { PureParagraph } from './Paragraph';

describe(`Paragraph`, (): void => {

  let dummyParagraph: m.ParagraphContentItem;
  let dummyFunctionProps: any;

  beforeEach((): void => {
    dummyParagraph = { ...dummyData.paragraphContentItem };
    dummyFunctionProps = {
      onActivate: jest.fn(),
      onDeactivate: jest.fn(),
      onEndEditing: jest.fn(),
      onEditPlainText: jest.fn(),
      onAddEmptySiblingItemBelow: jest.fn(),
      onRemove: jest.fn(),
      onIndent: jest.fn(),
      onReverseIndent: jest.fn(),
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

  it(`renders itself in text mode, when the passed isActive is set to FALSE`, (): void => {
    const enzymeWrapper = mount(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
        isActive={false}
      />,
    );
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__text"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__input"]').hostNodes()).toHaveLength(0);
  });

  it(`renders itself in input mode, when the passed isActive is set to TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
          isActive={true}
        />
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__text"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="content-item-editable-display__input"]').hostNodes()).toHaveLength(1);
  });

  it(`calls the passed onActivate, when it is in text mode and receives a left button click event`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />
      </DummyProviders>,
    );
    enzymeWrapper.find('[data-test-id="content-item-editable-display__text"]').hostNodes().simulate('click', { button: 0 });
    expect(dummyFunctionProps.onActivate).toHaveBeenCalledTimes(1);
  });

  it(`does not call the passed onActivate, when it is in text mode and receives a right button click event`, (): void => {
    const enzymeWrapper = mount(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.find('[data-test-id="content-item-editable-display__text"]').hostNodes().simulate('click', { button: 1 });
    expect(dummyFunctionProps.onActivate).toHaveBeenCalledTimes(0);
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

  it(`calls the passed onDeactivate, onEndEditing and onAddEmptySiblingItemBelow functions, when onEditableTextContentDeactivate passed to the EditableTextContent is called with TRUE as argument`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentDeactivate(true);
    expect(dummyFunctionProps.onDeactivate).toHaveBeenCalledTimes(1);
    expect(dummyFunctionProps.onEndEditing).toHaveBeenCalledWith(dummyParagraph.id);
    expect(dummyFunctionProps.onAddEmptySiblingItemBelow).toHaveBeenCalledWith(dummyParagraph.id);
  });

  it(`calls the passed onDeactivate, onEndEditing function when onEditableTextContentDeactivate passed to the EditableTextContent is called with FALSE as argument`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyParagraph}
        {...dummyFunctionProps}
      />,
    );
    enzymeWrapper.instance().onEditableTextContentDeactivate(false);
    expect(dummyFunctionProps.onDeactivate).toHaveBeenCalledTimes(1);
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

  describe(`onIndent`, (): void => {

    it(`calls the passed onIndent function`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onIndent();
      expect(dummyFunctionProps.onIndent).toHaveBeenCalledTimes(1);
    });

  });

  describe(`onUnindent`, (): void => {

    it(`calls the passed onUnindent function`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onUnindent();
      expect(dummyFunctionProps.onReverseIndent).toHaveBeenCalledTimes(1);
    });

  });

});
