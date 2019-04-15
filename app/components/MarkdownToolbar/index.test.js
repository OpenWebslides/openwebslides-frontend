// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyTopicData } from 'lib/testResources';
import contentItems from 'modules/contentItems';

import actions from '../../../actions';
import * as m from '../../../model';

import Toolbar, { PureToolbar } from '.';

describe(`Toolbar`, (): void => {

  let dummyTopic: m.Topic;
  let dummyDispatch: any;

  let dummyOnInsertContentItem: any;

  beforeEach((): void => {
    dummyTopic = dummyTopicData.topic;
    dummyDispatch = jest.fn();

    dummyOnInsertContentItem = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureToolbar topic={dummyTopic} onInsertContentItem={dummyOnInsertContentItem} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`dispatches a content items ADD action with the right arguments when the HEADING button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Toolbar topic={dummyTopic} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="toolbar-heading-button"]').hostNodes().simulate('click');
    expect(dummyDispatch).toHaveBeenCalledWith(contentItems.actions.add(
      contentItems.model.contentItemTypes.HEADING,
      {
        contextType: contentItems.model.contextTypes.PARENT,
        contextItemId: dummyTopic.rootContentItemId,
        indexInSiblingItems: -1,
      },
      { text: 'Untitled heading' },
    ));
  });

});
