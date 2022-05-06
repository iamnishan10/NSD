import http from "../http-common";

const login = () => {
  return http.get("/");
};

const getAll = () => {
  return http.get("/users");
};

const get = id => {
  return http.get(`/users/${id}`);
};

const create = data => {
  return http.post("/users", data);
};

const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

const remove = id => {
  return http.delete(`/users/${id}`);
};

const removeAll = () => {
  return http.delete(`/users`);
};

const findByTitle = title => {
  return http.get(`/users?title=${title}`);
};

const UserService = {
  login,
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default UserService;
