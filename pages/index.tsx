import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import {
  AboutMe,
  Home,
  Skills,
  Services,
} from '../components/sections';

const SPA: NextPage = () => {
  return (
    <Layout>
      <Home />
      <AboutMe />
      <Skills />
      <Services />
    </Layout>
  );
};

export default SPA;