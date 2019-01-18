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
      text: 'Wants to integrate {{count}} updates into <0>{{targetTopicTitle}}</0> from <1>{{sourceTopicTitle}}</1>',
    },
    state: {
      titleForState: {
        'pullRequestStates/PENDING': 'Contribution pending review',
        'pullRequestStates/READY': 'Contribution pending review',
        'pullRequestStates/WORKING': 'Contribution pending review',
        'pullRequestStates/INCOMPATIBLE': 'Contribution incompatible',
        'pullRequestStates/ACCEPTED': 'Contribution accepted',
        'pullRequestStates/REJECTED': 'Contribution rejected',
      },
      textForState: {
        'pullRequestStates/PENDING': 'The contribution is in the process of being reviewed. Once the topic owner or one of its collaborators have reviewed the updates, the contribution will be accepted and integrated into the original topic. Alternatively, the reviewer can choose to reject the contribution and not integrate the updates into the topic',
        'pullRequestStates/READY': 'The contribution is in the process of being reviewed. Once the topic owner or one of its collaborators have reviewed the updates, the contribution will be accepted and integrated into the original topic. Alternatively, the reviewer can choose to reject the contribution and not integrate the updates into the topic',
        'pullRequestStates/WORKING': 'The contribution is in the process of being reviewed. Once the topic owner or one of its collaborators have reviewed the updates, the contribution will be accepted and integrated into the original topic. Alternatively, the reviewer can choose to reject the contribution and not integrate the updates into the topic',
        'pullRequestStates/INCOMPATIBLE': '<0>{{sourceTopicTitle}}</0> is not compatible with <1>{{targetTopicTitle}}</1>. Please update the topic',
        'pullRequestStates/ACCEPTED': 'The contribution was accepted, and the updates are integrated into the original topic',
        'pullRequestStates/REJECTED': 'The contribution was rejected',
      },
    },
  },
};

export default pullRequests;
