import "react-responsive-carousel/lib/styles/carousel.min.css";
import AboutMeSection from "./about-me-section/AboutMeSection";
import AlpinePeakClimbingSkiShop from "./projects/alpine-peak/AlpinePeakClimbingSkiShop";
import KspScripting from "./projects/ksp-scripting/KspScripting";
import SmallShellProject from "./projects/small-shell/SmallShellProject";
import PythonHashMap from "./projects/python-hash-map/PythonHashMap";
import SlashUnrealEngine from "./projects/slash-unreal-engine/SlashUnrealEngine";
import KotlinAndroidProjects from "./projects/kotlin-android/KotlinAndroidProjects";
import OpenGLSolarSystem from "./projects/opengl-solar-system/OpenGLSolarSystem";
import PyTorchApp from "./projects/pytorch/PyTorchApp";

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

        {/* Project # 4 - C# KSP scripting with kRPC */}
        <KspScripting />

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
