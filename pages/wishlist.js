import Typographi from "@/components/reusable/typographi"
import useWishlist from "@/hooks/useWishlist"
import { decodeToken } from "@/utils/axios"
import PrivateRoute from "@/utils/PrivateRoute"
import { Box, Card, Rating, Typography } from "@mui/material"
import { useStoreActions } from "easy-peasy"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import styles from "../styles/wishlist.module.css"

const Wishlist = ({ wishlist }) => {
    const [userId, setUserId] = useState('');
    const {wishlist: wishlistStore} = useStoreActions((action) => action) 

    useEffect(() => {
        wishlistStore.getAllWishlist(wishlist)
        const token  = localStorage.getItem("token");
        if (token) {
            const userid = decodeToken(token)
            setUserId(userid);
        }
    }, [])

    const {product, loading, error} = useWishlist(userId)

    const imageLoader = ({ src }) => {
        return `http://localhost:1337${src}`;
    };

    if (loading) {
        return <Typography sx={{marginTop: 81}} variant="h4">Loading...</Typography>
    }
    if (error) {
        return <Typography sx={{marginTop: 81}} variant="h4">Some Error Occurd.</Typography>
    }

    return (
        <PrivateRoute>
        <Box className={styles.itemContainer}>
            <Box className={styles.upper}>
                <Typography className={styles.upperCount} variant="p">
                    {product.length} { product.length > 1 ? "items" : "item"} exist in<Typography className={styles.upperCount1} variant="p">your wishlist</Typography> 
                </Typography>
            </Box>
            <Box className={styles.products}>
            { product.length === 0 && <Typography className={styles.noitem} variant="h3">No item in your wishlist</Typography>}
                {product && product.map((item) => 
                    <Card key={item.id} className={styles.productCard}>
                        <Link className='global-link' key={item.name} href={`/brand/${item.brandName}/${item.id}`}>
                            <Box className={styles.image}>
                                <Image src={item?.imageurl} alt={"Image"} width={200} height={200} loader={imageLoader} />
                            </Box>
                        </Link>
                        <Box className={styles.details}>
                            <Box className={styles.priceBox}>
                                <Typography variant="h6">{`$${item.price}`}</Typography> 
                            </Box>
                            <Box className={styles.ratingContainer}>
                                <Rating name="read-only" value={3.5} precision={0.5} readOnly />
                                <Typographi align={"center"} variant={"p"} value={"(3.5)"} />
                            </Box>
                            <Typography sx={{color: "#6B7280"}} variant="h6">{item.name}</Typography> 
                        </Box>
                    </Card>
                )}
            </Box>
        </Box>
        </PrivateRoute>
    )
}

export default Wishlist

export async function getServerSideProps() {
    const res = await fetch("http://localhost:1337/api/wishlists?populate=user&populate=products")

    const {data: wishlistData} = await res.json();
    const wishlist = wishlistData?.map((item) => {
        const {user: {data: userId}, products: {data}} = item?.attributes

        const userid =userId && userId.id

        const productId = data.map((item) => {
            const id = item?.id
            return id
        }) 

        return {
            wishlistId: item.id, userid, productId
        }
    })

    return {
      props: {
          wishlist
      },
    };
}