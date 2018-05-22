// @flow

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nextConfig from 'config/i18next';
import { mount, shallow } from 'enzyme';

import * as dummyContentItemData from '../../../../lib/test-resources/dummyContentItemData';

import { PureParagraph } from '../Paragraph';

describe(`Paragraph`, (): void => {

  const dummyOnEditPlainText = jest.fn();

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureParagraph
        contentItem={dummyContentItemData.paragraphContentItem}
        onEditPlainText={dummyOnEditPlainText}
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
        />,
      );
      enzymeWrapper.instance().onEditableTextContentInput(dummyText);
      expect(dummyOnEditPlainText).toHaveBeenCalledWith(dummyContentItemData.paragraphContentItem.id, dummyText);
    });

  });

});
