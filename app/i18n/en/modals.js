// @flow

const modals = {
  commit: {
    title: 'Save changes',
    message: 'Enter a small message that briefly describes the changes you\'ve made. This message will be visible to the topic owner and collaborators.',
  },
  removeTopic: {
    message: 'Are you sure you want to delete this topic?',
  },
  pullRequest: {
    title: 'Share updates',
    description: 'You are about to send the changes you\'ve made in **{{topicTitle}}** to the original topic. Please enter a small message that briefly describes the changes you\'ve made. Only the original topic author and collaborators will see this message.',
  },
};

export default modals;
