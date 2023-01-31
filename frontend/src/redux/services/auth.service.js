/*
 * Contributor: Tarmah Bin Iqbal
 */

import axios from "axios";
import { localUserStorageHelper } from "../../utils";

// eslint-disable-next-line no-undef
const API_URL = process.env.REACT_APP_API_BASE_URL + "/user/";
// const API_URL = "https://proclick2022.azurewebsites.net/api/user/";

const register = (email, password, firstName, lastName, role) => {
  return axios.post(API_URL + "signup", {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    role: role,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.data.token) {
        console.log("token ####", response.data.token);
        localUserStorageHelper.store(undefined, response.data);
      }

      return response.data;
    });
};

const logout = () => {
  localUserStorageHelper.remove();
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
