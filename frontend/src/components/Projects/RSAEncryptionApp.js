import RSA_Gif from "../../images/rsa_encryption_1.gif";
import AES_Gif from "../../images/aes_encryption_1.gif";
import RSA_Image from "../../images/AESPage.png";
import AES_Image from "../../images/RSAPage.png";
import GitHubLogo from "../../images/github_1.png";

import { Carousel } from "react-responsive-carousel";

const handleClick = (site) => {
  setTimeout(function () {
    window.open(site, "_blank");
  }, 130);
};

const RSAEncryptionApp = () => {
  return (
    <>
      {/* SECTION FOR PROJECT #3 */}
      <section className="rsa_section">
        <h2 className="project_header">
          RSA & AES Encryption App - Electron.js, React.js
        </h2>

        {/* Buttons */}
        <div className="project_buttons">
          <button
            className="github_button"
            onClick={() =>
              handleClick("https://github.com/Mike11199/CS-361-RSA-React-App")
            }
          >
            <img
              className="github_logo"
              src={GitHubLogo}
              alt="github logo"
            ></img>
            GitHub Link
          </button>
          <button
            className="website_button"
            onClick={() => handleClick("https://rsa-react-app.herokuapp.com/")}
          >
            Live Website Link
          </button>
          <button
            className="video_button"
            onClick={() =>
              handleClick("https://www.youtube.com/watch?v=MQKmV63Wfbk")
            }
          >
            Video Link
          </button>
        </div>

        <div className="project_card_rsa_encryption">
          <div className="carousel_rsa_encryption">
            <Carousel width="100%" infiniteLoop="true">
              <div>
                <img alt="rsa_1" src={RSA_Gif} />
              </div>
              <div>
                <img alt="rsa_2" src={RSA_Image} />
              </div>
              <div>
                <img alt="aes_1" src={AES_Gif} />
              </div>
              <div>
                <img alt="aes_2" src={AES_Image} />
              </div>
            </Carousel>
          </div>

          <div className="text_description_rsa">
            <ul>
              <li>
                Developed an Electron.js (local exe) and web application to
                allow a user to encrypt/decrypt text with RSA and AES
                encryption, using front end technologies.
              </li>
              <li>
                Displayed RSA/AES keys and ciphertext as encoded in Base64, to
                allow for bits outside normal character encoding to be viewable
                as a text string on the website.
              </li>
              <li>
                Added tutorials to allow for a user to follow along to the
                website using a CLI approach and the openssl library. The
                library is fully compatible with the RSA encryption used by the
                website, allowing a user to store their private key locally, use
                the website to encrypt with a public key, and then use AES
                locally with the CLI to exchange files/text. This approach is
                completely secure as only text encrypted by the public key is
                exchanged over the web (the encrypted AES key).
              </li>
              <li>
                Implemented a microservice developed by another student to
                simulate a hybrid encryption scheme, where one uses RSA to
                exchange an AES key. The RSA key-pair holder sends their public
                key via an HTTP request to the partner's microservice, which
                sends back an encrypted AES key, along with random text
                encrypted with that AES key. These two items can then be
                decrypted using the website's functionality.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default RSAEncryptionApp;
