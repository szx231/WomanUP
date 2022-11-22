import { FC } from 'react';
import { IoDocumentTextSharp } from 'react-icons/io5';
import styles from './TaskCard.module.css';
import { Button } from '../ui-kit/Button/index';
import { ITask } from './interface';

export const TaskCard: FC<ITask> = ({
  title,
  description,
  dateCompleted,
  file,
  taskColor,
  deleteTask,
  doneTask,
  showModalEditTask,
  isDisabled,
}) => {
  return (
    <tr style={{ backgroundColor: taskColor }} className={styles.task}>
      <td>
        <button onClick={showModalEditTask} type="button">
          Edit
        </button>
      </td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{dateCompleted}</td>
      {file ? (
        <td className={styles.file}>
          <IoDocumentTextSharp size="25px" />
        </td>
      ) : (
        <td>no file</td>
      )}
      <td>
        <Button onClickFunction={deleteTask} text="Delete" />
      </td>
      <td>
        <Button isActive={isDisabled} onClickFunction={doneTask} text="Done" />
      </td>
    </tr>
  );
};
