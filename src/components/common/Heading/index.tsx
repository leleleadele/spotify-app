import styles from "./index.module.css";

interface I_HeadingProps {
  tag: "h1" | "h2" | "h3" | "h4" | "p";
  children: React.ReactNode;
}

const Heading: React.FC<I_HeadingProps> = ({ tag, children }) => {
  switch (tag) {
    case "h1":
      return <h1 className={styles[tag]}>{children}</h1>;
    case "h2":
      return <h2 className={styles[tag]}>{children}</h2>;
    case "h3":
      return <h3 className={styles[tag]}>{children}</h3>;
    case "h4":
      return <h1 className={styles[tag]}>{children}</h1>;
    case "p":
      return <p className={styles[tag]}>{children}</p>;
    default:
      return <p className={styles[tag]}>{children}</p>;
  }
};

export default Heading;
