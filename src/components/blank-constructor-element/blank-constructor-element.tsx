import styles from './blank-constructor-element.module.css';

type Props = {
  type?: 'top' | 'bottom';
  text: string;
  extraClass?: string;
};

const BlankConstructorElement = ({ type, text, extraClass }: Props) => {
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
