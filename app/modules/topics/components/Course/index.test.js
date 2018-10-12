// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps, dummyTopicData } from 'lib/testResources';
import contentItems from 'modules/contentItems';

import * as m from '../../model';

import { PureCourse } from '.';

describe(`Course`, (): void => {

  let dummyTopic: m.Topic;
  let dummyRootContentItem: contentItems.model.DenormalizedRootContentItem;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: true };
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureCourse
        {...dummyProviderProps.translatorProps}
        topic={dummyTopic}
        rootContentItem={dummyRootContentItem}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

});
