export interface INewTask {
  dateCompleted: string;
  description: string;
  title: string;
  id: string;
  isDoc: boolean;
}

export interface ITask {
  dateCompleted: string;
  description: string;
  id: string;
  isDoc: boolean;
  taskDone: boolean;
  title: string;
}

export type TaskFields = Record<string, string | boolean>;

export interface Event<T = EventTarget> {
  target: T;
}
