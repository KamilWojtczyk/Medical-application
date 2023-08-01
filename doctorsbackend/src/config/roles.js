const allRoles = {
  patient: [],
  admin: ['admin'],
  doctor : ["doctor"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
