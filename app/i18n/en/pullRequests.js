// @flow

const pullRequests = {
  forms: {
    message: 'Message',
    errors: {
      title: 'Message cannot be empty',
    },
  },
  button: {
    submit: 'Send updates',
  },
  titleForState: {
    'pullRequestStates/PENDING': 'Pending review',
    'pullRequestStates/READY': 'Pending review',
    'pullRequestStates/WORKING': 'Pending review',
    'pullRequestStates/INCOMPATIBLE': 'Incompatible',
    'pullRequestStates/ACCEPTED': 'Accepted',
    'pullRequestStates/REJECTED': 'Rejected',
  },
  comments: {
    submit: {
      timestamp: 'sent updates {{timestamp}}',
      text: '{{userName}} wants to integrate {{count}} updates into <0>{{targetTopicTitle}}</0> from <1>{{sourceTopicTitle}}</1>',
    },
  },
};

export default pullRequests;
