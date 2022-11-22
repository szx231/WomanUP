import styles from './Thead.module.css';

export const Thead = () => {
  const headerFields = ['Edit', 'Title', 'Description', 'DateCompleted', 'File', 'Delete', 'Done'];

  return (
    <thead className={styles.thead}>
      {headerFields.map((field) => (
        <td key={field}>{field}</td>
      ))}
    </thead>
  );
};
