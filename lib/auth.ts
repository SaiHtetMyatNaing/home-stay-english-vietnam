import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";
import { createAccessControl } from "better-auth/plugins/access";

const statement = {
  ...defaultStatements,
  review: ["create", "view", "approve", "delete"],
  dashboard: ["view", "manage"]
} as const;

const ac = createAccessControl(statement)

export const user = ac.newRole({
  review: ["create", "view"],
})

export const admin = ac.newRole({
  review: ["create", "view", "approve"],
  dashboard: ['view', 'manage'],
  ...adminAc.statements,
})

export const superadmin = ac.newRole({
  review: ["create", "view", "approve", "delete"],
  dashboard: ["view", "manage"],
  ...adminAc.statements,
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:3000", "https://home-stay-english-vietnam.vercel.app", "https://www.englishhomestayvietnam.com/"],
  plugins: [nextCookies()]
});
