import {
  AdobeXD,
  Bootstrap,
  CSS3,
  Electron,
  Figma,
  Firebase,
  FirebaseBadge,
  Git,
  HTML5,
  JavaScript,
  NextJS,
  ReactLibrary,
  Redux,
  Sass,
  TypeScript,
} from '../icons';

export const LSDARKMODE = 'isDarkMode';
export const webDevelopmentTechnologies = [
  <HTML5 />,
  <CSS3 />,
  <JavaScript />,
  <Git />,
  <Sass />,
  <Bootstrap />,
  <ReactLibrary />,
  <Firebase />,
  <Redux />,
  <Electron />,
  <TypeScript />,
  <NextJS />,
];

export const designTechnologies = [<AdobeXD />, <Figma />];

export const badgesTechnologies = {
  html: HTML5,
  css: CSS3,
  javascript: JavaScript,
  git: Git,
  sass: Sass,
  bootstrap: Bootstrap,
  react: ReactLibrary,
  firebase: FirebaseBadge,
  redux: Redux,
  electron: Electron,
  typescript: TypeScript,
  next: NextJS,
};

export const emailJS = {
  serviceId: 'service_8elkine',
  templateId: 'template_grwu51p',
  userId: process.env.NEXT_PUBLIC_EMAILJS_USERID,
};
