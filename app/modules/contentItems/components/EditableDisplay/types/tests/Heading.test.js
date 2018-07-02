// @flow

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nextConfig from 'config/i18next';
import { mount, shallow } from 'enzyme';

import * as dummyContentItemData from '../../../../lib/testResources/dummyContentItemData';

import { PureHeading } from '../Heading';

describe(`Heading`, (): void => {

  let dummyOnStartEditing: any;
  let dummyOnEndEditing: any;
  let dummyOnEditPlainText: any;
  let dummyOnAddEmptySubItem: any;
  let dummyOnRemove: any;
  let dummyOnIndent: any;
  let dummyOnReverseIndent: any;
  let dummyProps: any;

  beforeEach((): void => {
    dummyOnStartEditing = jest.fn();
    dummyOnEndEditing = jest.fn();
    dummyOnEditPlainText = jest.fn();
    dummyOnAddEmptySubItem = jest.fn();
    dummyOnRemove = jest.fn();
    dummyOnIndent = jest.fn();
    dummyOnReverseIndent = jest.fn();
    dummyProps = {
      onStartEditing: dummyOnStartEditing,
      onEndEditing: dummyOnEndEditing,
      onEditPlainText: dummyOnEditPlainText,
      onAddEmptySubItem: dummyOnAddEmptySubItem,
      onRemove: dummyOnRemove,
      onIndent: dummyOnIndent,
      onReverseIndent: dummyOnReverseIndent,
    };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyContentItemData.headingContentItem}
        {...dummyProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its text prop`, (): void => {
    const enzymeWrapper = mount(
      <I18nextProvider i18n={i18nextConfig}>
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          baseClassName="BaseClassName"
          {...dummyProps}
        />
      </I18nextProvider>,
    );
    expect(enzymeWrapper.text()).toContain(dummyContentItemData.headingContentItem.text);
  });

  describe(`onEditableTextContentInput`, (): void => {

    it(`calls the passed onEditPlainText function`, (): void => {
      const dummyText = 'Lorem ipsum';
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          {...dummyProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentInput(dummyText);
      expect(dummyOnEditPlainText).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id, dummyText);
    });

  });

  describe(`onEditableTextContentActivate`, (): void => {

    it(`calls the passed onStartEditing function`, (): void => {
      const dummyText = 'Lorem ipsum';
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          {...dummyProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentActivate(dummyText);
      expect(dummyOnStartEditing).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id);
    });

  });

  describe(`onEditableTextContentDeactivate`, (): void => {

    it(`calls the passed onEndEditing function`, (): void => {
      const dummyText = 'Lorem ipsum';
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          {...dummyProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentDeactivate(dummyText);
      expect(dummyOnEndEditing).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id);
    });

  });

  describe(`onEditableTextContentKeyDown`, (): void => {

    it(`calls the passed onAddEmptySubItem function, when the pressed key was "Enter"`, (): void => {
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          {...dummyProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'Enter', preventDefault: jest.fn() });
      expect(dummyOnAddEmptySubItem).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id);
    });

    it(`calls the passed onRemove function, when the pressed key was "Backspace" and the contentItem's text prop was empty`, (): void => {
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={{ ...dummyContentItemData.headingContentItem, text: '' }}
          {...dummyProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'Backspace', preventDefault: jest.fn() });
      expect(dummyOnRemove).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id);
    });

    it(`calls the passed onIndent function, when the pressed key combination was "CTRL" + "ArrowRight"`, (): void => {
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          {...dummyProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'ArrowRight', ctrlKey: true, preventDefault: jest.fn() });
      expect(dummyOnIndent).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id);
    });

    it(`calls the passed onReverseIndent function, when the pressed key combination was "CTRL" + "ArrowLeft"`, (): void => {
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          {...dummyProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'ArrowLeft', ctrlKey: true, preventDefault: jest.fn() });
      expect(dummyOnReverseIndent).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id);
    });

    it(`does not call any function, when the pressed key is anything other than the above key combinations`, (): void => {
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          {...dummyProps}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'A' });
      expect(dummyOnAddEmptySubItem).toHaveBeenCalledTimes(0);
      expect(dummyOnRemove).toHaveBeenCalledTimes(0);
      expect(dummyOnIndent).toHaveBeenCalledTimes(0);
      expect(dummyOnReverseIndent).toHaveBeenCalledTimes(0);
    });

  });

});
