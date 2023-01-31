//Contributor : Hamza Mazhar
/*
 * Contributor: Ahmed Hassan, Mayank Chetan Parvatia
 */

const { Router } = require("express");
const router = Router();

// Import Middlewares
const {
  validationSignup,
  isUserExistsSignup,
  validateLogin,
  authenticateToken,
  validationUpdateProfile,
  isUserExistsUpdate,
  validationChangePassword,
  validationForgotPassword,
  isEmailRegistered,
  validationResetPassword,
  isResetTokenValid,
} = require("../middleware/userMiddleware");

// Import Controllers
const usersController = require("../services/user.service");

router.post(
  "/signup",
  //
  [validationSignup, isUserExistsSignup],
  usersController.signUp
); // sends verification link to user
router.get("/signup/verify/:token", usersController.signUpVerify); // verify user link when clicked
router.post("/login", [validateLogin], usersController.login);
router.get("/", [authenticateToken], usersController.getLoggedInUser); // get logged in user
router.post(
  "/update_profile",
  [authenticateToken, validationUpdateProfile, isUserExistsUpdate],
  usersController.updateProfile
);
router.post(
  "/change_password",
  [authenticateToken],
  usersController.changePassword
);
router.post(
  "/forgot_password",
  [validationForgotPassword, isEmailRegistered],
  usersController.forgotPassword
); // sends reset link to user

router.get(
  "/forgot_password/verify/:token",
  usersController.forgotPasswordVerify
); // verify reset link when clicked
router.post(
  "/reset_password",
  [validationResetPassword, isResetTokenValid],
  usersController.resetPassword
); // reset to new password
router.post(
  "/approvemediabyadmin",
  [authenticateToken],
  usersController.approveMediaByAdmin
);
router.post("/allusers", [authenticateToken], usersController.getAllUsers);
router.delete(
  "/removeuser/:user_id",
  [authenticateToken],
  usersController.removeuser
);
router.post('/getuserdetails',
    [authenticateToken],
    usersController.getAllUserDetails
);

router.post("/blockuser", [authenticateToken], usersController.blockuser);

router.post("/unblockuser", [authenticateToken], usersController.unblockuser);

module.exports = router;
