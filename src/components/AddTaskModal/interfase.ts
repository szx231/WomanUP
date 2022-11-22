import React from 'react';
export interface INewTask {
  dateCompleted: string;
  description: string;
  title: string;
  isDoc: boolean;
  taskDone: boolean;
  id: string;
}

export type TaskFields = Record<string, string | boolean>;

export interface IAddTaskModal {
  isModal: boolean;
  hideModalAddTask: () => void;
  sendTask: (task: TaskFields) => void;
  getUploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUpload: any;
  isDoc?: boolean;
}
