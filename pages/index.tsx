import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import { AboutMe, Home, Skills } from '../components/sections';

const SPA: NextPage = () => {
  return (
    <Layout>
      <Home />
      <AboutMe />
      <Skills />
    </Layout>
  );
};

export default SPA;