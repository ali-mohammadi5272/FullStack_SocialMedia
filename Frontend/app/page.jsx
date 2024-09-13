import AuthProvider from "@/contexts/AuthContext";
import styles from "./page.module.scss";
import HomePage from "@/components/templates/HomePage/HomePage";

const Page = function () {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
};

export default Page;
