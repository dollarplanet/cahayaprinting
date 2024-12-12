import { Access, FieldAccess } from "payload";

export const isAdminOrEditor: Access = ({req: { user }}) => {
  return Boolean(user?.role === "admin") || Boolean(user?.role === "editor");
}

export const isAdminOrEditorField: FieldAccess = ({req: { user }}) => {
  return Boolean(user?.role === "admin") || Boolean(user?.role === "editor");
}