/*
 * Contributor: Ahmed Hassan and Mayank Chetan Parvatia
 */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { selectUserToken } from "../../redux/slices/auth";
import { selectUserID } from "../../redux/slices/auth";
// import { selectUserFirstName } from "../../redux/slices/auth";
// import { selectUserLastName } from "../../redux/slices/auth";
// import { selectUserEmailId } from "../../redux/slices/auth";
// import { selectUserRole } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
//import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import "./UserDetails.css";

function UserDetails() {
  const [user, setUser] = useState("");
  const token = useSelector(selectUserToken);
  const userId = useSelector(selectUserID);
  // const first_name = useSelector(selectUserFirstName);
  // const last_name = useSelector(selectUserLastName);
  // const emailId = useSelector(selectUserEmailId);
  // const Role = useSelector(selectUserRole);

  useEffect(() => {
    let API = process.env.REACT_APP_API_BASE_URL + "/user/getuserdetails";

    const HEADER = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const bodyParameters = {
      user_id: userId,
    };
    axios
      .post(API, bodyParameters, HEADER)
      .then((res) => {
        console.log(res.data.result);
        setUser(res.data.result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="card">
      {console.log(user)}
      <Typography variant="h5" component="div">
        User Info!
      </Typography>

      <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              <h1>{user.id}</h1>User id
            </Typography>
            <Typography variant="h5" component="div">
              <h1>{user.first_name}</h1>First name
            </Typography>
            <Typography variant="h5" component="div">
              <h1>{user.last_name}</h1>Last name
            </Typography>
            <Typography variant="h5" component="div">
              <h1>{user.email}</h1>Email id
            </Typography>
            <Typography variant="h5" component="div">
              <h1>{user.role}</h1>Role
            </Typography>
          </CardContent>
          {/* <CardActions>
            <Button size="large">Update info</Button>
          </CardActions> */}
          <Button variant="outlined">
            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/updatedetails"
              exact
              //state={data}
            >
              Update Info
            </NavLink>
          </Button>
        </Card>
      </Box>
    </div>
  );
}
export default UserDetails;
