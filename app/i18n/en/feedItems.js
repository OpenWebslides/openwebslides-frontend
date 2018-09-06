// @flow

const feedItems = {
  feedItem: 'feedItem',
  feed: {
    header: 'Recent activity',
  },
  actionForType: {
    'feedItemTypes/COMMENT': 'commented on',
    'feedItemTypes/CREATE': 'created',
    'feedItemTypes/UPDATE': 'updated',
    'feedItemTypes/FORK': 'forked',
  },
};

export default feedItems;
