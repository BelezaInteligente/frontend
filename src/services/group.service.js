import { getAllGroups, handleGroupAdd, handleGroupUpdate, handleGroupDelete } from '../helpers';

export const groupService = {
  getGroups,
  createGroup,
  updateGroup,
  deleteGroup,
};

async function getGroups() {
  const groups = await getAllGroups();
  return groups;
};

async function createGroup(values) {
  const group = await handleGroupAdd(values);
  return group;
};

async function updateGroup(id, values) {
  const group = await handleGroupUpdate(id, values);
  return group;
};

async function deleteGroup(id) {
  const group = await handleGroupDelete(id);
  return group;
};