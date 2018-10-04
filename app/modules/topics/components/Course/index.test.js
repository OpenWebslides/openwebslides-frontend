// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData } from 'lib/testResources';
import contentItems from 'modules/contentItems';

import actions from '../../actions';
import * as m from '../../model';

import Course, { PureCourse } from '.';

describe(`Course`, (): void => {

  let dummyTopic: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyRootContentItem: contentItems.model.DenormalizedRootContentItem;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: true };
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
    };
    dummyState = { modules: {
      asyncRequests: { byId: {} },
      contentItems: { byId: {} },
      topics: { byId: dummyTopicsById },
    } };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureCourse
        {...dummyProviderProps.translatorProps}
        topicId={dummyTopic.id}
        rootContentItem={dummyRootContentItem}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`loads the topic, when the topic or its content was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Course topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetchWithContent(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-course"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic course, when the topic and its content were previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <Course topicId={dummyTopic.id} />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-course"]').hostNodes()).toHaveLength(1);
  });

});
