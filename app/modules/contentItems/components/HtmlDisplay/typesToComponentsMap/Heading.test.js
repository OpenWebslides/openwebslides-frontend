// @flow

import _ from 'lodash';
import * as React from 'react';
import { render, shallow } from 'enzyme';

import { dummyContentItemData as dummyData } from 'lib/testResources';

import * as m from '../../../model';

import { PureHeading } from './Heading';

describe(`Heading`, (): void => {

  let dummyHeading: m.DenormalizedHeadingContentItem;

  beforeEach((): void => {
    dummyHeading = { ..._.omit(dummyData.headingContentItem, 'subItemIds'), subItems: [] };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={1}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders its text prop inside a heading tag of the appropriate level`, (): void => {
    const enzymeWrapperLevel1 = render(<PureHeading contentItem={dummyHeading} headingLevel={1} />);
    const enzymeWrapperLevel2 = render(<PureHeading contentItem={dummyHeading} headingLevel={2} />);
    const enzymeWrapperLevel3 = render(<PureHeading contentItem={dummyHeading} headingLevel={3} />);
    const enzymeWrapperLevel4 = render(<PureHeading contentItem={dummyHeading} headingLevel={4} />);
    const enzymeWrapperLevel5 = render(<PureHeading contentItem={dummyHeading} headingLevel={5} />);
    const enzymeWrapperLevel6 = render(<PureHeading contentItem={dummyHeading} headingLevel={6} />);
    const h1Tags = enzymeWrapperLevel1.find('h1');
    const h2Tags = enzymeWrapperLevel2.find('h2');
    const h3Tags = enzymeWrapperLevel3.find('h3');
    const h4Tags = enzymeWrapperLevel4.find('h4');
    const h5Tags = enzymeWrapperLevel5.find('h5');
    const h6Tags = enzymeWrapperLevel6.find('h6');
    expect(h1Tags).toHaveLength(1);
    expect(h1Tags.first().text()).toBe(dummyHeading.text);
    expect(h2Tags).toHaveLength(1);
    expect(h2Tags.first().text()).toBe(dummyHeading.text);
    expect(h3Tags).toHaveLength(1);
    expect(h3Tags.first().text()).toBe(dummyHeading.text);
    expect(h4Tags).toHaveLength(1);
    expect(h4Tags.first().text()).toBe(dummyHeading.text);
    expect(h5Tags).toHaveLength(1);
    expect(h5Tags.first().text()).toBe(dummyHeading.text);
    expect(h6Tags).toHaveLength(1);
    expect(h6Tags.first().text()).toBe(dummyHeading.text);
  });

  it(`renders a heading level greater than 6 as a h6 tag instead of an invalid higher level heading tag`, (): void => {
    const enzymeWrapper = render(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={7}
      />,
    );
    expect(enzymeWrapper.find('h6')).toHaveLength(1);
  });

});
