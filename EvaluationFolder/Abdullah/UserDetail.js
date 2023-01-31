module.exports.getAllUserDetails = async (req, res, next) => {
  try {
    var user_id = req.body.user_id;
    const result = await User.findOne({
      attributes: ["id", "first_name", "last_name", "email", "role"],
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
