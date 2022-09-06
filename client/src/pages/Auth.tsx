import React from "react";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";

const Auth = () => {
  return (
    <div className="p-3 m-auto w-[50vw]">
      <RegisterForm />
      <div className="relative flex flex-col py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">- Or -</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <LoginForm />
    </div>
  );
};

export default Auth;