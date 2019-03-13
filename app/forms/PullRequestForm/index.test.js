// @flow

import * as React from 'react';
import { shallow } from 'enzyme';

import { PurePullRequestForm, type PullRequestFormValues } from '.';

describe(`PullRequestForm`, (): void => {

  let dummyFormProps: PullRequestFormValues;
  let dummyOnSubmit: any;

  beforeEach((): void => {
    dummyFormProps = {
      message: 'dummyMessage',
    };
    dummyOnSubmit = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PurePullRequestForm onSubmit={dummyOnSubmit} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`validates form props`, (): void => {
    const enzymeWrapper = shallow(<PurePullRequestForm onSubmit={dummyOnSubmit} />);
    const validate = enzymeWrapper.instance().validateForm;

    expect(validate(dummyFormProps)).toStrictEqual({});

    expect(validate({ ...dummyFormProps, message: '' })).toHaveProperty('message');
  });

});
