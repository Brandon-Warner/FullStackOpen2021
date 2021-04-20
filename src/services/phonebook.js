import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, changedPerson) => {
  return axios.put(`${baseUrl}/${id}`, changedPerson);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll: getAll,
  create: create,
  remove: remove,
  update: update,
};
