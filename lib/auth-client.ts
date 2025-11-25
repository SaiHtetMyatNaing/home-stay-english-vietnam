import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { ac, superUser, superAdmin, user } from "./permission";
import type { auth } from "./auth";

export const authClient = createAuthClient({
    plugins: [
        inferAdditionalFields<typeof auth>(),
        adminClient({
            ac,
            roles: {
                user,
                superUser,
                superAdmin
            }
        })
    ]
});

export const { signIn, signOut, signUp, useSession } = authClient;


export async function getSession() {
    return await authClient.getSession();
}