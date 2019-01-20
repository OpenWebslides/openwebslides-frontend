// @flow

const pullRequests = {
  forms: {
    message: 'Message',
    feedback: 'Feedback',
    errors: {
      message: 'Message cannot be empty',
      feedback: 'Feedback cannot be empty',
    },
  },
  button: {
    submit: 'Send updates',
    accept: 'Accept and integrate',
    reject: 'Reject',
  },
  ribbonForState: {
    'pullRequestStates/PENDING': 'Pending review',
    'pullRequestStates/READY': 'Pending review',
    'pullRequestStates/WORKING': 'Pending review',
    'pullRequestStates/INCOMPATIBLE': 'Incompatible',
    'pullRequestStates/ACCEPTED': 'Accepted',
    'pullRequestStates/REJECTED': 'Rejected',
  },
  comments: {
    submitted: 'Wants to integrate <0>{{updateCount}} updates</0> into <1>{{targetTopicTitle}}</1> from <2>{{sourceTopicTitle}}</2>',
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
        'pullRequestStates/PENDING': 'The contribution is in the process of being reviewed. Once the topic owner or one of its collaborators have reviewed the updates, the contribution will be accepted and integrated into the original topic. Alternatively, the contribution can also be rejected if it is not sufficient.',
        'pullRequestStates/READY': 'The contribution is in the process of being reviewed. Once the topic owner or one of its collaborators have reviewed the updates, the contribution will be accepted and integrated into the original topic. Alternatively, the contribution can also be rejected if it is not sufficient.',
        'pullRequestStates/WORKING': 'The contribution is in the process of being reviewed. Once the topic owner or one of its collaborators have reviewed the updates, the contribution will be accepted and integrated into the original topic. Alternatively, the contribution can also be rejected if it is not sufficient.',
        'pullRequestStates/INCOMPATIBLE': '<0>{{sourceTopicTitle}}</0> is not compatible with <1>{{targetTopicTitle}}</1>. Please update the topic',
        'pullRequestStates/ACCEPTED': 'The contribution was accepted, and the updates have been integrated into the original topic',
        'pullRequestStates/REJECTED': 'The contribution was rejected',
      },
    },
    action: 'You can now review the updates in this contribution, and decide if you\'d like to see them integrated into the topic. Providing feedback is mandatory when rejecting a contribution.',
  },
};

export default pullRequests;
