import { betterAuth} from "better-auth";
import { pool } from "../db/pool";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: pool,

    emailAndPassword: {
        enabled: true,
    },

user: {
  additionalFields: {
    contact: {
      type: "string",
      required: true,
    },

    role: {
      type: "string",
      required: false,
      defaultValue: "user",
      input: false,
    },

    is_active: {
      type: "boolean",
      required: false,
      defaultValue: true,
      input: false,
    },

    user_id: {
      type: "string",
      required: false,
      input: false,
    },
  },
},

  plugins: [
    admin(),
    nextCookies(),
  ],

});