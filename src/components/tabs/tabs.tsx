import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientType } from '../../utils/types.ts';
import styles from './tabs.module.css';

type Props = {
  tabs: IngredientType[];
  active: IngredientType;
  onTabClick: (value: string) => void;
  getTitleByType: (type: IngredientType) => string;
};

const Tabs = ({ tabs, active, onTabClick, getTitleByType }: Props) => {
  return (
    <div className={styles.container}>
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

export default Tabs;
