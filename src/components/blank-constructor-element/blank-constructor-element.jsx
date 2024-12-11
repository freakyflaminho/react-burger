import styles from './blank-constructor-element.module.css';

const BlankConstructorElement = ({ type, text, extraClass }) => {
  const positionClass =
    type === 'top' ? 'constructor-element_pos_top'
      : type === 'bottom' ? 'constructor-element_pos_bottom'
        : undefined;

  return (
    <div className={`${styles.blankConstructorElement} ${positionClass} ${extraClass} `}>
      {text}
    </div>
  );
};

export default BlankConstructorElement;
