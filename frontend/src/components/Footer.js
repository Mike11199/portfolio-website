import "../App.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="bottom_footer">
        <p>© Copyright Michael Iwanek {currentYear}</p>
      </div>
    </>
  );
};

export default Footer;
