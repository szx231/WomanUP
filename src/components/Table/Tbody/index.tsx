import React, { FC } from 'react';
import dayjs from 'dayjs';
import { v4 } from 'uuid';
import { TaskCard } from '../../TaskCard/index';
import { ITaskCard, Task } from './interface';

export const Tbody: FC<ITaskCard> = ({ tasks, deleteTask, doneTask, showModalEditTask }) => {
  const formatDate = (milliseconds: string) => {
    const dateInMs = +milliseconds;
    return dayjs(dateInMs).format('DD.MM.YYYY');
  };

  const taskTimeIsOver = (milliseconds: string) => {
    const taskDeadlineMs = +milliseconds;
    const currentDayMs = new Date().getTime();
    return taskDeadlineMs < currentDayMs;
  };

  const taskColor = (timeTask: string, taskStatus: boolean) => {
    const taskDeadlineIsOver = taskTimeIsOver(timeTask);
    if (taskDeadlineIsOver) return '#B22222';
    if (taskStatus && !taskDeadlineIsOver) return '#32CD32';
    if (!taskDeadlineIsOver && !taskStatus) return '#FFD700';
    return '#FF8C00';
  };

  return (
    <tbody>
      {tasks.map((el: Task) => {
        return (
          <TaskCard
            isDisabled={taskTimeIsOver(el.dateCompleted)}
            showModalEditTask={() => showModalEditTask(el)}
            key={el.title + v4()}
            title={el.title}
            description={el.description}
            dateCompleted={formatDate(el.dateCompleted)}
            file={el.isDoc}
            taskColor={taskColor(el.dateCompleted, el.taskDone)}
            deleteTask={() => deleteTask(el.id)}
            doneTask={() => doneTask(el.id)}
          />
        );
      })}
    </tbody>
  );
};
