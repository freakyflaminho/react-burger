import styles from './statistics-block.module.css';

type Props = {
  header: string;
  count: number;
};

const StatisticsBlock = ({ header, count }: Props) => {
  return (
    <article>
      <p className={styles.title}>{header}</p>
      <p className={styles.ordersCount}>{count}</p>
    </article>
  );
};

export default StatisticsBlock;
