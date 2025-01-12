import Heading from "@/components/Heading";
import styles from "./index.module.css";

const EmptyMessage: React.FC = () => {
  return (
    <div className={styles.emptyMessage}>
      <img className={styles.image} src="/birdie-640.png" alt="sparrow" />
      <div>
        <Heading tag="p">Izlasē nav nevienas dziesmas</Heading>
        <p>Sameklē dziesmu un atzīmē to ar sirsniņu, lai pievienotu izlasei</p>
      </div>
    </div>
  );
};

export default EmptyMessage;
