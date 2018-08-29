// @flow

const topics = {
  topic: 'topic',
  props: {
    title: 'Title',
    description: 'Description',
    noDescription: 'No description found',
    accessLevel: 'Access level',
  },
  forms: {
    title: 'Title',
    description: 'Description',
    errors: {
      title: 'Title cannot be empty',
    },
  },
  modals: {
    remove: {
      message: 'Are you sure you want to delete this topic?',
    },
    unsavedChanges: {
      message: 'You have unsaved changes, are you sure you wish to discard these changes and leave?',
    },
    save: {
      title: 'Save changes',
      message: 'Enter a small message that briefly describes the changes you\'ve made. This message will be visible to the topic owner and collaborators.',
    },
  },
  sidebars: {
    topicInfo: {
      header: 'Topic Info',
      forkedFrom: 'Copied from ',
    },
    slidePreviews: {
      header: 'Slide Previews',
    },
  },
  newTopicCard: {
    title: 'Create a new topic',
    description: 'Please fill out the following info to create new topic.',
  },
};

export default topics;
