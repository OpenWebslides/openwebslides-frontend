// @flow

const alerts = {
  menu: {
    empty: 'You don\'t have any alerts right now',
    recent: 'Recent',
    earlier: 'Earlier',
    updated: 'There is {{count}} update available for **{{topicTitle}}**',
    updated_plural: 'There are {{count}} updates available for **{{topicTitle}}**',
  },
  actionForType: {
    'alertTypes/PR_SUBMITTED': '**{{userName}}** submitted changes on your topic **{{topicTitle}}**',
    'alertTypes/PR_ACCEPTED': '**{{userName}}** approved your changes on **{{topicTitle}}**',
    'alertTypes/PR_REJECTED': '**{{userName}}** rejected your changes on **{{topicTitle}}**',
  },
};

export default alerts;
