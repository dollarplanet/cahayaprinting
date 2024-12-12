import { isAdmin, isAdminField } from '@/accesses/is-admin';
import { User } from '@/payload-types'
import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isAdminAndSelf: Access<User> = ({ req: { user }, data }) => {
  return (user?.email === data?.email) || (user?.role === "admin");
}

const isAdminAndSelfField: FieldAccess<User> = ({ req: { user }, doc }) => {
  return (user?.email === doc?.email) || (user?.role === "admin");
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
