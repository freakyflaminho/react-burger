import PropTypes from 'prop-types';
import styles from './scrollable-panel.module.css';

const ScrollablePanel = ({ children, onScroll }) => {
  return (
    <div className={`${styles.scrollablePanel}`} onScroll={onScroll}>
      {children}
    </div>
  );
};

ScrollablePanel.propTypes = {
  children: PropTypes.node,
};

export default ScrollablePanel;
