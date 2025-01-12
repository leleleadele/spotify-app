import styles from "./index.module.css";

const HorizontalLoader: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.bar}></div>
    </div>
  );
};

export default HorizontalLoader;
