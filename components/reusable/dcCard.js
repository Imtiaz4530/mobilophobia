import { Box, Card, Rating } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

import styles from "../../styles/discount.module.css"
import Typographi from "./typographi"

const DisCard = ({ productId, brand, src1, name, price, discount }) => {
    const imageLoader = ({ src }) => {
        return `http://localhost:1337${src}`;
    };

    const discountValue = price * discount/100
    const discountedPrice = Math.floor(price - discountValue)

    return (
        <Link className='global-link' href={`/brand/${brand}/${productId}`}>
            <Card className={styles.card}>
                <Image className={styles.image} src={src1} alt={"Image"} width={180} height={180} loader={imageLoader}  />
                <Box className={styles.items}>
                    <Box className={styles.price}>
                        <Typographi className={styles.dcprice} align={"center"} variant={"p"} value={`$${discountedPrice}`} />
                        <Typographi sx={{color: "#A0A0A0", textDecoration: "line-through"}} align={"center"} variant={"p"} value={`$${price}`} />
                    </Box>
                    <Box className={styles.ratingContainer}>
                        <Rating className={styles.rating} name="read-only" value={3.5} precision={0.5} readOnly />
                        <Typographi align={"center"} variant={"p"} value={"(3.5)"} />
                    </Box>
                    <Typographi sx={{color: '#6B7280'}} align={"center"} variant={"h6"} value={name} />
                </Box>
            </Card>
        </Link>
    )
}

export default DisCard