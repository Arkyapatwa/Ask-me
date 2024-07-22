// "use client"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
// import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUser, getUserById } from "@/neo4j.action";

export default async function callbackPage() {

    const { getUser, isAuthenticated } = getKindeServerSession();

    const isUserAuthenticated = await isAuthenticated();
    const user = await getUser();

    if (!isUserAuthenticated) {
        return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/kinde_callback")
    }

    if (!user) {
        return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/kinde_callback")
    }

    // check if user is already present in db
    const dbUser = await getUserById(user.id)

    // if no user exists in db create a user
    if (!dbUser) {
        await createUser({
            applicationId: user.id,
            firstname: user.given_name!,
            lastname: user.family_name ?? undefined,
            email: user.email!
        })
    }

    return redirect("/")

    // return (
    //     <main>
    //         <LogoutLink postLogoutRedirectURL="http://localhost:3000/kinde_callback"> Log out </LogoutLink>
    //     </main>
    // );
}