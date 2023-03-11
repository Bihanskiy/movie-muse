import React from 'react'

import { Box, Typography, Divider } from '@mui/material'

import styles from '@/styles/Footer.module.scss';

const Footer = () => {
  return (
    <Box
      component="footer"
      className={styles.footer}
    >
      <Box className={styles.footerContent}>
        <Typography className={styles.footerLogo}>
          Movie Muse
        </Typography>
      </Box>
      <Divider sx={{mb: 1.5}}/>
      <Box className={styles.footerBottom}>
        <Typography className={styles.footerReservedText}>
          © Movie Muse. All rights reserved
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer;