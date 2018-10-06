// @flow

import _ from 'lodash';

import * as m from '../../model';

const isEmpty = (contentItem: m.ContentItem): boolean => {
  if (_.includes(m.plainTextContentItemTypes, contentItem.type)) {
    return (contentItem.text == null || contentItem.text === '');
  }
  else {
    return false;
  }
};

export default isEmpty;
