import { getAllGoalsUsers, getGoalById, handleGoalAdd, handleGoalUpdate, handleGoalDelete } from '../helpers';

export const goalService = {
  getGoalsUsers,
  getGoalUserById,
  createGoalUser,
  updateGoalUser,
  deleteGoalUser,
};

async function getGoalsUsers() {
  const usersGoals = await getAllGoalsUsers();
  return usersGoals;
};

async function getGoalUserById(id) {
  const goals = await getGoalById(id);
  return goals;
};

async function createGoalUser(values) {
  const goals = await handleGoalAdd(values);
  return goals;
};

async function updateGoalUser(id, values) {
  const goals = await handleGoalUpdate(id, values);
  return goals;
};

async function deleteGoalUser(id) {
  const goals = await handleGoalDelete(id);
  return goals;
};
