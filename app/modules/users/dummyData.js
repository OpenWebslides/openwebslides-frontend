// @flow

import type { UsersState } from './model';

export const dummyUsers: UsersState = {
  jasperdhae: {
    id: 'jasperdhae',
    firstName: 'Jasper',
    lastName: 'D\'haene',
    email: 'jasper.dhaene@hotmail.com',
    password: 'jasperswachtwoord',
  },
  florian123: {
    id: 'florian123',
    firstName: 'Florian',
    lastName: 'Dejonckheere',
    email: 'florian@florian.be',
    password: 'florianswachtwoord',
  },
  jantje1234: {
    id: 'jantje1234',
    firstName: 'Jan',
    lastName: '',
    email: 'Jantje@achterdenhoek.be',
    password: 'jantjeswachtwoord',
  },
};
