import { Box } from "@mui/material"
import Image from "next/image"
import { useState, useEffect } from "react"

import styles from '../../styles/salesCard.module.css'
import up from '../../public/upcoming.png'
import Card from "./card"
import useUCProducts from "@/hooks/useUCProducts"
import up1 from "../../public/up1.png"
import up2 from "../../public/up2.png"
import up3 from "../../public/up3.png"

const SalesCard = ({ src, alt }) => {
    const [up, setUp] = useState([])
    const upProducts = useUCProducts()

    useEffect(() => {
        setUp(upProducts)
    }, [])

    return (
        <Box component='div' className={styles.container}>
            <Box className={styles.logo}>
                <Image src={src} alt={alt} width="100%" height="100%" />
            </Box>
            <Box className={styles.imageSection}>
                {
                    up.map(item => (
                        <Card key={item.id} name={item.name} price={item.price} />
                    ))
                }
            </Box>
        </Box>
    )
}

export default SalesCard