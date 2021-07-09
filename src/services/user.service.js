import {
  getAllUsers,
  getEmbedToken,
  handleUserAdd,
  handleUserUpdate,
  handleUserDelete,
  handlePassword
} from '../helpers';

export const userService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updatePassword,
  getEmbedTokenBI
};

async function getUsers() {
  const users = await getAllUsers();
  return users;
};

async function createUser(values) {
  const user = await handleUserAdd(values);
  return user;
};

async function updateUser(id, values) {
  const users = await handleUserUpdate(id, values);
  return users;
};

async function deleteUser(id) {
  const user = await handleUserDelete(id);
  return user;
};

async function updatePassword(id, params) {
  const user = await handlePassword(id, params);
  return user;
};

async function getEmbedTokenBI(groupID, reportID) {
  const data = await getEmbedToken(groupID, reportID);
  return data;
}