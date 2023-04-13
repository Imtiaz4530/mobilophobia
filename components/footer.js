import { Box, Typography } from "@mui/material"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import styles from "../styles/footer.module.css"

const Footer = () => {
    return (
        <Box className={styles.container}>
            <Box className={styles.main}>
                <Box className={styles.logo}>
                    <Typography variant="h6" component="div" sx={{ color: "#4b7fcb", letterSpacing: 8.5}}> MOBILOPHOBIA </Typography>
                    <Typography variant="p" component="p" sx={{ color: "#29323d", letterSpacing: 8.5}}> Steal what is best for you. </Typography>
                </Box>
                <Box className={styles.about}>
                    <Typography variant="h6" component="div" sx={{ color: "#4b7fcb", letterSpacing: 8.5}}> About Us </Typography>
                    <Typography variant="p" component="p" sx={{ color: "#4b7fcb", letterSpacing: 4}}> 
                        Mobilophobia aims to be the most useful and trusted mobile phone info website in Bangladesh. The goal is to help the growing number of users and buyers with all the vital info they need about the phone industry and their gadgets.
                    </Typography>
                </Box>
                <Box className={styles.social}>
                    <Typography variant="h6" component="div" sx={{ color: "#4b7fcb", letterSpacing: 8.5}}> Social Media </Typography>
                    <Box className={styles.icon}>
                        <FacebookIcon className={styles.iconItem} sx={{ color: '#4267B2', fontSize: 32 }} />
                        <TwitterIcon className={styles.iconItem} sx={{ color: '#1DA1F2', fontSize: 32  }} />
                        <LinkedInIcon className={styles.iconItem} sx={{ color: '#0072b1', fontSize: 32  }} />
                        <PinterestIcon className={styles.iconItem} sx={{ color: '#E60023', fontSize: 32  }} />
                        <WhatsAppIcon className={styles.iconItem} sx={{ color: '#075E54', fontSize: 32  }} />
                    </Box>
                </Box>
            </Box>
            <Box className={styles.copyright}>
                <Typography variant="p" component="p"> © 2023 All Rights Reserved Mobilophobia </Typography>
            </Box>
        </Box>
    )
}

export default Footer