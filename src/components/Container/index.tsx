import React, { FC } from 'react';
import styles from './Container.module.css';

interface IContainer {
  children: React.ReactNode;
}

export const Container: FC<IContainer> = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};
