import GitHubLogo from "../../images/github_button_logo.png";

interface GitHubButtonProps {
  URL: string;
}

const GitHubButton = ({ URL }: GitHubButtonProps) => {
  // opens link in new tab
  const handleClick = (site: string) => {
    setTimeout(function () {
      window.open(site, "_blank");
    }, 130);
  };

  return (
    <>
      <button className="github_button" onClick={() => handleClick(URL)}>
        <img className="github_logo" src={GitHubLogo} alt="github logo"></img>
        GitHub Repo
      </button>
    </>
  );
};

export default GitHubButton;
