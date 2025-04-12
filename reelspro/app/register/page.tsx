"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ReactFormState } from "react-dom/client";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Your password doesn't match");
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = res.json();
      if (!res.ok) {
        setError("Registration failed");
      }

      router.push("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return <div>Register</div>;
};

export default Register;
