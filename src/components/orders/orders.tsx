import ScrollablePanel from '../panels/scrollable-panel/scrollable-panel';

type Props = {
  header: string;
};

const Orders = ({ header }: Props) => {
  return (
    <section>
      {header &&
        <h1 className="text text_type_main-large pt-10 pb-5">
          {header}
        </h1>
      }
      <ScrollablePanel>
        <p>In progress...</p>
      </ScrollablePanel>
    </section>
  );
};

export default Orders;
