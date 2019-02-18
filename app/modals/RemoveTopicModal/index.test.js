// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { DummyProviders, dummyTopicData } from 'lib/testResources';
import topics from 'modules/topics';

import RemoveTopicModal, { PureRemoveTopicModal } from '.';

describe(`RemoveTopicModal`, (): void => {

  let dummyTopic: topics.model.Topic;
  let dummyOnSubmit: any;
  let dummyOnCancel: any;

  beforeEach((): void => {
    dummyTopic = { ...dummyTopicData.topic };
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureRemoveTopicModal topic={dummyTopic} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`renders the RemoveTopic modal form and submit/cancel buttons, when the passed isOpen prop is TRUE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <RemoveTopicModal topic={dummyTopic} isOpen={true} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('[data-test-id="remove-topic-modal-content"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="remove-topic-modal-submit-button"]').hostNodes()).toHaveLength(1);
    expect(enzymeWrapper.find('[data-test-id="remove-topic-modal-cancel-button"]').hostNodes()).toHaveLength(1);
  });

  it(`does not render the RemoveTopic modal form and submit/cancel buttons, when the passed isOpen prop is FALSE`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <RemoveTopicModal topic={dummyTopic} isOpen={false} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureRemoveTopicForm')).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="remove-topic-modal-submit-button"]').hostNodes()).toHaveLength(0);
    expect(enzymeWrapper.find('[data-test-id="remove-topic-modal-cancel-button"]').hostNodes()).toHaveLength(0);
  });

  it(`calls the passed onSubmit callback when the submit button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <RemoveTopicModal topic={dummyTopic} isOpen={true} onSubmit={dummyOnSubmit} onCancel={dummyOnCancel} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="remove-topic-modal-submit-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).toHaveBeenCalledTimes(1);
    expect(dummyOnCancel).not.toHaveBeenCalled();
  });

  it(`calls the passed onCancel callback when the cancel button is clicked`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <RemoveTopicModal topic={dummyTopic} isOpen={true} onSubmit={dummyOnSubmit} onCancel={dummyOnCancel} />
      </DummyProviders>,
    );

    enzymeWrapper.find('[data-test-id="remove-topic-modal-cancel-button"]').hostNodes().simulate('click');
    expect(dummyOnSubmit).not.toHaveBeenCalled();
    expect(dummyOnCancel).toHaveBeenCalledTimes(1);
  });

});
