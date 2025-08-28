import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, updatedFields) => {
  const config = { headers: { Authorization: token } };
  const { data } = await axios.put(`${baseUrl}/${id}`, updatedFields, config);
  return data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, setToken, create, update, remove };
