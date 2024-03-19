"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, FC } from "react";
import { DATABASE } from "@/app/DB/database";

export default function RegistrationPage() {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const getLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };
  const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onFetch = async (login: string, password: string): Promise<boolean> => {
    // api/route.ts
    const response = await fetch("http://localhost:3000/api/registration", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: login, password: password }),
      method: "POST",
    });
    const result: { DB: []; data: boolean } = await response.json();
    console.log(result.DB);
    return result.data;
  };
  const router = useRouter();
  const signInHandler = async (login: string, password: string) => {
    if ((await onFetch(login, password)) === true) {
      router.push("/");
    }
  };
  return (
    <div>
      <input onChange={getLogin}></input>
      <input onChange={getPassword}></input>
      <button onClick={async () => await signInHandler(login, password)}>
        Sign In
      </button>
    </div>
  );
}
