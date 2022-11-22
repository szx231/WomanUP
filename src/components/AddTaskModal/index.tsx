import React, { FC, useState, useRef, useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import styles from './AddTaskModal.module.css';
import { Input } from '../ui-kit/Input';
import { Button } from '../ui-kit/Button';
import { IAddTaskModal, TaskFields } from './interfase';

export const AddTaskModal: FC<IAddTaskModal> = ({
  isModal,
  hideModalAddTask,
  sendTask,
  getUploadImage,
  imageUpload,
}) => {
  const initialState = [
    { value: '', field: 'title' },
    { value: '', field: 'description' },
    { value: '', field: 'dateCompleted' },
  ];

  const [state, setState] = useState(initialState);
  const [task, setTask] = useState<TaskFields>();
  const filePicker = useRef<HTMLInputElement>(null);
  const FILES_FORMAT = 'image/*, .png, .jpg,.gif,.web,.txt,.doc,.pdf,.mp3,.zip';

  const handleChange = (value: any, index: number) => {
    setState((prev) => {
      if (prev[index].field === 'dateCompleted') {
        prev[index].value = String(new Date(value).getTime());
        return [...prev];
      }
      prev[index].value = value;
      return [...prev];
    });
  };

  const inputType = (title: string) => {
    if (title === 'title') return 'text';
    if (title === 'description') return 'text';
    if (title === 'dateCompleted') return 'date';
    return 'text';
  };

  const handlePick = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
  };

  useEffect(() => {
    const result = state.reduce<TaskFields>((acc, { value, field }) => {
      acc[field] = value;
      return { ...acc };
    }, {});
    if (imageUpload) {
      result.isDoc = true;
    } else {
      result.isDoc = false;
    }
    result.taskDone = false;
    setTask(result);
  }, [state, imageUpload]);

  return (
    <div style={{ visibility: isModal ? 'visible' : 'hidden' }} className={styles.container}>
      <button onClick={hideModalAddTask} type="button" className={styles.closeBtn}>
        <IoIosCloseCircleOutline size="32px" />
      </button>
      <h2 className={styles.title}>Add Task</h2>
      {state.map((el, index) => (
        <Input
          isFile={index === state.length - 1}
          key={el.field}
          handleChange={(e) => handleChange(e.target.value, index)}
          type={inputType(el.field)}
          title={el.field}
          handlePick={handlePick}
        />
      ))}
      <Button onClickFunction={() => sendTask(task!)} text="add task" />
      <input
        style={{ visibility: 'hidden' }}
        ref={filePicker}
        type="file"
        onChange={(e) => getUploadImage(e)}
        accept={FILES_FORMAT}
      />
    </div>
  );
};
