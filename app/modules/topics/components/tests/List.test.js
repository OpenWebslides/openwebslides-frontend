// @flow
/* eslint-disable padded-blocks, flowtype/no-weak-types */

import * as React from 'react';
import { shallow } from 'enzyme';

import { PureList } from '../List';

describe(`List`, (): void => {

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureList
        topicIds={[]}
        lastTopicId="abcde"
        onAddButtonClick={(): void => {}}
        onEditButtonClick={(): void => {}}
        onRemoveButtonClick={(): void => {}}
        t={(key: ?string): string => key || 'string'}
        i18nLoadedAt={new Date()}
        i18n={{}}
      />,
    );
    expect(enzymeWrapper.isEmptyRender()).toEqual(false);
  });

});
