import { Box, Card, Rating, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import styles from "../../styles/brands.module.css"
import useProducts from "@/hooks/useProducts";
import Typographi from "@/components/reusable/typographi";
import PriceFilter from "@/components/filter/priceFilter";
import RamFilter from "@/components/filter/ramFilter";
import RomFilter from "@/components/filter/romFilter";
import NetworkFilter from "@/components/filter/networkFilter";

const BrandItem = () => {
    const [checked, setChecked] = useState({one: false, two: false, three: false, four: false, five: false, six: false, seven: false, eight: false, nine: false});
    const [checked2, setChecked2] = useState({one: false, two: false, three: false, four: false, five: false, six: false, seven: false, eight: false});
    const [checked3, setChecked3] = useState({one: false, two: false, three: false, four: false, five: false, six: false});
    const [checked4, setChecked4] = useState({one: false, two: false, three: false, four: false});
    const [filter, setFilter] = useState([])
    const [fav, setFav] = useState(false)
    const router = useRouter()
    const {brand} = router.query
    const {findProduct, loading, error} = useProducts(brand)

    const imageLoader = ({ src }) => {
        return `http://localhost:1337${src}`;
    };

    const chking = Object.keys(checked).filter((item) => checked[item])
    const chking1 = Object.keys(checked2).filter((item) => checked2[item])
    const chking2 = Object.keys(checked3).filter((item) => checked3[item])
    const chking3 = Object.keys(checked4).filter((item) => checked4[item])

    const handleWishlist = () => {
        setFav(p => !p)
    }

    if (loading) {
        return <Typography sx={{marginTop: 81}} variant="h4">Loading...</Typography>
    }
    if (error) {
        return <Typography sx={{marginTop: 81}} variant="h4">Some Error Occurd.</Typography>
    }
    return (
        <Box className={styles.itemContainer} >  
            <Box className={styles.filter}>
                <PriceFilter products={findProduct} filter={filter} setFilter={setFilter} checked={checked} setChecked={setChecked} />
                <RamFilter products={findProduct} filter={filter} setFilter={setFilter} checked={checked2} setChecked={setChecked2} />
                <RomFilter products={findProduct} filter={filter} setFilter={setFilter} checked={checked3} setChecked={setChecked3} />
                <NetworkFilter products={findProduct} filter={filter} setFilter={setFilter} checked={checked4} setChecked={setChecked4} />
            </Box>
            <Box className={styles.main}>
                <Box className={styles.upper}>
                    { (chking.length > 0 || chking1.length > 0 || chking2.length > 0 || chking3.length > 0) && (filter.length >= 0 ) ? 
                    <Typography className={styles.upperCount} variant="p">
                        {filter.length} { filter.length > 1 ? "items" : "item"} exist in<Typography className={styles.upperCount1} variant="p">{brand}</Typography> 
                    </Typography> :
                    <Typography className={styles.upperCount} variant="p">
                        {findProduct.length} { findProduct.length > 1 ? "items" : "item"} exist in<Typography className={styles.upperCount1} variant="p">{brand}</Typography> 
                    </Typography>}
                </Box>

                <Box className={styles.products}>
                    { (chking.length > 0 || chking1.length > 0 || chking2.length > 0 || chking3.length > 0) && filter.length === 0 && <Typography className={styles.noitem} variant="h3">No filtered item found.</Typography>}
                    {
                        (chking.length === 0 && chking1.length === 0 && chking2.length === 0 && chking3.length === 0) ? (findProduct && findProduct.map((item) => 
                                <Card key={item.id} className={styles.productCard}>
                                    <Link className='global-link' key={item.name} href={`/brand/${brand}/${item.id}`}>
                                        <Box className={styles.image}>
                                            <Image src={item?.imageurl} alt={"Image"} width={210} height={210} loader={imageLoader} />
                                        </Box>
                                    </Link>
                                    <Box className={styles.details}>
                                        <Box className={styles.priceBox}>
                                            <Typography variant="h6">{`$${item.price}`}</Typography> 
                                            <Box className={styles.iconBox} >
                                                {fav ? <FavoriteIcon onClick={handleWishlist} className={styles.icon} /> : <FavoriteBorderIcon onClick={handleWishlist} className={styles.icon} />}
                                            </Box>
                                        </Box>
                                        <Box className={styles.ratingContainer}>
                                            <Rating name="read-only" value={3.5} precision={0.5} readOnly />
                                            <Typographi align={"center"} variant={"p"} value={"(3.5)"} />
                                        </Box>
                                        <Typography sx={{color: "#6B7280"}} variant="h6">{item.name}</Typography> 
                                    </Box>
                                </Card>
                        ))
                        :
                        (filter && filter.map((item) => 
                            <Card key={item.id} className={styles.productCard}>
                                <Box className={styles.image}>
                                    <Image src={item?.imageurl} alt={"Image"} width={210} height={210} loader={imageLoader} />
                                </Box>
                                <Box className={styles.details}>
                                    <Typography variant="h6">{`$${item.price}`}</Typography> 
                                    <Box className={styles.ratingContainer}>
                                        <Rating name="read-only" value={3.5} precision={0.5} readOnly />
                                        <Typographi align={"center"} variant={"p"} value={"(3.5)"} />
                                    </Box>
                                    <Typography sx={{color: "#6B7280"}} variant="h6">{item.name}</Typography> 
                                </Box>
                            </Card>
                        ))
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default BrandItem