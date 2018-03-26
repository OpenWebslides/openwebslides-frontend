// @flow

import type { UsersState } from './model';

export const dummyUsers: UsersState = {
  markfrank1: {
    id: 'markfrank1',
    firstName: 'Mark F.',
    lastName: 'Dobrovski',
    email: 'mark.dobrovski@hotmail.com',
    password: 'markswachtwoord',
  },
  johan12345: {
    id: 'johan12345',
    firstName: 'Johan',
    lastName: 'Johansson',
    email: 'Johan@Johansson.se',
    password: 'johanswachtwoord',
  },
  jantje1234: {
    id: 'jantje1234',
    firstName: 'Jantje',
    lastName: 'Van Achter Den Hoek',
    email: 'Jantje@achterdenhoek.be',
    password: 'jantjeswachtwoord',
  },
};
