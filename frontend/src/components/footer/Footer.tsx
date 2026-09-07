import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className={styles.footer}>
        <p>© Copyright Michael Iwanek {currentYear}</p>
      </div>
    </>
  );
};

export default Footer;
