import React from 'react'
import FirstSec from '../components/Home/FirstSec';
import Layout from './Layout';
import { Box } from '@chakra-ui/react';
import AboutusSec from '../components/Home/AboutusSec';
import TechnologySec from '../components/Home/TechnologySec';

export default function HomePage() {
  return (
    <Layout className='app-page'>
      <>
        <Box className="homepage_main">
          <FirstSec />
          <AboutusSec />
          <TechnologySec />
        </Box>
      </>
    </Layout>
    
  )
}
