// @flow

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { DummyProviders, dummyProviderProps } from 'lib/testResources';
import { type DropdownValue } from 'types/forms';
import topics from 'modules/topics';

import AccessLevelForm, { PureAccessLevelForm } from '.';

describe(`AccessLevelForm`, (): void => {

  let dummyAccess: topics.model.AccessType;
  let dummyAvailableAccess: $ReadOnlyArray<DropdownValue>;
  let dummyOnSubmit: any;

  beforeEach((): void => {
    dummyAccess = topics.model.accessTypes.PUBLIC;
    dummyAvailableAccess = [
      { key: topics.model.accessTypes.PUBLIC, value: topics.model.accessTypes.PUBLIC, text: 'Public' },
      { key: topics.model.accessTypes.PROTECTED, value: topics.model.accessTypes.PROTECTED, text: 'Protected' },
      { key: topics.model.accessTypes.PRIVATE, value: topics.model.accessTypes.PRIVATE, text: 'Private' },
    ];
    dummyOnSubmit = jest.fn();
  });

  it(`renders without errors`, (): void => {
    const enzymeWrapper = shallow(
      <PureAccessLevelForm {...dummyProviderProps.translatorProps} />,
    );
    expect(enzymeWrapper.isEmptyRender()).toStrictEqual(false);
  });

  it(`renders a dropdown box with the passed available access`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AccessLevelForm
          access={dummyAccess}
          availableAccess={dummyAvailableAccess}
        />
      </DummyProviders>,
    );

    expect(enzymeWrapper.find('DropdownItem')).toHaveLength(3);
    expect(enzymeWrapper.find(`DropdownItem[value="${topics.model.accessTypes.PUBLIC}"]`)).toHaveLength(1);
    expect(enzymeWrapper.find(`DropdownItem[value="${topics.model.accessTypes.PROTECTED}"]`)).toHaveLength(1);
    expect(enzymeWrapper.find(`DropdownItem[value="${topics.model.accessTypes.PRIVATE}"]`)).toHaveLength(1);
  });

  it(`calls the onSubmit handler passed when the dropdown value changes`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AccessLevelForm
          access={dummyAccess}
          availableAccess={dummyAvailableAccess}
          onSubmit={dummyOnSubmit}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('SemanticField').props().onChange('newValue');
    expect(dummyOnSubmit).toHaveBeenCalledWith({ access: 'newValue' });
  });

  it(`calls the onSubmit handler passed when the dropdown value stays the same`, (): void => {
    const enzymeWrapper = mount(
      <DummyProviders>
        <AccessLevelForm
          access={dummyAccess}
          availableAccess={dummyAvailableAccess}
          onSubmit={dummyOnSubmit}
        />
      </DummyProviders>,
    );

    enzymeWrapper.find('SemanticField').props().onChange(dummyAccess);
    expect(dummyOnSubmit).not.toHaveBeenCalled();
  });

});
