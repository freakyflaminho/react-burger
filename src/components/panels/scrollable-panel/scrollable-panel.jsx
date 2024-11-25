import PropTypes from 'prop-types';
import styles from './scrollable-panel.module.css';

const ScrollablePanel = ({ children }) => {
  return (
    <div className={`${styles.scrollablePanel}`}>
      {children}
    </div>
  );
};

ScrollablePanel.propTypes = {
  children: PropTypes.node,
};

export default ScrollablePanel;
