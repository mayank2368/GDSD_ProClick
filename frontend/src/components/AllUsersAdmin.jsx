/*
 * Contributor: Abdullah Khalid and Tarmah Bin Iqbal
 */

import React, { useEffect, useState } from "react";
import { selectUserToken } from "../redux/slices/auth";
import { useSelector } from "react-redux";
import axios from "axios";
import RenderTable from "./RenderTable";
import { CONSTANTS } from "../utils";

function AllUsersAdmin() {
  const [users, setUsers] = useState([]);
  const token = useSelector(selectUserToken);
  const [rerender, setRerender] = useState(false);
  // eslint-disable-next-line no-undef
  let USERS_URL = process.env.REACT_APP_API_BASE_URL + "/user/allusers";
  useEffect(() => {
    loadUsers();
  }, [rerender]);

  function loadUsers() {
    // prettier-ignore
    axios
    // prettier-ignore
      .post(USERS_URL, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(
          res?.data?.result?.filter(
            (user) => user?.role != CONSTANTS.ROLES.ADMIN
          )
        );
      })
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <RenderTable users={users} setRerender={setRerender} />
    </div>
  );
}

export default AllUsersAdmin;
