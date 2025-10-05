import { FC } from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: FC = () => {
  return (
      <h1 className={styles.root}>
        <span>😟</span>
        <br />
        Нічого не знайдено :(
      </h1>
  );
}

export default NotFoundBlock;
