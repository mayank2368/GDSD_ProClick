/*
 * Contributor: Mayank Chetan Parvatia
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MuiAlert from "@mui/material/Alert";
import {
  TextField,
  Box,
  Typography,
  //Link,
  Button,
  Snackbar,
} from "@mui/material";
import { selectUser, register } from "../../redux/slices/auth";
import { selectErrorMessage } from "../../redux/slices/errorMessage";

//import "./SignUp.css";

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateDetails = () => {
  const { isSignedUp } = useSelector(selectUser);
  const { ErrorMessage } = useSelector(selectErrorMessage);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password] = useState("");
  const [passwordTwo] = useState("");
  const [email, setEmail] = useState("");
  //const [role, setRole] = useState(ROLES.BUYER);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (isSignedUp) navigate(`/signin`);
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
    e.preventDefault();

    if (
      validateEmail(email) &&
      email.includes("hs-fulda.de") &&
      password === passwordTwo
    ) {
      dispatch(register({ email, password, firstName, lastName }));
    } else if (!validateEmail(email) || !email.includes("hs-fulda.de")) {
      setMessage("Please Enter Correct Email");
      handleSnackBarClick();
    } else if (password != passwordTwo) {
      setMessage("Please Enter Correct Password");
      handleSnackBarClick();
    }
  };

  return (
    <div sx={{ mt: 10, mr: 10, ml: 10, width: "30%" }}>
      <Typography variant="h4" sx={{ mt: 10, mr: 10, ml: 10, width: "30%" }}>
        Update Your Account
      </Typography>
      {/* <Typography variant="p" sx={{ mt: 20, mr: 10, ml: 10, width: "30%" }}>
        Already A Member? <Link href="signin">Log In</Link>
      </Typography> */}

      <div className="textFields">
        <TextField
          sx={{ ml: 10 }}
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="name"
          autoComplete="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoFocus
        />
        <TextField
          sx={{ ml: 2 }}
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="name"
          autoComplete="text"
          autoFocus
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <Box sx={{ mt: 1, mr: 10, ml: 10, width: "28%" }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Button
        sx={{ mt: 4, ml: 10, mb: 3 }}
        variant="contained"
        color="success"
        onClick={handleSubmit}
      >
        Update Account
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

export default UpdateDetails;
