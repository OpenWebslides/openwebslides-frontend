// @flow

import * as React from 'react';
import { render, shallow } from 'enzyme';

import type { SlideStyling } from 'modules/slide-styling/model';

import { contentItemTypes } from '../../../../model';
import type { DenormalizedHeadingContentItem } from '../../../../model';


import { PureHeading } from '../Heading';

describe(`Heading`, (): void => {

  const dummyHeading: $Exact<DenormalizedHeadingContentItem> = {
    id: '6o6qy5dz0a',
    type: contentItemTypes.HEADING,
    isEditing: false,
    text: 'Lorem ipsum dolor sit amet',
    metadata: {
      tags: [],
      visibilityOverrides: {},
    },
    subItems: [],
  };

  const dummySlideStyling: $Exact<SlideStyling> = {
    id: 'azd15dsqz1',
    userId: 'adkqmq5ds5',
    rules: {
      [contentItemTypes.PARAGRAPH]: {
        color: '#000000',
        font: 'Verdana',
      },
      [contentItemTypes.HEADING]: {
        color: '#000000',
        font: 'Verdana',
      },
    },
  };

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={1}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders its text prop inside a heading tag of the appropriate level`, (): void => {
    const enzymeWrapperLevel1 = render(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={1}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    const enzymeWrapperLevel2 = render(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={2}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    const enzymeWrapperLevel3 = render(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={3}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    const enzymeWrapperLevel4 = render(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={4}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    const enzymeWrapperLevel5 = render(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={5}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    const enzymeWrapperLevel6 = render(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={6}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    const h1Tags = enzymeWrapperLevel1.find('h1');
    const h2Tags = enzymeWrapperLevel2.find('h2');
    const h3Tags = enzymeWrapperLevel3.find('h3');
    const h4Tags = enzymeWrapperLevel4.find('h4');
    const h5Tags = enzymeWrapperLevel5.find('h5');
    const h6Tags = enzymeWrapperLevel6.find('h6');
    expect(h1Tags).toHaveLength(1);
    expect(h1Tags.first().text()).toEqual(dummyHeading.text);
    expect(h2Tags).toHaveLength(1);
    expect(h2Tags.first().text()).toEqual(dummyHeading.text);
    expect(h3Tags).toHaveLength(1);
    expect(h3Tags.first().text()).toEqual(dummyHeading.text);
    expect(h4Tags).toHaveLength(1);
    expect(h4Tags.first().text()).toEqual(dummyHeading.text);
    expect(h5Tags).toHaveLength(1);
    expect(h5Tags.first().text()).toEqual(dummyHeading.text);
    expect(h6Tags).toHaveLength(1);
    expect(h6Tags.first().text()).toEqual(dummyHeading.text);
  });

  it(`renders a heading level greater than 6 as a h6 tag instead of an invalid higher level heading tag`, (): void => {
    const enzymeWrapper = render(
      <PureHeading
        contentItem={dummyHeading}
        headingLevel={7}
        containerClassName="ows_container"
        slideStyling={dummySlideStyling}
      />,
    );
    expect(enzymeWrapper.find('h6')).toHaveLength(1);
  });

});
