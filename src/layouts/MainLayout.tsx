
import React, { FC } from 'react'

import {
  Box,
  Container
} from '@mui/material'

import styles from '@/styles/MainLayout.module.scss';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface LayoutPropsType {
  children: React.ReactNode;
}


const Layout: FC<LayoutPropsType> = ({ children }) => {

  return (
    <Box className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Container
          className={styles.container}
          disableGutters
          maxWidth={false}
        >
          {children}
        </Container>
      </main>
      <Footer />
    </Box>
  );
}

export default Layout;
