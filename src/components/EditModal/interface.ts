import React from 'react';

interface INewTask {
  dateCompleted: string;
  description: string;
  title: string;
  id: string;
  isDoc: boolean;
}

export interface IInitialState {
  value: string;
  field: string;
  taskDone: boolean;
}

export type ReduceReturnType = Record<string, string | boolean | number>;

export interface IAddTaskModal {
  isEditModal: boolean;
  hideModalEditTask: () => void;
  updateTask: (id: string, task: INewTask) => void;
  getUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUpload: any;
  currentTask: any;
}
