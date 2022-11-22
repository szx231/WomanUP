export interface ITask {
  title: string;
  description: string;
  dateCompleted: string;
  file: boolean;
  taskColor: string;
  deleteTask: () => void;
  doneTask: () => void;
  showModalEditTask: () => void;
  isDisabled?: boolean;
}
