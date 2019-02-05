// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { dummyProviderProps, DummyProviders, dummyTopicData } from 'lib/testResources';

import actions from '../../../actions';
import * as m from '../../../model';

import Metadata, { PureMetadata } from '.';

describe(`Metadata`, (): void => {

  let dummyTopic: m.Topic;
  let dummyDispatch: any;

  beforeEach((): void => {
    dummyTopic = dummyTopicData.topic;
    dummyDispatch = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureMetadata
        topic={dummyTopic}
        {...dummyProviderProps.translatorProps}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`shows only the title when the topic is not dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Metadata topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes().text()).toContain(dummyTopic.title);
  });

  it(`appends an asterisk to the title, and prevents the window from unloading when the topic is dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Metadata topic={{ ...dummyTopic, isDirty: true }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes().text()).toContain(`${dummyTopic.title}*`);
  });

  it(`shows the description when the topic has a description`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Metadata topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-metadata-description"]').text()).toContain(dummyTopic.description);
  });

  it(`shows a placeholder when the topic has no description`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Metadata topic={{ ...dummyTopic, description: null }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-metadata-no-description"]').hostNodes()).toHaveLength(1);
  });

  it(`disables the metadata edit button when the topic is dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Metadata topic={{ ...dummyTopic, isDirty: true }} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-metadata-edit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-metadata-edit-button"][disabled]').hostNodes()).toHaveLength(1);
  });

  it(`enables the metadata edit button when the topic is not dirty`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Metadata topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="topic-metadata-edit-button"][disabled]').hostNodes()).toHaveLength(0);
  });

  it(`shows the metadata form and hides the title when the metadata edit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Metadata topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureMetadataForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes()).toHaveLength(1);
    enzymeWrapper.find('[data-test-id="topic-metadata-edit-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PureMetadataForm')).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes()).toHaveLength(0);
  });

  it(`closes the metadata and shows the title when the metadata edit cancel button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Metadata topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureMetadataForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes()).toHaveLength(1);
    enzymeWrapper.find('[data-test-id="topic-metadata-edit-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PureMetadataForm')).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes()).toHaveLength(0);
    enzymeWrapper.find('[data-test-id="topic-metadata-cancel-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PureMetadataForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes()).toHaveLength(1);
  });

  it(`dispatches a topics UPDATE action and closes the metadata and shows the title when the onSubmit handler passed to the metadata is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders dummyDispatch={dummyDispatch}>
        <Metadata topic={dummyTopic} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureMetadataForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes()).toHaveLength(1);
    enzymeWrapper.find('[data-test-id="topic-metadata-edit-button"]').hostNodes().simulate('click');
    expect(enzymeWrapper.find('PureMetadataForm')).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes()).toHaveLength(0);

    enzymeWrapper.find('PureMetadataForm').props().onSubmit({ title: dummyTopic.title, description: dummyTopic.description });
    expect(dummyDispatch).toHaveBeenCalledWith(actions.update(dummyTopic.id, dummyTopic.title, dummyTopic.description));
    enzymeWrapper.update();

    expect(enzymeWrapper.find('PureMetadataForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="topic-metadata-title"]').hostNodes()).toHaveLength(1);
  });

});
