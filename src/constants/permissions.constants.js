export const USER_ROLE = {
  ADMIN: "Admin",
  USER: "User",
};

const ADMIN_PERMISSIONS = {
  manage: ["create", "read", "delete"],
};
const USER_PERMISSIONS = {
  manage: ["read"],
};

export const ROLES = {
  [USER_ROLE.ADMIN]: ADMIN_PERMISSIONS,
  [USER_ROLE.USER]: USER_PERMISSIONS,
};
