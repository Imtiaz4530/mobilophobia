import { Box } from "@mui/material"
import { useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"

import styles from "../styles/discount.module.css"
import DisCard from "./reusable/dcCard"
import Typographi from "./reusable/typographi"

const Discount = () => {
    const [dis, setDis] = useState([])
    const {data, loading, error} = useStoreState(state => state.products)

    useEffect(() => {
        const findDc = data.filter(item => item.discount > 0) 
        setDis(findDc)
    }, []);

    if (loading) {
        return <Typography sx={{marginTop: 81}} variant="h4">Loading...</Typography>
    }
    if (error) {
        return <Typography sx={{marginTop: 81}} variant="h4">Some Error Occurd.</Typography>
    }

    return (
        <Box className={styles.container}>
            <Typographi align={"center"} variant={"h3"} value={"Discount Offers"} />
            <Box className={styles.cardContainer}>
                {
                    dis && dis.map((item) => <DisCard key={item.id} productId={item.id} brand={item.brandName} src1={item.imageurl} name={item.name} price={item.price} discount={item.discount} />)
                }
            </Box>
        </Box>
    )
}

export default Discount