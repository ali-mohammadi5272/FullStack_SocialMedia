const { isAllowedUser, forbiddenResponse } = require("../helperFunctions");
const { roles } = require("./../constants");

const { MANAGER, ADMIN } = roles;
const managerLevel = [MANAGER];
const adminLevel = [MANAGER, ADMIN];

const middleware = (validRole) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (validRole === MANAGER) {
      const isAdmin = isAllowedUser(managerLevel, role);
      if (!isAdmin) return forbiddenResponse(res);
      next();
    }

    else if (validRole === ADMIN) {
      const isAdmin = isAllowedUser(adminLevel, role);
      if (!isAdmin) return forbiddenResponse(res);
      next();
    }

    else {
      return forbiddenResponse(res);
    }
  };
};

module.exports = middleware;
