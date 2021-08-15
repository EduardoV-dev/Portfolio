import { createContext, useContext } from "react";

type UIType =  'light' | 'dark';

interface IProject {
  name: string;
  description: string;
  technologies: string[];
  images: string[];
  urlToProduction: string;
  urlToSourceCode: string;
}

interface IAppContext {
  uiMode: UIType;
  projects: IProject[];
}

export appContext = createContext<IAppContext>({
  uiMode: 'dark',
  projects: []
});


