"use client";
import { useState, useEffect, FC } from "react";
import { TaskData, TaskStatus } from "./TaskData";
import { nanoid } from "nanoid";

type TaskProps = {
  taskData: TaskData;
  allTasks: TaskData[];
  setAllTasks: Function;
  selectedTasks: TaskData[];
  setSelectedTasks: Function;
};
export const Task: FC<TaskProps> = (props) => {
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);

  const changeInputName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newArray = [...props.selectedTasks];
    const task = newArray.find((element) => element.id === props.taskData.id);
    if (task) {
      task.name = event.target.value;
    }

    props.setSelectedTasks(newArray);
  };
  const deleteTask = () => {
    props.setAllTasks(
      props.allTasks.filter((element) => element.id !== props.taskData.id)
    );
  };
  const changeTaskName = () => {
    setIsInputOpen(true);
  };
  const statusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newArray = [...props.selectedTasks];
    const task = newArray.find((element) => element.id === props.taskData.id);
    if (task) {
      task.status = event.target.value as TaskStatus;
    }
    props.setAllTasks(newArray);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", event.currentTarget.id);
  };

  return (
    <div id={props.taskData.id} draggable="true" onDragStart={handleDragStart}>
      {isInputOpen ? (
        <input onChange={changeInputName} value={props.taskData.name}></input>
      ) : (
        <>
          <h1 onClick={changeTaskName} className="">
            {props.taskData.name}
          </h1>
        </>
      )}
      <select defaultValue={props.taskData.status} onChange={statusChange}>
        <option value={"To-Do"}>To-Do</option>
        <option value={"In Progress"}>In Progress</option>
        <option value={"Done"}>Done</option>
        <option value={"Approved"}>Approved</option>
      </select>

      <button className="bg-gray-300 rounded-lg  w-24 h-7" onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
};
