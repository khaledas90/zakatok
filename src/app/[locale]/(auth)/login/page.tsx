import React from "react";
import LoginForm from "./_components/LoginForm";

export default function SignInPage() {
  return (
    <div className="flex h-screen items-center my-15 justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <LoginForm />
    </div>
  );
}
