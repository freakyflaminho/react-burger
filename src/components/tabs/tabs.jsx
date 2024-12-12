import PropTypes, { string } from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './tabs.module.css';

const Tabs = ({ tabs, onTabClick, active, getTitleByType }) => {
  return (
    <div className={`${styles.container}`}>
      {tabs.map(tab =>
        <Tab key={tab}
             value={tab}
             active={active === tab}
             onClick={onTabClick}
        >
          {getTitleByType(tab)}
        </Tab>)}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(string).isRequired,
  active: PropTypes.string.isRequired,
  onTabClick: PropTypes.func,
  getTitleByType: PropTypes.func,
};

export default Tabs;
