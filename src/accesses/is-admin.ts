import { Access, FieldAccess } from "payload";

export const isAdmin: Access = ({req: { user }}) => {
  return Boolean(user?.role === "admin");
}

export const isAdminField: FieldAccess = ({req: { user }}) => {
  return Boolean(user?.role === "admin");
}