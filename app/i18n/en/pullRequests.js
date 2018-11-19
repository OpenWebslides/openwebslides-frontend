// @flow

const pullRequests = {
  newPullRequestCard: {
    title: 'Send updates',
    description: 'You are about to send the changes you\'ve made in **{{topicTitle}}** to the original topic. Please enter a small message that briefly describes the changes you\'ve made. Only the original topic author and collaborators will see this message.',
    noUpstream: {
      title: 'No original topic',
      description: 'The topic you selected does not have an original topic. You will not be able to send the changes you\'ve made.',
    },
  },
  forms: {
    message: 'Message',
    errors: {
      title: 'Message cannot be empty',
    },
  },
  button: {
    submit: 'Send updates',
  },
};

export default pullRequests;
