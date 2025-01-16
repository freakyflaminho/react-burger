import styles from './blank-constructor-element.module.css';
import PropTypes from 'prop-types';

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

BlankConstructorElement.propTypes = {
  type: PropTypes.oneOf(['top', 'bottom']),
  text: PropTypes.string.isRequired,
  extraClass: PropTypes.string,
};

export default BlankConstructorElement;
