
import React, { FC } from 'react'

import Head from 'next/head';

import {
  Box,
  Container
} from '@mui/material'

import styles from '@/styles/MainLayout.module.scss';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface LayoutPropsType {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}


const Layout: FC<LayoutPropsType> = ({ children, title, description, keywords }) => {

  return (
    <>
      <Head>
        <title>
          {title || "Movie muse"}
        </title>
        <meta
          name="description"
          content={"Movie site. Unlimited movies, TV shows, and more." + description}
        />
        <meta
          name="robots"
          content="index, follow"
        />
        <meta
          name="keywords"
          content={keywords || "Fim, movie, actor"}
        />
      </Head>
      <Box className={styles.wrapper}>
        <Header />
        <Box component="main" className={styles.main}>
          <Container
            className={styles.container}
            disableGutters
            maxWidth={false}
          >
            {children}
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
}

export default Layout;
