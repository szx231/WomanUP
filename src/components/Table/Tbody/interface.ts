export interface Task {
  dateCompleted: string;
  description: string;
  id: string;
  isDoc: false;
  taskDone: false;
  title: string;
}

export interface ITaskCard {
  tasks: any;
  deleteTask: (id: string) => void;
  doneTask: (id: string) => void;
  showModalEditTask: (el: Task) => void;
}
