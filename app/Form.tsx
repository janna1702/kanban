"use client";
import { useState, useEffect, FC } from "react";
import { TaskData, TaskStatus } from "./TaskData";
import { nanoid } from "nanoid";
type FormProps = {
  allTasks: TaskData[];
  setAllTasks: Function;
};

/**
 * onChange => React.ChangeEvent<HTMLElement>
 *  <input onChange={inputHandler}></input>
 * const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) 

 * onClick => React.MouseEvent<HTMLElement>
 * <button onClick=(handle)>
 * const handle = (e: React.MouseEvent<HTMLButtonElement>) => {}
 */
export const Form: FC<FormProps> = (props) => {
  const [taskName, setTaskName] = useState("");
  const [selectedValue, setSelectedValue] = useState<TaskStatus>("To-Do");

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const changeTask = (event?: React.MouseEvent<HTMLButtonElement>) => {
    const newTask = { name: taskName, id: nanoid() };
    console.log(newTask);
    props.setAllTasks([...props.allTasks, newTask]);

    setTaskName("");
    return newTask;
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const newTask = changeTask();
    const id = newTask.id;
    event.dataTransfer.setData("text", id);
  };
  const myBorder = "255px 15px 225px 15px/15px 225px 15px 255px";
  return (
    <div className="w-7/12 h-3/4  flex flex-col gap-5">
      <div className="text-5xl font-bold text-indigo-950">
        <h1>Project</h1>
        <h1>Kanban</h1>
        <h1>Board</h1>
      </div>
      <div>
        <h1 className=" flex bg-[rgb(217,171,221)] rounded-full  w-10 h-10 text-neutral-50 items-center justify-center text-2xl  ">
          1
        </h1>
        <p>Copy a sticky note, then type in the task that needs to be done. </p>
      </div>
      <div
        style={{ borderRadius: myBorder }}
        draggable="true"
        onDragStart={handleDragStart}
        className=" flex flex-col justify-center items-center w-44 h-44 bg-amber-100 shadow-lg  "
      >
        <div>
          <input
            value={taskName}
            className="bg-neutral-100 w-20  border-gray-300  "
            onChange={inputHandler}
          ></input>
        </div>

        {/* <button
          className="bg-gray-300 rounded-lg w-24 h-7"
          onClick={changeTask}
        >
          Add Task
        </button> */}
      </div>
      <div>
        <h1 className=" flex rounded-full  bg-[rgb(131,104,166)] w-10 h-10 text-neutral-50 items-center justify-center text-2xl  ">
          2
        </h1>
        <p>Drag and drop to the corresponding column. </p>
      </div>
      <div>
        <h1 className=" flex rounded-full text-neutral-50 bg-[rgb(199,122,171)] w-10 h-10  items-center justify-center text-2xl  ">
          3
        </h1>
        <p>Transfer task to the next column as it`s status updates.</p>
      </div>
    </div>
  );
};
//Вызов функции внутри onClick - вызовет фунцию сразу при рендере компонента onCick={func()}
//Без скобок - будет работать корректно onClick={func}
