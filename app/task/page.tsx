"use client";
import "tailwindcss/tailwind.css";
import { useState, useEffect, FC } from "react";
import Head from "next/head";
import { TaskList } from "../ui/TaskList";
import { Form } from "../Form";
import { TaskData } from "../TaskData";
export default function Home() {
  const [allTasks, setAllTasks] = useState<TaskData[]>([]);
  const [isLoginPageOpen, setIsLoginPagecOpen] = useState<boolean>(true);
  const [functionAddTask, setFunctionAddTask] = useState<any>();
  useEffect(() => {
    console.log(allTasks);
  }, [allTasks]);
  return (
    <>
      <div className="bg-neutral-50 flex flex-row h-screen w-full items-center justify-center gap-5 px-5 ">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          />
          <title>My page title</title>
        </Head>
        <Form allTasks={allTasks} setAllTasks={setAllTasks} />
        <TaskList
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          name={"To-Do"}
        />
        <TaskList
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          name={"In Progress"}
        />
        <TaskList allTasks={allTasks} setAllTasks={setAllTasks} name={"Done"} />
        <TaskList
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          name={"Approved"}
        />
      </div>
    </>
  );
}
