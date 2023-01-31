/*
 * Contributor: Abdullah Khalid
 */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import MuiAlert from "@mui/material/Alert";
import {
  TextField,
  Box,
  Typography,
  Link,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Snackbar,
} from "@mui/material";
import { selectUser, register } from "../../redux/slices/auth";
import { selectErrorMessage } from "../../redux/slices/errorMessage";
import { CONSTANTS } from "../../utils";

import "./SignUp.css";

const ROLES = CONSTANTS.ROLES;

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

const SignUp = () => {
  const { isSignedUp } = useSelector(selectUser);
  const { ErrorMessage } = useSelector(selectErrorMessage);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(ROLES.BUYER);

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
      dispatch(register({ email, password, firstName, lastName, role }));
    } else if (!validateEmail(email) || !email.includes("hs-fulda.de")) {
      setMessage("Please Enter Correct Email");
      handleSnackBarClick();
    } else if (password != passwordTwo) {
      setMessage("Please Enter Correct Password");
      handleSnackBarClick();
    }
  };

  const toggleButtonHandle = (event, newAlignment) => {
    setRole(newAlignment);
  };

  return (
    <div sx={{ mt: 10, mr: 10, ml: 10, width: "30%" }}>
      <Typography variant="h4" sx={{ mt: 10, mr: 10, ml: 10, width: "30%" }}>
        Create new account
      </Typography>
      <Typography variant="p" sx={{ mt: 20, mr: 10, ml: 10, width: "30%" }}>
        Already A Member? <Link href="signin">Log In</Link>
      </Typography>

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
        <TextField
          margin="normal"
          type="password"
          required
          id="password"
          label="Password"
          name="password"
          autoComplete="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          value={passwordTwo}
          onChange={(e) => setPasswordTwo(e.target.value)}
        />
      </Box>
      <Typography variant="p" sx={{ mt: 30, mr: 10, ml: 10, width: "30%" }}>
        Want to become?
      </Typography>
      <br />

      <ToggleButtonGroup
        sx={{ mt: 4, ml: 10 }}
        color="primary"
        value={role}
        exclusive
        onChange={toggleButtonHandle}
      >
        <ToggleButton value={ROLES.BUYER} color="primary">
          Buyer
        </ToggleButton>
        <ToggleButton value={ROLES.SELLER}>Seller</ToggleButton>
      </ToggleButtonGroup>

      <br />

      <Button
        sx={{ mt: 4, ml: 10, mb: 3 }}
        variant="contained"
        color="success"
        onClick={handleSubmit}
      >
        Create Account
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

export default SignUp;
