export interface ITask {
  title: string;
  description: string;
  dateCompleted: string;
  file: boolean;
  taskColor: string;
  deleteTask: (id: string) => void;
  doneTask: (id: string) => void;
  showModalEditTask: () => void;
  isDisabled?: boolean;
}
