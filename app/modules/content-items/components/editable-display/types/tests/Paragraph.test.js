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

  beforeEach((): void => {
    dummyOnEditPlainText = jest.fn();
    dummyOnAddEmptySiblingItemBelow = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyContentItemData.paragraphContentItem}
        onEditPlainText={dummyOnEditPlainText}
        onAddEmptySiblingItemBelow={dummyOnAddEmptySiblingItemBelow}
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
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'Enter', preventDefault: jest.fn() });
      expect(dummyOnAddEmptySiblingItemBelow).toHaveBeenCalledWith(dummyContentItemData.paragraphContentItem.id);
    });

    it(`does not call the onAddEmptySubItem function, when the pressed key is anything other than "Enter"`, (): void => {
      const enzymeWrapper = shallow(
        <PureParagraph
          contentItem={dummyContentItemData.paragraphContentItem}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySiblingItemBelow={dummyOnAddEmptySiblingItemBelow}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'A' });
      expect(dummyOnAddEmptySiblingItemBelow).toHaveBeenCalledTimes(0);
    });

  });

});
