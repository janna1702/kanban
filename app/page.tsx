"use client";
import "tailwindcss/tailwind.css";
import { useState, useEffect, FC } from "react";
import { TaskList } from "./ui/TaskList";
import { Form } from "./Form";
import { TaskData } from "./TaskData";

export default function Home() {
  const [allTasks, setAllTasks] = useState<TaskData[]>([]);
  useEffect(() => {
    console.log(allTasks);
  }, [allTasks]);
  return (
    <div className="bg-neutral-50 flex flex-row h-screen w-full items-center justify-center gap-5 px-5 ">
      <Form allTasks={allTasks} setAllTasks={setAllTasks} />
      <TaskList allTasks={allTasks} setAllTasks={setAllTasks} name={"To-Do"} />
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
  );
}
