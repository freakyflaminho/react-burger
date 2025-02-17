import PriceBlock from '../../price-block/price-block.tsx';
import styles from './ingredient-card.module.css';

type Props = {
  name: string;
  image: string;
  count: number;
  price: number;
};

const IngredientCard = ({ name, image, count, price }: Props) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={name} className={styles.image} />
      <p className={styles.name}>{name}</p>
      <div className={styles.price}>
        <pre className={styles.count}>{count} x </pre>
        <PriceBlock price={price} />
      </div>
    </div>
  );
};

export default IngredientCard;
