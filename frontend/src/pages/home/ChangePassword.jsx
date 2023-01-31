/*
 * Contributor: Ahmed Hassan and Mayank Chetan Parvatia
 */

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MuiAlert from "@mui/material/Alert";
import {
  TextField,
  Typography,
  //Link,
  Button,
  Snackbar,
} from "@mui/material";
import {
  selectUser,
  selectUserID,
  selectUserToken,
} from "../../redux/slices/auth";
import { selectErrorMessage } from "../../redux/slices/errorMessage";
import axios from "axios";
//import { CONSTANTS } from "../../utils";

//import "./SignUp.css";

// const validateEmail = (email) => {
//   return String(email)
//     .toLowerCase()
//     .match(
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//     );
// };

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChangePassword = () => {
  const { isSignedUp } = useSelector(selectUser);
  const { ErrorMessage } = useSelector(selectErrorMessage);
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [passwordThree, setPasswordThree] = useState("");
  const userId = useSelector(selectUserID);
  const token = useSelector(selectUserToken);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  //const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (isSignedUp) navigate(`/changepassword`);
  }, [isSignedUp]);

  useEffect(() => {
    if (ErrorMessage) {
      setMessage(ErrorMessage);
      handleSnackBarClick();
    }
  }, [ErrorMessage]);

  const handleSnackBarClick = () => {
    setOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = (e) => {
    const HEADER = {
      headers: { Authorization: `Bearer ${token}` },
    };
    let body = {
      user_id: userId,
      password: password,
      new_password: passwordTwo,
    };
    e.preventDefault();

    if (passwordTwo === passwordThree) {
      //dispatch(register({ password }));
      let API = process.env.REACT_APP_API_BASE_URL + `/user/change_password`;
      axios
        .post(API, body, HEADER)
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            if (res.result) {
              <Alert severity="success">{res.message}</Alert>;
            } else {
              <Alert severity="warning">{res.message}</Alert>;
            }
          }, 3000);
        })
        .catch((err) => console.log(err));
    } else if (password != passwordTwo) {
      setMessage("Passwords do not match!");
      handleSnackBarClick();
    }
  };

  return (
    <div sx={{ mt: 10, mr: 10, ml: 10, width: "30%" }}>
      <Typography variant="h4" sx={{ mt: 10, mr: 10, ml: 10, width: "30%" }}>
        Update Your Password
      </Typography>
      {/* <Typography variant="p" sx={{ mt: 20, mr: 10, ml: 10, width: "30%" }}>
        Already A Member? <Link href="signin">Log In</Link>
      </Typography> */}

      <TextField
        margin="normal"
        type="password"
        required
        id="old-password"
        label="Old Password"
        name="old-password"
        autoComplete="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextField
        margin="normal"
        type="password"
        required
        id="new-password"
        label="Enter New Password"
        name="new-password"
        autoComplete="password"
        autoFocus
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
      />
      <TextField
        margin="normal"
        type="password"
        required
        id="re-password"
        label="Re Enter Password"
        name="re-password"
        autoComplete="password"
        autoFocus
        value={passwordThree}
        onChange={(e) => setPasswordThree(e.target.value)}
      />

      <Button
        sx={{ mt: 4, ml: 10, mb: 3 }}
        variant="contained"
        color="success"
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleSnackBarClose}
        >
          <Alert
            onClose={handleSnackBarClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ChangePassword;
