import { BehaviorSubject } from 'rxjs';

import { history } from '../helpers';
import { handleLogin, handleForgotPassword, handleResetPassword } from '../helpers';

const userSubject = new BehaviorSubject(null);

export const accountService = {
  login,
  logout,
  forgotPassword,
  resetPassword,
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
};

async function login(values) {
  const user = await handleLogin(values);
  localStorage.setItem('appToken', user.accessJwtToken);
  localStorage.setItem('userRole', user.role);

  userSubject.next(user);
  return user;
};

function logout() {
  localStorage.clear();
  userSubject.next(null);
  history.push('/account/login');
};

async function forgotPassword(email) {
  return await handleForgotPassword(email);
}

async function resetPassword(token, params) {
  return await handleResetPassword(token, params);;
};