import { isAdmin, isAdminField } from '@/accesses/is-admin';
import { User } from '@/payload-types'
import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isAdminAndSelf: Access<User> = ({ req: { user }, data }) => {
  if (!user) return false;
  if (user.email === data?.email) return true;
  if (user.role === "admin") return true;
  return false;
}

const isAdminAndSelfField: FieldAccess<User> = ({ req: { user }, doc }) => {
  if (!user) return false;
  if (user.email === doc?.email) return true;
  if (user.role === "admin") return true;
  return false;
}

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: isAdminAndSelf,
    update: isAdminAndSelf,
    create: isAdmin,
    delete: isAdminAndSelf,
    unlock: isAdmin,
  },
  fields: [
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      access: {
        read: isAdminAndSelfField,
        update: isAdminField,
        create: isAdminField,
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        }
      ],
    },
  ],
}
