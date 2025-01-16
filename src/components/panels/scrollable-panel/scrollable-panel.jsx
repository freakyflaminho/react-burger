import PropTypes from 'prop-types';
import styles from './scrollable-panel.module.css';

const ScrollablePanel = ({ children, onScroll, extraClass }) => {
  return (
    <div className={`${styles.scrollablePanel} ${extraClass}`} onScroll={onScroll}>
      {children}
    </div>
  );
};

ScrollablePanel.propTypes = {
  children: PropTypes.node,
  onScroll: PropTypes.func,
  extraClass: PropTypes.string,
};

export default ScrollablePanel;
