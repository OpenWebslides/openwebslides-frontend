// @flow

import _ from 'lodash';
import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyProviderProps, dummyTopicData } from 'lib/testResources';

import actions from '../../actions';
import * as m from '../../model';

import ForkInfo, { PureForkInfo } from '.';

describe(`ForkInfo`, (): void => {

  let dummyTopic: m.Topic;
  let dummyTopicsById: m.TopicsById;
  let dummyState: any;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic, isContentFetched: true };
    dummyTopicsById = {
      [dummyTopic.id]: dummyTopic,
    };
    dummyState = { modules: {
      apiRequestsStatus: {},
      topics: { byId: dummyTopicsById },
    } };
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureForkInfo
        {...dummyProviderProps.translatorProps}
        upstreamTopicId={dummyTopic.id}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`fetches the topic, when the topic was not previously present in the state`, (): void => {
    _.unset(dummyTopicsById, dummyTopic.id);

    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ForkInfo
          upstreamTopicId={dummyTopic.id}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledWith(actions.fetch(dummyTopic.id));
    expect(enzymeWrapper.find('[data-test-id="topic-fork-info"]').hostNodes()).toHaveLength(0);
  });

  it(`renders the topic fork info, when the topic was previously present in the state`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyState={dummyState} dummyDispatch={dummyDispatch}>
        <ForkInfo
          upstreamTopicId={dummyTopic.id}
        />
      </DummyProviders>,
    );

    expect(dummyDispatch).toHaveBeenCalledTimes(0);
    expect(enzymeWrapper.find('[data-test-id="topic-fork-info"]').hostNodes()).toHaveLength(1);
  });

});
