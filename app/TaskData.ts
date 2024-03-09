export type TaskData = {
  name: string;
  id: string;
  status: TaskStatus;
};
export type TaskStatus = "To-Do" | "In Progress" | "Done" | "Approved";

// export enum TaskType {
//   Backlog = "Backlog",
//   Doing = "Doing",
//   Review = "Review",
//   Done = "Done",
// }
