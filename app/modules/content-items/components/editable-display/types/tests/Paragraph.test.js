// @flow

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nextConfig from 'config/i18next';
import { mount, shallow } from 'enzyme';

import * as dummyContentItemData from '../../../../lib/test-resources/dummyContentItemData';

import { PureParagraph } from '../Paragraph';

describe(`Paragraph`, (): void => {

  let dummyOnEditPlainText: any;
  let dummyOnAddEmptySiblingItemBelow: any;
  let dummyOnRemove: any;

  beforeEach((): void => {
    dummyOnEditPlainText = jest.fn();
    dummyOnAddEmptySiblingItemBelow = jest.fn();
    dummyOnRemove = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyContentItemData.paragraphContentItem}
        onEditPlainText={dummyOnEditPlainText}
        onAddEmptySiblingItemBelow={dummyOnAddEmptySiblingItemBelow}
        onRemove={dummyOnRemove}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its text prop`, (): void => {
    const enzymeWrapper = mount(
      <I18nextProvider i18n={i18nextConfig}>
        <PureParagraph
          contentItem={dummyContentItemData.paragraphContentItem}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySiblingItemBelow={dummyOnAddEmptySiblingItemBelow}
          onRemove={dummyOnRemove}
          baseClassName="BaseClassName"
        />
      </I18nextProvider>,
    );
    expect(enzymeWrapper.text()).toContain(dummyContentItemData.paragraphContentItem.text);
  });

  describe(`onEditableTextContentInput`, (): void => {

    it(`calls the passed onEditPlainText function`, (): void => {
      const dummyText = 'Lorem ipsum';
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyContentItemData.paragraphContentItem}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySiblingItemBelow={dummyOnAddEmptySiblingItemBelow}
          onRemove={dummyOnRemove}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentInput(dummyText);
      expect(dummyOnEditPlainText).toHaveBeenCalledWith(dummyContentItemData.paragraphContentItem.id, dummyText, true);
    });

  });

  describe(`onEditableTextContentDeactivate`, (): void => {

    it(`calls the passed onEditPlainText function`, (): void => {
      const dummyText = 'Lorem ipsum';
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyContentItemData.paragraphContentItem}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySiblingItemBelow={dummyOnAddEmptySiblingItemBelow}
          onRemove={dummyOnRemove}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentDeactivate(dummyText);
      expect(dummyOnEditPlainText).toHaveBeenCalledWith(dummyContentItemData.paragraphContentItem.id, dummyText, false);
    });

  });

  describe(`onEditableTextContentKeyDown`, (): void => {

    it(`calls the passed onAddEmptySubItem function, when the pressed key was "Enter"`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyContentItemData.paragraphContentItem}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySiblingItemBelow={dummyOnAddEmptySiblingItemBelow}
          onRemove={dummyOnRemove}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'Enter', preventDefault: jest.fn() });
      expect(dummyOnAddEmptySiblingItemBelow).toHaveBeenCalledWith(dummyContentItemData.paragraphContentItem.id);
    });

    it(`calls the passed onRemove function, when the pressed key was "Backspace" and the contentItem's text prop was empty`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={{ ...dummyContentItemData.paragraphContentItem, text: '' }}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySiblingItemBelow={dummyOnAddEmptySiblingItemBelow}
          onRemove={dummyOnRemove}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'Backspace', preventDefault: jest.fn() });
      expect(dummyOnRemove).toHaveBeenCalledWith(dummyContentItemData.paragraphContentItem.id);
    });

    it(`does not call any function, when the pressed key is anything other than "Enter" or "Backspace`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyContentItemData.paragraphContentItem}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySiblingItemBelow={dummyOnAddEmptySiblingItemBelow}
          onRemove={dummyOnRemove}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'A' });
      expect(dummyOnAddEmptySiblingItemBelow).toHaveBeenCalledTimes(0);
      expect(dummyOnRemove).toHaveBeenCalledTimes(0);
    });

  });

});
