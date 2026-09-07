import type { CSSProperties, ReactNode } from "react";
import OpenSSLLogo from "./openssl_logo.svg";

const iconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

interface DevIconProps {
  src: string;
  alt: string;
  style?: CSSProperties;
}

const DevIcon = ({ src, alt, style }: DevIconProps) => (
  <img src={src} alt={alt} style={{ width: "3.5rem", height: "auto", ...style }} />
);

const IconBadge = ({ background, children }: { background: string; children: ReactNode }) => (
  <div style={{
    position: "relative",
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    backgroundColor: background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "5px 2px 10px rgba(0, 0, 0, 0.4)",
  }}>
    {children}
  </div>
);

export const AndroidStudioIcon = () => (
  <DevIcon src={`${iconUrl}androidstudio/androidstudio-original.svg`} alt="android studio logo" />
);

export const AwsIcon = () => (
  <DevIcon src={`${iconUrl}amazonwebservices/amazonwebservices-original-wordmark.svg`} alt="aws logo" />
);

export const CIcon = () => (
  <DevIcon src="https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png" alt="c logo" />
);

export const CppIcon = () => (
  <DevIcon src={`${iconUrl}cplusplus/cplusplus-original.svg`} alt="c++ logo" />
);

export const CSharpIcon = () => (
  <DevIcon src={`${iconUrl}csharp/csharp-original.svg`} alt="C# logo" />
);

export const DockerIcon = () => (
  <DevIcon src={`${iconUrl}docker/docker-original-wordmark.svg`} alt="docker logo" />
);

export const DotNetIcon = () => (
  <DevIcon src={`${iconUrl}dotnetcore/dotnetcore-original.svg`} alt=".NET logo" />
);

export const ElectronIcon = () => (
  <IconBadge background="#222">
    <DevIcon src={`${iconUrl}electron/electron-original.svg`} alt="electron.js logo"
      style={{ width: "3rem", position: "relative", zIndex: 1 }} />
  </IconBadge>
);

export const JavaIcon = () => (
  <DevIcon src={`${iconUrl}java/java-original-wordmark.svg`} alt="java logo" />
);

export const JetpackComposeIcon = () => (
  <DevIcon src={`${iconUrl}jetpackcompose/jetpackcompose-original-wordmark.svg`} alt="jetpack compose logo" />
);

export const KotlinIcon = () => (
  <DevIcon src={`${iconUrl}kotlin/kotlin-plain-wordmark.svg`} alt="kotlin logo" />
);

export const LinuxIcon = () => (
  <DevIcon src={`${iconUrl}linux/linux-original.svg`} alt="linux logo" />
);

export const NginxIcon = () => (
  <DevIcon src={`${iconUrl}nginx/nginx-original.svg`} alt="nginx logo" />
);

export const OpenGLIcon = () => (
  <DevIcon src={`${iconUrl}opengl/opengl-plain.svg`} alt="opengl logo" />
);

export const OpenSSLIcon = () => (
  <IconBadge background="#8b8a8a">
    <DevIcon src={OpenSSLLogo} alt="OpenSSL logo" />
  </IconBadge>
);

export const PostgreSQLIcon = () => (
  <DevIcon src={`${iconUrl}postgresql/postgresql-original-wordmark.svg`} alt="postgresql logo" />
);

export const PytestIcon = () => (
  <DevIcon src={`${iconUrl}pytest/pytest-original-wordmark.svg`} alt="pytest logo" />
);

export const PythonIcon = () => (
  <DevIcon src={`${iconUrl}python/python-original-wordmark.svg`} alt="python logo" />
);

export const PyTorchIcon = () => (
  <DevIcon src={`${iconUrl}pytorch/pytorch-plain-wordmark.svg`} alt="pytorch logo" />
);

export const ReactIcon = () => (
  <DevIcon src={`${iconUrl}react/react-original-wordmark.svg`} alt="React logo" />
);

export const SocketIOIcon = () => (
  <DevIcon src={`${iconUrl}socketio/socketio-original-wordmark.svg`} alt="socket-io logo"
    style={{ filter: "brightness(0) invert(1)" }} />
);

export const SpringIcon = () => (
  <DevIcon src={`${iconUrl}spring/spring-original-wordmark.svg`} alt="spring boot logo" />
);

export const TypeScriptIcon = () => (
  <DevIcon src={`${iconUrl}typescript/typescript-original.svg`} alt="typescript logo" />
);

export const UnrealEngineIcon = () => (
  <DevIcon src={`${iconUrl}unrealengine/unrealengine-original-wordmark.svg`} alt="unreal engine logo"
    style={{ filter: "invert(100%) brightness(200%)" }} />
);
