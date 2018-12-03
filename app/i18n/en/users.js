// @flow

const users = {
  user: 'User',
  headings: {
    profile: 'Profile',
  },
  actions: {
    signOut: 'Sign out',
    profile: 'My profile',
    settings: 'Settings',
  },
  forms: {
    email: 'Email',
    name: 'Name',
    password: 'Password',
    repeatPassword: 'Repeat your password',
    tosDescription: 'To use the service, you must agree to and comply with the <0>Terms of Service</0>',
    tos: 'I agree to the Terms of Service',
    errors: {
      email: 'Email cannot be empty',
      password: 'Password must be longer than 6 characters',
      repeatPassword: 'Passwords must match',
      resetPasswordToken: 'Reset password token is invalid',
      name: 'Name cannot be empty',
      tosAccepted: 'You must accept the Terms of Service',
    },
  },
};

export default users;
