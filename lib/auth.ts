import { betterAuth} from "better-auth";
import { Pool } from "pg";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

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