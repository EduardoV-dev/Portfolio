import type { NextPage } from 'next';
import { useContext } from 'react';
import { Layout } from '../components/layout';
import { Home } from '../components/sections';
import { appContext } from '../hooks/context/AppContext';

const SPA: NextPage = () => {
  const { state: { darkMode } } = useContext(appContext);

  return (
    <Layout>
      <Home darkMode={darkMode} />
    </Layout>
  );
};

export default SPA;
