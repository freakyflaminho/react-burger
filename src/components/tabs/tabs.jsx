import { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { tabRefsPropType } from '../../utils/prop-types';
import styles from './tabs.module.css';

const Tabs = ({ tabs, refs, getTitleByType }) => {
  const [current, setCurrent] = useState(tabs[0]);

  const handleTabClick = value => {
    refs[value].scrollIntoView({ behavior: 'smooth', block: 'start' });
    setCurrent(value);
  };

  return (
    <div className={`${styles.container}`}>
      {tabs.map(tab =>
        <Tab key={tab}
             value={tab}
             active={current === tab}
             onClick={handleTabClick}
        >
          {getTitleByType(tab)}
        </Tab>)}
    </div>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(string),
  refs: tabRefsPropType,
  getTitleByType: PropTypes.func,
};

export default Tabs;
