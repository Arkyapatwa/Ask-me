import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function callbackPage() {

    const { getUser, isAuthenticated } = getKindeServerSession();

    const isUserAuthenticated = await isAuthenticated();
    const user = await getUser();

    if (!isUserAuthenticated) {
        redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/kinde_callback")
    }

    if (!user) {
        redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/kinde_callback")
    }

    return (
        <main>
            <LogoutLink postLogoutRedirectURL="http://localhost:3000/kinde_callback"> Log out </LogoutLink>
        </main>
    );
}