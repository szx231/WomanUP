import React, { FC } from 'react';
import styles from './Input.module.css';

interface Iinput {
  title: string;
  type: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFile: boolean;
  handlePick?: any;
  defaultValue?: string;
}

export const Input: FC<Iinput> = ({ title, type, handleChange, isFile, handlePick, defaultValue }) => {
  return (
    <li className={styles.input__item}>
      <input value={defaultValue} onChange={handleChange} type={type} className={styles.input} placeholder={title} />
      {isFile && (
        <button onClick={handlePick} className={styles.file} type="button">
          Прикрепите файл
        </button>
      )}
    </li>
  );
};
