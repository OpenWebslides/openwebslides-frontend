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
};

export default pullRequests;
