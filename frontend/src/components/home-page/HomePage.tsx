import styles from "./HomePage.module.css";
import AboutMeSection from "../about-me-section/AboutMeSection";
import AlpinePeakClimbingSkiShop from "../projects/alpine-peak/AlpinePeakClimbingSkiShop";
import KspScripting from "../projects/ksp-scripting/KspScripting";
import SmallShellProject from "../projects/small-shell/SmallShellProject";
import PythonHashMap from "../projects/python-hash-map/PythonHashMap";
import SlashUnrealEngine from "../projects/slash-unreal-engine/SlashUnrealEngine";
import KotlinAndroidProjects from "../projects/kotlin-android/KotlinAndroidProjects";
import OpenGLSolarSystem from "../projects/opengl-solar-system/OpenGLSolarSystem";
import PyTorchApp from "../projects/pytorch/PyTorchApp";

const HomePage = () => {
  return (
    <>
      <main className={styles.page}>
        <AboutMeSection />
        <PyTorchApp />
        <AlpinePeakClimbingSkiShop />
        <KspScripting />
        <SmallShellProject />
        <PythonHashMap />
        <KotlinAndroidProjects />
        <SlashUnrealEngine />
        <OpenGLSolarSystem />
      </main>
    </>
  );
};

export default HomePage;
