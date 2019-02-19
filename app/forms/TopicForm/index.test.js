// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders } from 'lib/testResources';

import TopicForm, { PureTopicForm, type TopicFormValues } from '.';

describe(`TopicForm`, (): void => {

  let dummyFormProps: TopicFormValues;
  let dummyOnSubmit: any;

  beforeEach((): void => {
    dummyFormProps = {
      title: 'dummyTitle',
      description: 'dummyDescription',
    };
    dummyOnSubmit = jest.fn();
  });

  it(`renders default buttons if no children are specified`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <TopicForm onSubmit={dummyOnSubmit} />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('PureSubmitButtonGroup')).toHaveLength(1);
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureTopicForm onSubmit={dummyOnSubmit} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`allows rendering children instead of default form buttons`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <TopicForm onSubmit={dummyOnSubmit}>
          <p data-test-id="test-form-children">replacement submit buttons would go here</p>
        </TopicForm>
      </DummyProviders>,
    );
    expect(enzymeWrapper.find('[data-test-id="test-form-children"]')).toHaveLength(1);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PureTopicForm onSubmit={dummyOnSubmit} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    // Title of length 101
    const tooLongTitle = new Array(102).join('X');

    // Description of length 201
    const tooLongDescription = new Array(202).join('X');

    expect(validate({ ...dummyFormProps, title: '' })).toHaveProperty('title');
    expect(validate({ ...dummyFormProps, title: 'abcd' })).not.toHaveProperty('title');
    expect(validate({ ...dummyFormProps, title: tooLongTitle })).toHaveProperty('title');

    expect(validate({ ...dummyFormProps, description: '' })).not.toHaveProperty('description');
    expect(validate({ ...dummyFormProps, description: tooLongDescription })).toHaveProperty('description');
  });

});
