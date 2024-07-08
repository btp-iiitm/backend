const AppError = require("../utils/appError");

const isAdminOrSuperAdmin = (req, res, next) => {
  if (req.user.role !== "admin" && req.user.role !== "superAdmin")
    return next(
      new AppError("You are not allowed to perform this action", 403),
    );

  next();
};

module.exports = { isAdminOrSuperAdmin };
