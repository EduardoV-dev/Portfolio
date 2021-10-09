import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import {
  AboutMe,
  Home,
  Skills,
  Services,
  Portfolio
} from '../containers';

const SPA: NextPage = () => {
  return (
    <Layout>
      <Home />
      <AboutMe />
      <Skills />  
      <Services />
      <Portfolio />
    </Layout>
  );
};

export default SPA;