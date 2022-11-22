import React, { FC } from 'react';
import styles from './AddTask.module.css';
import { Button } from '../ui-kit/Button';

interface IAddTask {
  isModal: () => void;
}

export const AddTask: FC<IAddTask> = ({ isModal }) => {
  return (
    <div className={styles.wrapper}>
      <Button onClickFunction={isModal} text="Add" />
    </div>
  );
};
