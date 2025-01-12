import styles from "./HorizontalLoader.module.css";

const HorizontalLoader: React.FC = () => {
  return (
    <div data-testid="loader" className={styles.loader}>
      <div className={styles.bar}></div>
    </div>
  );
};

export default HorizontalLoader;
