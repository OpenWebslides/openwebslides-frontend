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
      onStartEditing: jest.fn(),
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

  describe(`onEditableTextContentInput`, (): void => {

    it(`calls the passed onEditPlainText function`, (): void => {
      const dummyText = 'Lorem ipsum';
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentInput(dummyText);
      expect(dummyFunctionProps.onEditPlainText).toHaveBeenCalledWith(dummyParagraph.id, dummyText);
    });

  });

  describe(`onEditableTextContentActivate`, (): void => {

    it(`calls the passed onStartEditing function`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentActivate();
      expect(dummyFunctionProps.onStartEditing).toHaveBeenCalledWith(dummyParagraph.id);
    });

  });

  describe(`onEditableTextContentDeactivate`, (): void => {

    it(`calls the passed onEndEditing function`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentDeactivate();
      expect(dummyFunctionProps.onEndEditing).toHaveBeenCalledWith(dummyParagraph.id);
    });

  });

  describe(`onEditableTextContentKeyDown`, (): void => {

    it(`calls the passed onAddEmptySubItem function, when the pressed key was "Enter"`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown(({ key: 'Enter', preventDefault: jest.fn() }: any));
      expect(dummyFunctionProps.onAddEmptySiblingItemBelow).toHaveBeenCalledWith(dummyParagraph.id);
    });

    it(`calls the passed onRemove function, when the pressed key was "Backspace" and the contentItem's text prop was empty`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={{ ...dummyParagraph, text: '' }}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown(({ key: 'Backspace', preventDefault: jest.fn() }: any));
      expect(dummyFunctionProps.onRemove).toHaveBeenCalledWith(dummyParagraph.id);
    });

    it(`calls the passed onIndent function, when the pressed key combination was "CTRL" + "ArrowRight"`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown(({ key: 'ArrowRight', ctrlKey: true, preventDefault: jest.fn() }: any));
      expect(dummyFunctionProps.onIndent).toHaveBeenCalledWith(dummyParagraph.id);
    });

    it(`calls the passed onReverseIndent function, when the pressed key combination was "CTRL" + "ArrowLeft"`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown(({ key: 'ArrowLeft', ctrlKey: true, preventDefault: jest.fn() }: any));
      expect(dummyFunctionProps.onReverseIndent).toHaveBeenCalledWith(dummyParagraph.id);
    });

    it(`does not call any function, when the pressed key is anything other than the above key combinations`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyParagraph}
          {...dummyFunctionProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown(({ key: 'A' }: any));
      Object.values(dummyFunctionProps).forEach((value: any): void => {
        expect(value).toHaveBeenCalledTimes(0);
      });
    });

  });

});
