import React from "react";
import LoginForm from "../components/loginForm";
import Nav from "../components/nav";
import RegisterForm from "../components/registerForm";

const Auth = () => {
  return (
    <>
      <Nav />
      <div className="p-3 mx-auto max-w-screen-xl text-center">
        <RegisterForm />
        <div className="relative flex flex-col py-5 items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="flex-shrink mx-4 text-gray-400">- Or -</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <LoginForm />
      </div>
    </>
  );
};

export default Auth;
