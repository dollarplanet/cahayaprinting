import { Field } from "payload";

export const Features: Field = {
  type: "array",
  name: "features",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ]
}