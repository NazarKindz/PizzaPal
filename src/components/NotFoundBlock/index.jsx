import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
  return (
      <h1 className={styles.root}>
        <span>😟</span>
        <br />
        Нічого не знайдено :(
      </h1>
  );
}

export default NotFoundBlock;
