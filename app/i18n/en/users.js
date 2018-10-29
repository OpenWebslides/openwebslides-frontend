// @flow

const users = {
  user: 'User',
  headings: {
    profile: 'Profile',
  },
  actions: {
    signOut: 'Sign out',
    viewProfile: 'View profile',
    editProfile: 'Edit profile',
  },
  forms: {
    email: 'Email',
    name: 'Name',
    password: 'Password',
    repeatPassword: 'Repeat your password',
    tos: 'I agree to the Terms of Service and Privacy Policy',
    errors: {
      email: 'Email cannot be empty',
      password: 'Password must be longer than 6 characters',
      repeatPassword: 'Passwords must match',
      resetPasswordToken: 'Reset password token is invalid',
      name: 'Name cannot be empty',
      tosAccepted: 'You must accept the Terms of Service and Privacy Policy',
    },
  },
};

export default users;
