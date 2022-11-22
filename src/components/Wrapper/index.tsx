import React, { FC } from 'react';
import styles from './Wrapper.module.css';

interface IWrapper {
  children: React.ReactNode;
}

export const Wrapper: FC<IWrapper> = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
