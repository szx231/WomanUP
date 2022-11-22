import React, { FC, useState, useRef, useEffect } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import dayjs from 'dayjs';
import styles from './EditModal.module.css';
import { Input } from '../ui-kit/Input';
import { Button } from '../ui-kit/Button';
import { IAddTaskModal, IInitialState } from './interface';
import { TaskFields } from '../AddTaskModal/interfase';

export const EditModal: FC<IAddTaskModal> = ({
  isEditModal,
  hideModalEditTask,
  updateTask,
  getUploadImage,
  imageUpload,
  currentTask,
}) => {
  const initialState = [
    { value: '', field: 'title', taskDone: false },
    { value: '', field: 'description', taskDone: false },
    { value: '', field: 'dateCompleted', taskDone: false },
  ];

  const [state, setState] = useState(initialState);
  const [task, setTask] = useState<any>({});
  const filePicker = useRef<HTMLInputElement>(null);
  const FILES_FORMAT = 'image/*, .png, .jpg,.gif,.web,.txt,.doc,.pdf,.mp3,.zip';

  const handleChange = (value: any, index: number) => {
    setState((prev) => {
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

  const millisecondConvertToDate = (millisecond: string) => {
    const date = dayjs(+millisecond);
    const year = date.year();
    const month = date.month() + 1;
    const day = date.date();
    return `${year}-${month}-${day}`;
  };

  const dateConvertToMillisecond = (date: string) => {
    return String(new Date(date).getTime());
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
    result.dateCompleted = dateConvertToMillisecond(result.dateCompleted.toString());
    setTask(result);
  }, [state, imageUpload]);

  useEffect(() => {
    if (currentTask) {
      setState((prev) => {
        return prev.map((el) => {
          if (el.field === 'title') {
            return { ...el, value: currentTask.title };
          }
          if (el.field === 'description') {
            return { ...el, value: currentTask.description };
          }
          if (el.field === 'dateCompleted') {
            return { ...el, value: millisecondConvertToDate(currentTask.dateCompleted) };
          }
          return el;
        });
      });
    }
  }, [currentTask]);

  // eslint-disable-next-line consistent-return
  const defaultInputValue = (el: IInitialState) => {
    if (el.field === 'title') return el.value;
    if (el.field === 'description') return el.value;
    if (el.field === 'dateCompleted') return el.value;
  };

  return (
    <div style={{ visibility: isEditModal ? 'visible' : 'hidden' }} className={styles.container}>
      <button onClick={hideModalEditTask} type="button" className={styles.closeBtn}>
        <IoIosCloseCircleOutline size="32px" />
      </button>
      <h2 className={styles.title}>Edit Task</h2>
      {state.map((el, index) => (
        <Input
          isFile={index === state.length - 1}
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          handleChange={(e) => handleChange(e.target.value, index)}
          type={inputType(el.field)}
          title={el.field}
          handlePick={handlePick}
          defaultValue={defaultInputValue(el)}
        />
      ))}
      <Button onClickFunction={() => updateTask(currentTask.id, task)} text="save changes" />
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
