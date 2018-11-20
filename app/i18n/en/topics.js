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
    message: 'Message',
    errors: {
      title: 'Title cannot be empty',
      message: {
        empty: 'Message cannot be empty',
        length: 'Message must be between 5 and 60 characters',
      },
    },
  },
  modals: {
    remove: {
      message: 'Are you sure you want to delete this topic?',
    },
    unsavedChanges: {
      message: 'You have unsaved changes, are you sure you wish to discard these changes and leave?',
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
