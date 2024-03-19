"use client";
import { useState, useEffect, FC } from "react";
import { TaskStatus } from "../TaskData";
import { TaskData } from "../TaskData";
import { Task } from "../Task";

type TaskListProps = {
  name: TaskStatus;
  allTasks: TaskData[];
  setAllTasks: Function;
};

export const TaskList: FC<TaskListProps> = (props) => {
  const [selectedTasks, setSelectedTasks] = useState<TaskData[]>([]);
  const [color, setColor] = useState<string>("");
  const [colorBody, setColorBody] = useState<string>("");

  useEffect(() => {
    if (props.name === "To-Do") {
      setColor("rgb(217,171,221)");
    } else if (props.name === "In Progress") {
      setColor("rgb(131,104,166)");
    } else if (props.name === "Done") {
      setColor("rgb(199,122,171)");
    } else if (props.name === "Approved") {
      setColor("rgb(254,185,207)");
    }
  }, [props.name]);
  useEffect(() => {
    setSelectedTasks(
      props.allTasks.filter((element) => element.status === props.name)
    );
  }, [props.allTasks]);

  // const filteredTasks = props.allTasks.filter(
  //   (element) => element.status === props.name
  // );
  const enableDropping = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log("🚀 ~ handleDrop ~ handleDrop:", "handleDrop");
    const dataTransfer = event.dataTransfer.getData("text");
    const data: { id: string; name: string } = JSON.parse(dataTransfer);

    const newArray = [...props.allTasks];
    const task = newArray.find((element) => element.id === data.id);
    console.log(task);
    if (task) {
      task.status = props.name as TaskStatus;
      props.setAllTasks(newArray);
    } else {
      props.setAllTasks([
        ...newArray,
        { id: data.id, status: props.name, name: data.name },
      ]);
    }

    console.log(newArray);
  };
  useEffect(() => {
    if (props.name === "To-Do") {
      setColorBody("rgb(253,225,254)");
    } else if (props.name === "In Progress") {
      setColorBody("rgb(175,158,195)");
    } else if (props.name === "Done") {
      setColorBody("rgb(234,185,222)");
    } else if (props.name === "Approved") {
      setColorBody("rgb(254,215,227)");
    }
  }, [props.name]);

  return (
    <div className="flex flex-col w-3/5 h-3/4 gap-5">
      <div className="rounded-md " style={{ backgroundColor: color }}>
        <div className=" flex  justify-between p-5 items-center text-xl text-neutral-50  h-12   font-bold text-center  ">
          <h1>{props.name}</h1>
          <h1>{"→"}</h1>
        </div>{" "}
      </div>

      <div
        style={{ backgroundColor: colorBody }}
        onDragOver={enableDropping}
        onDrop={handleDrop}
        className="w-full h-full rounded-xl  shadow-lg   overflow-y-scroll pt-5 gap-5"
      >
        <div className="block">
          {selectedTasks.map((element) => (
            <Task
              key={element.id}
              allTasks={props.allTasks}
              setAllTasks={props.setAllTasks}
              taskData={element}
              selectedTasks={selectedTasks}
              setSelectedTasks={setSelectedTasks}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
