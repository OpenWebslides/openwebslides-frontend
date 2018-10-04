// @flow

import _ from 'lodash';
import * as React from 'react';
import { shallow } from 'enzyme';

import { dummyProviderProps } from 'lib/testResources';

import { PureCoursePage } from '.';

describe(`CoursePage`, (): void => {

  let dummyTopicId: string;

  beforeEach((): void => {
    dummyTopicId = 'dummyTopicId';
  });

  it(`renders without errors`, (): void => {
    const fixedRouterProps = _.set(_.cloneDeep(dummyProviderProps.routerProps), 'match.params.topicId', dummyTopicId);

    const enzymeWrapper = shallow(
      <PureCoursePage {...fixedRouterProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

  it(`renders NULL when match.params.id is NULL`, (): void => {
    const enzymeWrapper = shallow(
      <PureCoursePage {...dummyProviderProps.routerProps} />,
    );

    expect(enzymeWrapper.isEmptyRender()).toEqual(true);
  });

});
