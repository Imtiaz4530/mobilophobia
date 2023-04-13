import { Box } from "@mui/material"
import Image from "next/image"

import styles from '../../styles/salesCard.module.css'
import Typographi from "./typographi"
import up1 from "../../public/up2.png"

const Card = ({name, price}) => {
    return (
        <Box sx={{transition: "all 1s"}} className={styles.card}>
            <Box className={styles.text}>
                <Typographi align={"center"} variant={"h5"} value={name} />
                <Typographi align={"center"} variant={"h6"} value={`$${price}`} />
            </Box>
            <Box>
                <Image className={styles.img} src={up1} alt="up1" />
            </Box>
        </Box>
    )
}

export default Card