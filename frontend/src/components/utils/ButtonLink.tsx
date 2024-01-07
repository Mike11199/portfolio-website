interface ButtonLinkProps {
  URL: string;
  variant?: "red" | "blue";
  buttonText: string;
}

const ButtonLink = ({ URL, variant = "blue", buttonText }: ButtonLinkProps) => {
  // opens link in new tab
  const handleClick = (site: string) => {
    setTimeout(function () {
      window.open(site, "_blank");
    }, 130);
  };

  return (
    <>
      <button
        className={`${variant === "red" ? "video_button" : "website_button"}`}
        onClick={() => handleClick(URL)}
      >
        {buttonText}
      </button>
    </>
  );
};

export default ButtonLink;
