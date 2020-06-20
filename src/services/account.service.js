import { BehaviorSubject } from 'rxjs';

import { history } from '../helpers';

const userSubject = new BehaviorSubject(null);

export const accountService = {
  login,
  logout,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

function login(email) {
  return userSubject.next(email);
}

function logout() {
  userSubject.next(null);
  history.push('/account/login');
}
