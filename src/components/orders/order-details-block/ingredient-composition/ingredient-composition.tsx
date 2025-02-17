import styles from './ingredient-composition.module.css';

type Props = {
  images: string[];
}

const IngredientComposition = ({ images }: Props) => {
  const displayedCount = 6;
  const displayedImages = images.slice(0, displayedCount);
  const additionalCount = images.length - displayedCount;

  const isAdditionalCountDisplayed = (index: number) => {
    return index === displayedCount - 1 && additionalCount > 0;
  };

  return (
    <div className={styles.container}>
      {displayedImages.map((image, index) => (
        <div
          key={index}
          className={styles.imageBlock}
          style={{ zIndex: displayedCount - index }}
        >
          <img
            src={image}
            alt="Ingredient image"
            className={`${styles.ingredientImage} ${isAdditionalCountDisplayed(index) && styles.lastImage}`}
          />
          {isAdditionalCountDisplayed(index) &&
            <p className={styles.additionalCount}>+{additionalCount}</p>}
        </div>
      ))}
    </div>
  );
};

export default IngredientComposition;
