import AuthProvider from "@/contexts/AuthProvider";
import styles from "./page.module.scss";
import HomePage from "@/components/templates/HomePage/HomePage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Page = function () {
  const refreshToken = cookies().get("refreshToken").value;
  if (!refreshToken) {
    redirect("/login");
  }

  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
};

export default Page;
