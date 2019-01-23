// @flow

import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { dummyProviderProps, DummyProviders } from 'lib/testResources';

import * as m from '../../../model';

import AccessControl, { PureAccessControl } from '.';

describe(`AccessControl`, (): void => {

  let dummyOnSubmit: any;
  let dummyOnCancel: any;
  let dummyAccess: m.AccessType;

  beforeEach((): void => {
    dummyOnSubmit = jest.fn();
    dummyOnCancel = jest.fn();
    dummyAccess = m.accessTypes.PUBLIC;
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAccessControl {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toBe(false);
  });

  it(`calls the passed onSubmit callback when the access level form onSubmit handler is called`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AccessControl
          onSubmit={dummyOnSubmit}
          access={dummyAccess}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('PureAccessLevelForm').props().onSubmit();
    expect(dummyOnSubmit).toHaveBeenCalledTimes(1);
    expect(dummyOnCancel).not.toHaveBeenCalled();
  });

});
