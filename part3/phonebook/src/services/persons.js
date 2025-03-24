import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const updatePerson = (id, updatePerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatePerson);
  return request.then((response) => response.data);
};

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default { getAll, create, remove, updatePerson };
