import {
  AdobeXD,
  Bootstrap,
  CSS3,
  Electron,
  ElectronBadge,
  Figma,
  Firebase,
  FirebaseBadge,
  Git,
  HTML5,
  JavaScript,
  NextJS,
  ReactLibrary,
  Redux,
  ReduxBadge,
  Sass,
  TailwindCSS,
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
  <TailwindCSS />,
];

export const designTechnologies = [<AdobeXD />, <Figma />];

export const badgesTechnologies = {
  HTML5: HTML5,
  CSS3: CSS3,
  JavaScript: JavaScript,
  Git: Git,
  SASS: Sass,
  Bootstrap: Bootstrap,
  React: ReactLibrary,
  Firebase: FirebaseBadge,
  Redux: ReduxBadge,
  Electron: ElectronBadge,
  TypeScript: TypeScript,
  Next: NextJS,
  TailwindCSS: TailwindCSS,
};

export const emailJS = {
  serviceId: 'service_8elkine',
  templateId: 'template_grwu51p',
  userId: process.env.NEXT_PUBLIC_EMAILJS_USERID,
};
