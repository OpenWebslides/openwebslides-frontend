// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureNewTopicPage } from '../NewTopicPage';

describe(`NewTopicPage`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureNewTopicPage
        topicIds={[]}
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
