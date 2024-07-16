import { FloatingNavbar } from "@/components/Navbar";
import Image from "next/image";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {

  const { isAuthenticated, getUser } = getKindeServerSession();

  const isUserAuthenticated = await isAuthenticated();
  const user = await getUser();

  if (! isUserAuthenticated) {
    redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/kinde_callback")
  }

  if (!user) {
    redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/kinde_callback")
  }

  return (
    <main>
      <FloatingNavbar />
    </main>
  );
}
