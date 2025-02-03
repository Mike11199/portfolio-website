import { Carousel } from "react-responsive-carousel";
import GitHubButton from "../utils/GitHubButton";
import ButtonLink from "../utils/ButtonLink";
import ImagesList from "../utils/ImageList";
import { rsaEncryptionImages } from "../../images/imageData.json";
import CustomTextCarousel from "../CustomTextCarousel";
import { useWindowWidth } from "@react-hook/window-size";

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
  const windowWidth = useWindowWidth();

  return (
    <>
      <section className="rsa_section">
        <div className={"projectHeaderTextContainer"}>
          <h3 className="projectHeaderText">
            RSA & AES Encryption App - Electron.js, React.js
          </h3>

          <div className={"devIconsContainer"}>
            <div
              style={{
                position: "relative",
                width: "4rem",
                height: "4rem",
                borderRadius: "50%",
                backgroundColor: "#222",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/electron/electron-original.svg"
                alt="electron.js logo"
                style={{
                  width: "3rem",
                  height: "auto",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </div>

            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original-wordmark.svg"
              alt="React logo"
              style={{ width: "3.5rem", height: "auto" }}
            />
          </div>

          {/* Buttons */}
          <div className="projectButtons">
            <GitHubButton
              URL={"https://github.com/Mike11199/CS-361-RSA-React-App"}
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
          </div>
        </div>

        {/* Image Carousel */}
        <div className="project_card_rsa_encryption">
          <div className="carousel_rsa_encryption">
            <Carousel
              swipeable={false}
              emulateTouch={false}
              width="100%"
              infiniteLoop={true}
              showIndicators={false}
              dynamicHeight={true}
              showThumbs={windowWidth > 600}
            >
              {ImagesList(rsaEncryptionImages)}
            </Carousel>
          </div>

          {/* Text Description */}

          <CustomTextCarousel
            descriptionList={rSAEncryptionProjectDescriptionText}
            heightProp={"62vh"}
          />
        </div>
      </section>
    </>
  );
};

export default RSAEncryptionApp;
