import "react-responsive-carousel/lib/styles/carousel.min.css";
import AboutMeSection from "./AboutMeSection";
import AlpinePeakClimbingSkiShop from "./projects/AlpinePeakClimbingSkiShop";
import ApplyYourSelfJobTracker from "./projects/ApplyYourSelfJobTracker";
import RSAEncryptionApp from "./projects/RSAEncryptionApp";
import SpaceTauApp from "./projects/SpaceTauApp";
import SmallShellProject from "./projects/SmallShellProject";
import PythonHashMap from "./projects/PythonHashMap";
import SlashUnrealEngine from "./projects/SlashUnrealEngine";
import KotlinAndroidProjects from "./projects/KotlinAndroidProjects";
import OpenGLSolarSystem from "./projects/OpenGLSolarSystem";
import PyTorchApp from "./projects/PyTorchApp";

const HomePage = () => {
  return (
    <>
      <div className="entire_page">
        <AboutMeSection />

        {/* Project # 10 - MERN Full Stack Job Application Tracker*/}
        <PyTorchApp />

        {/* Project # 1 - MERN Full Stack Rock Climbing and Ski Shop - AWS/ECS/Lambda */}
        <AlpinePeakClimbingSkiShop />

        {/* Project # 2 - MERN Full Stack Job Application Tracker*/}
        <ApplyYourSelfJobTracker />

        {/* Project # 3 - Electron.js and React RSA and AES Encryption App - */}
        <RSAEncryptionApp />

        {/* Project # 4 - Space Tau MySQL / Flask and Jinja Database Management App - */}
        <SpaceTauApp />

        {/* Project # 5 - Small Shell Programmed in C - */}
        <SmallShellProject />

        {/* Project # 6 - Python Ground Up Hash Map Implementation - */}
        <PythonHashMap />

        {/* Project # 7 - Android Jetpack Compose and Kotlin Mobile Dev Projects - */}
        <KotlinAndroidProjects />

        {/* Project # 8 - C++ Unreal Engine Project Action RPG Slash */}
        <SlashUnrealEngine />

        {/* Project # 9 - C++ OpenGl Model of the Solar System */}
        <OpenGLSolarSystem />
      </div>
    </>
  );
};

export default HomePage;
