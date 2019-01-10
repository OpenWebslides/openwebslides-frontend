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
    title: 'Send updates',
    access: 'The owner and collaborators of <0>{{upstreamTopicTitle}}</0> will be able to see and respond to your contribution',
    description: 'You are about to send the updates you\'ve made in **{{topicTitle}}** to the original topic. Please enter a small message that briefly describes your contribution. Only the topic owner and collaborators will see this message.',
  },
};

export default modals;
