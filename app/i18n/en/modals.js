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
    access: 'The owner and collaborators of <0>{{upstreamTopicTitle}}</0> will be able to see and respond to your update request',
    description: 'You are about to send the changes you\'ve made in **{{topicTitle}}** to the original topic. Please enter a small message that briefly describes the changes you\'ve made. Only the original topic author and collaborators will see this message.',
  },
  share: {
    title: 'Share topic',
    accessMessageForType: {
      'topics/PUBLIC': 'This topic is <0>public</0>, which means that everyone with the link will be able to see it.',
      'topics/PROTECTED': 'This topic is <0>protected</0>, which means that everyone with an account on the platform will be able to see it.',
      'topics/PRIVATE': 'This topic is <0>private</0>, which means that only the topic owner and collaborators will be able to see it.',
    },
    panes: {
      url: 'URL',
      embed: 'Embed',
    },
  },
};

export default modals;
