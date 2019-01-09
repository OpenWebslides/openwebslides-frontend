// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { TOPIC_VIEWER_ROUTE } from 'config/routes';
import { dummyProviderProps, DummyProviders, dummyTopicData } from 'lib/testResources';
import makeRoute from 'lib/makeRoute';
import topics from 'modules/topics';

import ShareModal, { PureShareModal } from '.';

describe(`ShareModal`, (): void => {

  let dummyOnSubmit: any;
  let dummyOnCancel: any;
  let dummyTopic: topics.model.Topic;

  beforeEach((): void => {
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
    dummyTopic = dummyTopicData.topic;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureShareModal topic={dummyTopic} {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the tabs, when the passed isOpen prop is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={true} topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="share-modal-tabs"]')).not.toHaveLength(0);
  });

  it(`does not render the tabs, when the passed isOpen prop is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={false} topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="share-modal-tabs"]')).toHaveLength(0);
  });

  it(`calls the passed onCancel callback when the close button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={true} onCancel={dummyOnCancel} topic={dummyTopic} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="share-modal-close-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalled();
    expect(dummyOnCancel).toHaveBeenCalledTimes(1);
  });

  it(`renders a share tab when the corresponding url menu item is active`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={true} topic={dummyTopic} />
      </DummyProviders>,
    );

    enzymeWrapper.find('Tab MenuItem[index=0]').simulate('click');
    expect(enzymeWrapper.find('ShareTab')).toHaveLength(1);
  });

  it(`renders a fully qualified viewer URL in the url input`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={true} topic={dummyTopic} />
      </DummyProviders>,
    );

    const qualifiedUrl = makeRoute(TOPIC_VIEWER_ROUTE, { topicId: dummyTopic.id }, true);

    enzymeWrapper.find('Tab MenuItem[index=0]').simulate('click');
    expect(enzymeWrapper.find('ShareTab').props().value).toStrictEqual(qualifiedUrl);
  });

  it(`renders a share tab when the corresponding embed menu item is active`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={true} topic={dummyTopic} />
      </DummyProviders>,
    );

    enzymeWrapper.find('Tab MenuItem[index=1]').simulate('click');
    expect(enzymeWrapper.find('ShareTab')).toHaveLength(1);
  });

  it(`renders an iframe code in the embed input`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <ShareModal isOpen={true} topic={dummyTopic} />
      </DummyProviders>,
    );

    enzymeWrapper.find('Tab MenuItem[index=1]').simulate('click');
    expect(enzymeWrapper.find('ShareTab').props().value).toMatch('<iframe');
  });

});
