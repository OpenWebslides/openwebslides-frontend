// @flow

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nextConfig from 'config/i18next';
import { mount, shallow } from 'enzyme';

import * as dummyContentItemData from '../../../../lib/test-resources/dummyContentItemData';

import { PureHeading } from '../Heading';

describe(`Heading`, (): void => {

  let dummyOnEditPlainText: any;
  let dummyOnAddEmptySubItem: any;

  beforeEach((): void => {
    dummyOnEditPlainText = jest.fn();
    dummyOnAddEmptySubItem = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyContentItemData.headingContentItem}
        onEditPlainText={dummyOnEditPlainText}
        onAddEmptySubItem={dummyOnAddEmptySubItem}
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
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySubItem={dummyOnAddEmptySubItem}
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
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySubItem={dummyOnAddEmptySubItem}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentInput(dummyText);
      expect(dummyOnEditPlainText).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id, dummyText, true);
    });

  });

  describe(`onEditableTextContentDeactivate`, (): void => {

    it(`calls the passed onEditPlainText function`, (): void => {
      const dummyText = 'Lorem ipsum';
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySubItem={dummyOnAddEmptySubItem}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentDeactivate(dummyText);
      expect(dummyOnEditPlainText).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id, dummyText, false);
    });

  });

  describe(`onEditableTextContentKeyDown`, (): void => {

    it(`calls the passed onAddEmptySubItem function, when the pressed key was "Enter"`, (): void => {
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySubItem={dummyOnAddEmptySubItem}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'Enter', preventDefault: jest.fn() });
      expect(dummyOnAddEmptySubItem).toHaveBeenCalledWith(dummyContentItemData.headingContentItem.id);
    });

    it(`does not call the onAddEmptySubItem function, when the pressed key is anything other than "Enter"`, (): void => {
      const enzymeWrapper = shallow(
        <PureHeading
          contentItem={dummyContentItemData.headingContentItem}
          onEditPlainText={dummyOnEditPlainText}
          onAddEmptySubItem={dummyOnAddEmptySubItem}
        />,
      );
      enzymeWrapper.instance().onEditableTextContentKeyDown({ key: 'A' });
      expect(dummyOnAddEmptySubItem).toHaveBeenCalledTimes(0);
    });

  });

});
