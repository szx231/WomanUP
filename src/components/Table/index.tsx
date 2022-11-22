import React from 'react';
import styles from './Table.module.css';

interface ITable {
  children: React.ReactNode;
}

export const Table: React.FC<ITable> = ({ children }) => {
  return <table className={styles.table}>{children}</table>;
};
