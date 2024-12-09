import styles from './blank-constructor-element.module.css';

const BlankConstructorElement = ({ type, text }) => {
  const positionClass =
    type === 'top' ? 'constructor-element_pos_top'
      : type === 'bottom' ? 'constructor-element_pos_bottom'
        : undefined;

  return (
    <div className={`${styles.blankConstructorElement} ${positionClass}`}>
      {text}
    </div>
  );
};

export default BlankConstructorElement;
