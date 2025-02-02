import GitHubLogo from "../../images/githubButtonLogo.png";

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
      <button
        className="github_button"
        onClick={() => handleClick(URL)}
        title={URL}
      >
        <img className="github_logo" src={GitHubLogo} alt="github logo"></img>
        GitHub Repo
      </button>
    </>
  );
};

export default GitHubButton;
