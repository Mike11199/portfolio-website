import { OpenSSLIcon, ElectronIcon, ReactIcon } from "../components/dev-icons/DevIcons";
import ProjectHeader from "../components/project-header/ProjectHeader";
import "./RSAEncryptionApp.css";
import { useState } from "react";
import Carousel from "../../utils/project-image-carousel/ProjectImageCarousel";
import ButtonLink from "../../utils/buttons/ButtonLink";
import GitHubCodeViewer from "../../utils/github-code-viewer/GitHubCodeViewer";
import RepositoryActions from "../../utils/github-code-viewer/RepositoryActions";
import { rsaEncryptionImages } from "../../../images/imageData.json";
import ProjectSection from "../components/project-section/ProjectSection";


const RSAEncryptionApp = () => {
  const rSAEncryptionProjectDescriptionText = [
    `Developed an Electron.js (local exe) and web application to
    allow a user to encrypt/decrypt text with RSA and AES
    encryption, using front end technologies.`,

    `Displayed RSA/AES keys and ciphertext as encoded in Base64, to
    allow for bits outside normal character encoding to be viewable
    as a text string on the website.`,

    `Added tutorials to allow for a user to follow along to the
    website using a CLI approach and the openssl library. The
    library is fully compatible with the RSA encryption used by the
    website, allowing a user to store their private key locally, use
    the website to encrypt with a public key, and then use AES
    locally with the CLI to exchange files/text. This approach is
    completely secure as only text encrypted by the public key is
    exchanged over the web (the encrypted AES key).`,

    `Implemented a microservice developed by another student to
    simulate a hybrid encryption scheme, where one uses RSA to
    exchange an AES key. The RSA key-pair holder sends their public
    key via an HTTP request to the partner's microservice, which
    sends back an encrypted AES key, along with random text
    encrypted with that AES key. These two items can then be
    decrypted using the website's functionality.`,
  ];
  const [showCode, setShowCode] = useState(false);
  const repositoryUrl = "https://github.com/Mike11199/CS-361-RSA-React-App";

  return (
    <>
      <section className="portfolio-project rsa_section">
        <ProjectHeader
          title={"RSA & AES Encryption App - Electron.js, React.js"}
          icons={
            <>
              <OpenSSLIcon />
              <ElectronIcon />
              <ReactIcon />
            </>
          }
          actions={
            <>
              <RepositoryActions
                repositoryUrl={repositoryUrl}
              />
              <ButtonLink
                URL={"https://rsa-react-app.herokuapp.com/"}
                variant={"blue"}
                buttonText={"Live Website Link"}
              />
              <ButtonLink
                URL={"https://www.youtube.com/watch?v=MQKmV63Wfbk"}
                variant={"red"}
                buttonText={"Video Link"}
              />
            </>
          }
        />

        <ProjectSection
          showCode={showCode}
          onToggleCode={() => setShowCode((visible) => !visible)}
          code={
              <GitHubCodeViewer
                repositoryUrl={repositoryUrl}
                owner="Mike11199"
                repository="CS-361-RSA-React-App"
              />
          }
          media={
              <Carousel items={rsaEncryptionImages} />
          }
          description={rSAEncryptionProjectDescriptionText}
        />
      </section>
    </>
  );
};

export default RSAEncryptionApp;
