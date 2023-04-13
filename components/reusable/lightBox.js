import { Box, Typography } from "@mui/material"

import styles from "../../styles/box.module.css"

const LightBox = ({name, answer}) => {
    return (
        <Box className={styles.light} >
            <Box className={styles.qus}>
                <Typography sx={{fontSize: "16px", color: "#4e4e4e"}} variant="p">{name}</Typography>
            </Box>
            <Box className={styles.ans}>
                <Typography sx={{fontSize: "16px", color: "#4e4e4e"}} variant="p">{answer}</Typography>
            </Box>
        </Box>
    )
}

export default LightBox