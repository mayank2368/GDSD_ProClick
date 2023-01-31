/*
 * Contributor: Ahmed Hassan
 * Contributor : Hamza Mazhar
 * Contributor : Mayank Chetan Parvatia
 */

require("dotenv").config();
// Load model
const { User } = require("../config/mysqldatabase.config");
const { Op } = require("sequelize");
const { Media } = require("./../models/image-data.model");

// const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const AUTH_SECRET = "hereShouldBeInENV";
// SignUp
module.exports.signUp = async (req, res, next) => {
  try {
    console.log("++++++++++++++++", req.body);
    const email = req.body.email;
    const role = req.body.role;
    const first_name = req.body.first_name || null;
    const last_name = req.body.last_name || null;
    // encrypt password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const password = hash;

    const token = crypto.randomBytes(16).toString("hex");

    const record = await User.create({
      email: email,
      password: password,
      token: token,
      first_name: first_name,
      last_name: last_name,
      role: role,
    });
    return res.json({
      status: "success",
      result: {
        record: record,
      },
    });
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

// Verify Signup Link
module.exports.signUpVerify = async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      where: {
        token: token,
        is_verified: 0,
      },
    });
    if (user) {
      const record = await User.update(
        {
          token: "",
          is_verified: 1,
        },
        {
          where: {
            id: {
              [Op.eq]: user.id,
            },
          },
        }
      );

      return res.json({
        status: "success",
        result: user,
      });
    } else {
      let err = new Error("Invalid token provided or user already verified");
      err.field = "token";
      return next(
        res.status(500).json({
          error: {
            message: "Internal error occurred",
            reason: err,
          },
        })
      );
    }
  } catch (err) {
    console.log("+++++++++what the fuck not work", err);
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

// Login
module.exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);

      if (isMatched === true && !user.is_blocked) {
        var userData = {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
        };
        return res.json({
          user: userData,
          token: jwt.sign(userData, AUTH_SECRET, {
            expiresIn: "2h",
          }), // Expires in 2 Hour
        });
      } else {
        let err = new Error("Invalid email or password entered");
        err.field = "Invalid email or password entered";
        if (isMatched && user.is_blocked) {
          err = new Error("This user account is blocked by the admin!");
          err.field = "This user account is blocked by the admin!";
        }
        return next(
          res.status(401).json({
            error: {
              message: "Login Failed",
              reason: err,
            },
          })
        );
      }
    } else {
      let err = new Error("Invalid email or password entered");
      err.field = "Invalid email or password entered";
      return next(
        res.status(401).json({
          error: {
            message: "Login Failed",
            reason: err,
          },
        })
      );
    }
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

// Get Logged in user
module.exports.getLoggedInUser = (req, res, next) => {
  var token = req.headers.authorization;
  if (token) {
    // verifies secret and checks if the token is expired
    jwt.verify(token.replace(/^Bearer\s/, ""), AUTH_SECRET, (err, decoded) => {
      if (err) {
        let err = new Error("Unauthorized");
        err.field = "Unauthorized";
        return next(
          res.status(500).json({
            error: {
              message: "Internal error occurred",
              reason: err,
            },
          })
        );
      } else {
        return res.json({ status: "success", user: decoded });
      }
    });
  } else {
    let err = new Error("Unauthorized");
    err.field = "Unauthorized";
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

// Update Profile
module.exports.updateProfile = async (req, res, next) => {
  try {
    var id = req.user.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    const result = User.update(
      {
        first_name: first_name,
        last_name: last_name,
        email: email,
      },
      {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      }
    );

    return res.json({
      status: "success",
      result: result,
    });
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

// Change Password
module.exports.changePassword = async (req, res, next) => {
    try {
        var user_id = req.user.id;
        var password = req.body.password;
        var new_password = req.body.new_password;
        const user = await User.findOne({
            where: {
                id: user_id,
            },
        });
        if (user) {
            const isMatched = await bcrypt.compare(password, user.password);

            if (isMatched) {
                // encrypt password

                var salt = await bcrypt.genSaltSync(10);
                var hash = await bcrypt.hashSync(new_password, salt);
                new_password_hash = hash;

                const result = User.update(
                    {
                        password: new_password_hash,
                    },
                    {
                        where: {
                            id: {
                                [Op.eq]: user_id,
                            },
                        },
                    }
                );
                return res.json({
                    status: "success",
                    message: "Password updated successfully",
                    result: true,
                });
            }
            else {
                return res.json({
                    status: "failed",
                    message: "Old password does not match!",
                    result: null,
                });
            }
        }

    } catch (err) {
        return next(
            res.status(500).json({
                error: {
                    message: "Internal error occurred",
                    reason: err,
                },
            })
        );
    }
}

// Forgot Password
module.exports.forgotPassword = async (req, res, next) => {
  try {
    var email = req.body.email;
    var token = crypto.randomBytes(16).toString("hex");

    const result = await User.update(
      {
        token: token,
      },
      {
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      }
    );

    // Send the email
    var transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_POST,
      auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASS,
      },
    });

    var verificationLink = `${process.env.CLIENT_URL}/forgot-password-verify/?token=${token}`;

    var mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Reset password",
      html: `Hi there! <br/><br/>
			Please click on the link below to reset your password:<br/>
			<a href="${verificationLink}" target="_blank">${verificationLink}</a><br/><br/>
			Thank You.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({
      status: "success",
      result: result,
    });
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

// Forgot Password Verify Link
module.exports.forgotPasswordVerify = async (req, res, next) => {
  try {
    var token = req.params.token;

    const user = await User.findOne({
      where: {
        token: token,
      },
    });

    if (user) {
      return res.json({
        message: "Validation link passed",
        type: "success",
      });
    } else {
      let err = new Error("Invalid token provided");
      err.field = "Invalid token provided";
      return next(
        res.status(500).json({
          error: {
            message: "Internal error occurred",
            reason: err,
          },
        })
      );
    }
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

// Reset Password
module.exports.resetPassword = async (req, res, next) => {
  try {
    var token = req.body.token;
    // encrypt password
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.new_password, salt);
    const new_password = hash;

    const result = await User.update(
      {
        password: new_password,
        token: "",
      },
      {
        where: {
          token: {
            [Op.eq]: token,
          },
        },
      }
    );

    return res.json({
      status: "success",
      result: result,
    });
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

module.exports.approveMediaByAdmin = async (req, res, next) => {
  try {
    var media_id = req.body.media_id;
    var status = req.body.status;

    Media.approveMediaByAdmin(status, media_id, function (err, result) {
      console.log("controller");
      if (err) res.send(err);
      console.log("res", result);
      res.send(result);
    });
  } catch (err) { }
};

//all users list
module.exports.getAllUsers = async (req, res, next) => {
  try {
    const result = await User.findAll(
      {
        attributes: [
          "id",
          "first_name",
          "last_name",
          "email",
          "role",
          "createdAt",
          "updatedAt",
          "is_blocked",
        ],
      },
      {
        where: {
          role: {
            [Op.notILike]: "admin",
          },
        },
      }
    );

    return res.json({
      status: "success",
      result: result,
    });
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

//remove a user by id
module.exports.removeuser = async (req, res, next) => {
  try {
    const result = await User.destroy({
      where: {
        id: req.params.user_id,
      },
    });

    return res.json({
      status: "success",
      result: result,
    });
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};
module.exports.getAllUserDetails = async (req, res, next) => {
  try {
    var user_id = req.body.user_id;
    const result = await User.findOne({
      attributes: [
        "id",
        "first_name",
        "last_name",
        "email",
        "role",
      ],
      where: {
        id: user_id,
      },
    });

    return res.json({
      status: "success",
      result: result,
    });
  } catch (err) {
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

//block a user by id
//module.exports.blockuser = async (req, res, next) => {
//    try {
//        var user_id = req.body.user_id;
//        await user.findone({ where: { id: user_id } })
//            .on('success', function (media) {
//                 check if record exists in db
//                if (media) {
//                    const result = await media.update(

//                        {
//                            is_blocked: req.body.is_blocked
//                        }
//                    );
//                    return res.json({
//                        status: "success",
//                        result: result,
//                    });
//                }
//            });
//        }
//        catch (err) {
//        return next(
//            res.status(500).json({
//                error: {
//                    message: "internal error occurred",
//                    reason: err,
//                },
//            })
//        );
//    }
//};

//block user
module.exports.blockuser = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    const is_blocked = req.body.is_blocked;
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (user) {
      const record = await User.update(
        {
          is_blocked: is_blocked
        },
        {
          where: {
            id: {
              [Op.eq]: user.id,
            },
          },
        }
      );

      return res.json({
        status: "success",
        result: record,
      });
    } else {
      let err = new Error("Not found");
      //err.field = "token";
      return next(
        res.status(500).json({
          error: {
            message: "Internal error occurred",
            reason: err,
          },
        })
      );
    }
  } catch (err) {
    console.log("+++++++++Something wrong happened", err);
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};

//unblock user
module.exports.unblockuser = async (req, res, next) => {
  try {
    const user_id = req.body.user_id;
    const is_blocked = req.body.is_blocked;
    const user = await User.findOne({
      where: {
        id: user_id,
      },
    });
    if (user) {
      const record = await User.update(
        {
          is_blocked: is_blocked,
        },
        {
          where: {
            id: {
              [Op.eq]: user.id,
            },
          },
        }
      );

      return res.json({
        status: "success",
        result: record,
      });
    } else {
      let err = new Error("Not found");
      //err.field = "token";
      return next(
        res.status(500).json({
          error: {
            message: "Internal error occurred",
            reason: err,
          },
        })
      );
    }
  } catch (err) {
    console.log("+++++++++Something wrong happened", err);
    return next(
      res.status(500).json({
        error: {
          message: "Internal error occurred",
          reason: err,
        },
      })
    );
  }
};
