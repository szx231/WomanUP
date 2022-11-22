import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, DocumentData } from 'firebase/firestore';
import { uploadBytes, ref, deleteObject } from 'firebase/storage';
import { Container } from '../components/Container';
import { Thead } from '../components/Table/Thead';
import { AddTaskModal } from '../components/AddTaskModal';
import { Table } from '../components/Table';
import { Wrapper } from '../components/Wrapper';
import { Tbody } from '../components/Table/Tbody';
import { AddTask } from '../components/AddTask';
import { db, storage } from '../firebase';
import { EditModal } from '../components/EditModal/index';
import { INewTask, ITask, Event, TaskFields } from './interface';

export const StartPage = () => {
  const [isModal, setIsModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [tasks, setTasks] = useState<ITask[] | DocumentData[]>([]);
  const [imageUpload, setImageUpload] = useState<File>();
  const [currentEditTask, setCurrentEditTask] = useState<ITask | undefined>();

  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    return querySnapshot;
  };

  const reset = () => {
    setImageUpload(undefined);
    setCurrentEditTask(undefined);
  };

  // eslint-disable-next-line consistent-return
  const validateFields = (task: INewTask | TaskFields) => {
    if (!task.title || !task.description || !task.dateCompleted) return alert('заполните все поля задачи');
  };

  const sendTask = async (task: TaskFields) => {
    validateFields(task);
    try {
      await addDoc(collection(db, 'tasks'), task).then((data) => {
        sentImage(data.id);
        addTaskClient(task, data.id);
      });
      alert('sended');
      reset();
    } catch (e) {
      console.error('Error send task: ', e);
    }
  };

  const sentImage = (id: string) => {
    if (imageUpload) {
      const imageRef = ref(storage, `${id}`);
      uploadBytes(imageRef, imageUpload!);
    }
  };

  const addTaskClient = (newTask: TaskFields, id: string) => {
    setTasks((prev) => {
      newTask.id = id;
      if (imageUpload) {
        newTask.isDoc = true;
      } else {
        newTask.isDoc = false;
      }
      return [...prev, newTask];
    });
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id)).then(() => {
        deleteImage(id);
        deleteTaskClient(id);
      });
      alert('deleted');
    } catch (e) {
      console.error('Error delete task ', e);
    }
  };

  const deleteImage = (id: string) => {
    const desertRef = ref(storage, id);
    deleteObject(desertRef);
  };

  const deleteTaskClient = (id: string) => {
    setTasks(tasks.filter((el) => el.id !== id));
  };

  const doneTask = async (id: string) => {
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, {
        taskDone: true,
      }).then(() => {
        doneTaskClient(id);
      });
    } catch (e) {
      console.error('Error change taskStatus: ', e);
    }
  };

  const doneTaskClient = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, taskDone: true } : task)));
  };

  const updateTask = async (id: string, task: INewTask) => {
    validateFields(task);
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, {
        dateCompleted: task.dateCompleted,
        description: task.description,
        isDoc: task.isDoc,
        title: task.title,
      }).then(() => {
        updateTaskClient(id, task);
        updateImage(id);
      });
      alert('task updated');
    } catch (e) {
      console.error('Error change taskStatus: ', e);
    }
  };

  const updateTaskClient = (id: string, task: INewTask) => {
    setTasks((prev) =>
      prev.map((el) =>
        id === el.id
          ? {
              ...el,
              dateCompleted: task.dateCompleted,
              description: task.description,
              isDoc: task.isDoc,
              title: task.title,
            }
          : el,
      ),
    );
  };

  const updateImage = (id: string) => {
    if (imageUpload) {
      const imageRef = ref(storage, `${id}`);
      uploadBytes(imageRef, imageUpload!);
    }
  };

  const showModalAddTask = () => {
    setIsModal((modal) => {
      return modal !== true;
    });
  };

  const hideModalAddTask = () => {
    setIsModal(false);
  };

  const showModalEditTask = (el: ITask) => {
    getTaskField(el);
    setIsEditModal((modal) => {
      return modal !== true;
    });
  };

  const getTaskField = (el: ITask) => {
    setCurrentEditTask(el);
  };

  const hideModalEditTask = () => {
    setIsEditModal(false);
  };

  const getUploadImage = (event: Event<HTMLInputElement>) => {
    const file = event.target.files![0];
    setImageUpload(file);
  };

  useEffect(() => {
    fetchTasks().then((data) => {
      const arr: DocumentData[] = [];
      data.forEach((file) => {
        const item = file.data();
        item.id = file.id;
        arr.push(item);
      });
      setTasks((prev) => {
        return [...prev, ...arr];
      });
    });
  }, []);

  return (
    <Container>
      <AddTask isModal={showModalAddTask} />
      <Wrapper>
        <Table>
          <Thead />
          <Tbody showModalEditTask={showModalEditTask} doneTask={doneTask} deleteTask={deleteTask} tasks={tasks} />
        </Table>
      </Wrapper>
      <EditModal
        currentTask={currentEditTask}
        imageUpload={imageUpload}
        getUploadImage={getUploadImage}
        updateTask={updateTask}
        hideModalEditTask={hideModalEditTask}
        isEditModal={isEditModal}
      />
      <AddTaskModal
        imageUpload={imageUpload}
        getUploadImage={getUploadImage}
        sendTask={sendTask}
        hideModalAddTask={hideModalAddTask}
        isModal={isModal}
      />
    </Container>
  );
};
