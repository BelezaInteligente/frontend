import axios from 'axios';

export {
  // eslint-disable-next-line
  handleLogin,
  // eslint-disable-next-line
  handleForgotPassword,
  // eslint-disable-next-line
  handleResetPassword,
  // eslint-disable-next-line
  handlePassword,
  // eslint-disable-next-line
  handleUserAdd,
  // eslint-disable-next-line
  handleUserUpdate,
  // eslint-disable-next-line
  handleUserDelete,
  // eslint-disable-next-line
  handleGroupAdd,
  // eslint-disable-next-line
  handleGroupUpdate,
  // eslint-disable-next-line
  handleGroupDelete,
  // eslint-disable-next-line
  handleGoalAdd,
  // eslint-disable-next-line
  handleGoalUpdate,
  // eslint-disable-next-line
  handleGoalDelete,
  // eslint-disable-next-line
  getAllUsers,
  // eslint-disable-next-line
  getAllGoalsUsers,
  // eslint-disable-next-line
  getAllGroups,
  // eslint-disable-next-line
  getGoalById,
  // eslint-disable-next-line
  getToken,
  // eslint-disable-next-line
  getEmbedToken
};

const axiosAPI = axios.create({
  //baseURL: "http://localhost:4000/api/v1"
  baseURL: "https://belezainteligente.app/api/v1"
  //baseURL: "http://belezainteligente-app.umbler.net/api/v1"
});

// Account

const getToken = () => ({
  Authorization: `Bearer ${localStorage.getItem("appToken")}`
})

const handleLogin = async (values) => {
  const { data } = await axiosAPI.post('/authenticate', values)
  return data
};

const handleForgotPassword = async (email) => {
  const data = await axiosAPI.post('/forgotpassword', { email });
  return data;
};

async function handleResetPassword(token, values) {
  const data = await axiosAPI.post(`/resetpassword/${token}`, values);
  return data;
};

// Users
const getAllUsers = async () => {
  const headers = getToken();
  const data = await axiosAPI.get(`/admin/users`, { headers });
  return data;
};

const handleUserAdd = async (values) => {
  const headers = getToken();

  const data = await axiosAPI.post(`/admin/users/add`, values, { headers });
  return data;
};

const handleUserUpdate = async (userID, values) => {
  const headers = getToken();
  const data = await axiosAPI.put(`/admin/users/${userID}`, values, { headers });
  return data;
};

const handleUserDelete = async (userID) => {
  const headers = getToken();
  const data = await axiosAPI.delete(`/admin/users/${userID}`, { headers });
  return data;
};

const handlePassword = async (userID, values) => {
  const headers = getToken();
  const data = await axiosAPI.put(`/user/profile/${userID}`, values, { headers });
  return data;
};

// Groups
const getAllGroups = async () => {
  const headers = getToken();
  const data = await axiosAPI.get(`/groups`, { headers });
  return data;
};

const handleGroupAdd = async (values) => {
  const headers = getToken();

  const data = await axiosAPI.post(`/admin/groups/add`, values, { headers });
  return data;
};

const handleGroupUpdate = async (groupID, values) => {
  const headers = getToken();
  const data = await axiosAPI.put(`/admin/groups/${groupID}`, values, { headers });
  return data;
};

const handleGroupDelete = async (groupID) => {
  const headers = getToken();
  const data = await axiosAPI.delete(`/admin/groups/${groupID}`, { headers });
  return data;
};

// Goals
const getAllGoalsUsers = async () => {
  const headers = getToken();
  const data = await axiosAPI.get(`/admin/goals`, { headers });
  return data;
};

const getGoalById = async userID => {
  const headers = getToken();
  const data = await axiosAPI.get(`/goals/${userID}`, { headers });
  return data;
};

const handleGoalAdd = async (values) => {
  const headers = getToken();
  const data = await axiosAPI.post(`/admin/goals/add`, values, { headers });
  return data;
};

const handleGoalUpdate = async (goalID, values) => {
  const headers = getToken();
  const data = await axiosAPI.put(`/goals/${goalID}`, values, { headers });
  return data;
};

const handleGoalDelete = async (goalID) => {
  const headers = getToken();
  const data = await axiosAPI.delete(`/admin/goals/${goalID}`, { headers });
  return data;
};

// PowerBI Token
const getEmbedToken = async (groupID, reportID) => {
  const headers = getToken();
  const data = await axiosAPI.get(`/report/${groupID}/${reportID}`, { headers });
  return data;
};