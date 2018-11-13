// @flow

const pullRequests = {
  newPullRequestCard: {
    title: 'Send changes',
    description: 'You are about to send changes you\'ve made in **{{topicTitle}}** to the original topic. Please enter a small message that briefly describes the changes you\'ve made. Only the original topic author and collaborators will see this message',
  },
  forms: {
    message: 'Message',
    errors: {
      title: 'Message cannot be empty',
    },
  },
  button: {
    submit: 'Send changes',
  },
};

export default pullRequests;
