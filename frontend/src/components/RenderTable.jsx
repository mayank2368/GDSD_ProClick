/*
 * Contributor: Abdullah Khalid, Tarmah Bin Iqbal and Mayank Chetan Parvatia
 */

import React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserToken } from "../redux/slices/auth";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import AddTaskIcon from "@mui/icons-material/AddTask";
import Alert from "@mui/material/Alert";

export default function BasicTable({ users, setRerender }) {
  const token = useSelector(selectUserToken);
  const [addBlockStatus, setAddBlockStatus] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const deleteUser = (id) => {
    let DELETE_URL =
      // eslint-disable-next-line no-undef
      process.env.REACT_APP_API_BASE_URL + "/user/removeuser/" + id;
    axios
      .delete(DELETE_URL, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        setRerender(true);
      })
      .catch((err) => console.log(err));
  };
  let BLOCK_URL =
    // eslint-disable-next-line no-undef
    process.env.REACT_APP_API_BASE_URL + "/user/blockuser";
  const blockUser = (id) => {
    const bodyParameters = {
      user_id: id,
      is_blocked: 1,
    };

    axios
      .post(BLOCK_URL, bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAddBlockStatus(true);
        setResponseMsg("User has been blocked!");
        setTimeout(() => {
          setAddBlockStatus(false);
          setResponseMsg("");
          setRerender(true);
        }, 2000);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  //to unblock the user
  const unblockUser = (id) => {
    let BLOCK_URL = process.env.REACT_APP_API_BASE_URL + "/user/unblockuser";
    const bodyParameters = {
      user_id: id,
      is_blocked: 0,
    };

    axios
      .post(BLOCK_URL, bodyParameters, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAddBlockStatus(true);
        setResponseMsg("User has been unblocked!");
        setTimeout(() => {
          setAddBlockStatus(false);
          setResponseMsg("");
          setRerender(true);
        }, 2000);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <TableContainer component={Paper}>
      {addBlockStatus && <Alert severity="success">{responseMsg}</Alert>}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Delete</TableCell>
            <TableCell align="right">Block/Unblock User</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((row) => (
            <TableRow
              key={row?.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.email}
              </TableCell>
              <TableCell align="right" scope="row">
                {row?.first_name}
              </TableCell>
              <TableCell align="right" onClick={() => console.log("hsdf")}>
                {row?.last_name}
              </TableCell>
              <TableCell align="right">{row?.role}</TableCell>
              <TableCell onClick={() => deleteUser(row?.id)} align="right">
                <IconButton aria-label="delete" color="primary">
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell
                onClick={() => {
                  row?.is_blocked ? unblockUser(row?.id) : blockUser(row?.id);
                }}
                align="right"
              >
                {row?.is_blocked ? (
                  <IconButton aria-label="block" color="primary">
                    <AddTaskIcon />
                  </IconButton>
                ) : (
                  <IconButton aria-label="block" color="primary">
                    <BlockIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
