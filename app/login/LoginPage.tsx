"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, FC } from "react";
import { DATABASE } from "@/app/DB/database";

export function LoginPage() {
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
    const response = await fetch("http://localhost:3000/api/login", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: login, password: password }),
      method: "POST",
    });

    const result: { DB: []; data: boolean } = await response.json();
    console.log(result.DB);
    return result.data;
  };

  const loginHandler = async (login: string, password: string) => {
    if ((await onFetch(login, password)) === true) {
      onNextPageHandler();
    } else {
      alert("Wrong login or password");
    }

    //onFetch()
    //if result is true => onNextPageHandler
    //if result is false => alert("Wrong login or password")
  };

  const router = useRouter();
  const onNextPageHandler = () => {
    //push - redirects to the task page
    router.push("/task");
  };

  const goToRegistration = () => {
    //push - redirects to the task page
    router.push("/registration");
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-violet-200 to-pink-200 flex items-center justify-center  text-white">
      <div className="flex flex-col items-center justify-center  gap-10 p-5    w-2/5 h-4/5  shadow-xl backdrop-blur-xl bg-slate-50/20  rounded-2xl border border-slate-100 ">
        <img className="w-24 h-24 " src="../icon.png" />
        <form className="flex flex-col gap-10 w-3/6 text-lg ">
          <input
            value={login}
            onChange={getLogin}
            className="placeholder:text-white  border-b border-white py-2 bg-transparent outline-none "
            placeholder="Username"
          ></input>
          <input
            onChange={getPassword}
            value={password}
            className="placeholder:text-white bg-transparent border-b border-white py-2 outline-none"
            placeholder="Password"
          ></input>
        </form>
        <div className="flex flex-row text-lg mt-8 gap-20">
          <form className=" flex gap-2">
            <select
              typeof="checkbox"
              className="rounded-md w-6 h-6"
              name="remember"
            ></select>
            <label>Remember me</label>
          </form>
          <h1 className=" hover:underline ">Forgot Password?</h1>
        </div>
        <button
          //тут такая запись, так как функция loginHandler возвращает Promise,
          //из-за этого onClick принимает асинхронную анонимную функцию, которая вызывает loginHandler()
          onClick={async () => await loginHandler(login, password)}
          className=" w-3/6   h-11 mt-20    bg-gradient-to-r from-violet-300 to-pink-300 text-xl rounded-md"
        >
          LOGIN{" "}
        </button>
        <button onClick={goToRegistration}>Sign In</button>
      </div>
    </div>
  );
}
