import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components';
import {
  AboutMe,
  Home,
  Skills,
  Services,
  Portfolio,
  ContactMe,
} from '../containers';

const SPA: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eduardo Varela | Front end Developer</title>
      </Head>
      <Header />
      <Home />
      <AboutMe />
      <Skills />  
      <Services />
      <Portfolio />
      <ContactMe />
    </>
  );
};

export default SPA;