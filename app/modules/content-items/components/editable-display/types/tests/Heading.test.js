// @flow

import * as React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18nextConfig from 'config/i18next';
import { mount, shallow } from 'enzyme';

import * as dummyContentItemData from '../../../../lib/test-resources/dummyContentItemData';

import { PureHeading } from '../Heading';

describe(`Heading`, (): void => {

  const dummyOnEditPlainText = (): void => {};

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyContentItemData.headingContentItem}
        onEditPlainText={dummyOnEditPlainText}
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
        />
      </I18nextProvider>,
    );
    expect(enzymeWrapper.text()).toContain(dummyContentItemData.headingContentItem.text);
  });

});
