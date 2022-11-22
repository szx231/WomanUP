import { FC, MouseEventHandler } from 'react';
import styles from './Button.module.css';

interface IButton {
  text: string;
  onClickFunction: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
}

export const Button: FC<IButton> = ({ text, onClickFunction, isActive }) => {
  return (
    <button disabled={isActive} onClick={onClickFunction} className={styles.button} type="button">
      {text}
    </button>
  );
};
