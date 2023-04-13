import { Box, Typography } from "@mui/material"

import styles from "../../styles/box.module.css"

const DarkBox = ({name}) => {
    return (
        <Box className={styles.dark} >
            <Box className={styles.qus}>
                <Typography sx={{fontSize: "16px", fontWeight: "600"}} variant="p">{name}</Typography>
            </Box>
        </Box>
    )
}

export default DarkBox