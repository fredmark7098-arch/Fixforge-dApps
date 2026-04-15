
import Signin from "@/app/components/auth/sign-in";
import Breadcrumb from "@/app/components/shared/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

const SigninPage = () => {
  return (
    <>
      <Breadcrumb pageName="Sign In Page" />
      <Signin />
    </>
  );
};

export default SigninPage;
