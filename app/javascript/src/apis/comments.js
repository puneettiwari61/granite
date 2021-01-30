import axios from "axios";

const create = payload => axios.post("/comments", payload);

const usersApi = {
  create,
};

export default usersApi;
