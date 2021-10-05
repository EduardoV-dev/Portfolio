import type { NextPage } from 'next';
import { Layout } from '../components/layout';
import { AboutMe, Home } from '../components/sections';

const SPA: NextPage = () => {
  return (
    <Layout>
      <Home />
      <AboutMe />
    </Layout>
  );
};

export default SPA;
