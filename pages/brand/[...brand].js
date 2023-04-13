import { useEffect, useState } from 'react';
import { Box, Button, IconButton, Rating, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import CheckIcon from '@mui/icons-material/Check';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import Image from "next/image";
import CloseIcon from '@mui/icons-material/Close';
import { useStoreActions } from 'easy-peasy';
import Link from 'next/link';

import useProducts from '@/hooks/useProducts'
import styles from "../../styles/productDetails.module.css" 
import DarkBox from '@/components/reusable/darkBox';
import LightBox from '@/components/reusable/lightBox';
import { publicRoute, decodeToken, privateRoute } from '@/utils/axios';
import useWishlist from '@/hooks/useWishlist';

const ProductsDetails = ({wishlist}) => {
    const [userId, setUserId] = useState('');
    const [love, setLove] = useState(false)
    const router = useRouter()
    const {brand} = router.query
    const brandName = brand && brand[0]
    const id = brand && brand[1]
    const {findProduct} = useProducts(brandName)
    const {wishlist: wishlistStore} = useStoreActions((action) => action) 

    useEffect(() => {
        wishlistStore.getAllWishlist(wishlist)
        const token  = localStorage.getItem("token");
        if (token) {
            const userid = decodeToken(token)
            setUserId(userid);
        }
    }, [])

    const {product} = useWishlist(userId)

    const productDetails = findProduct.filter((item) => item.id === Number(id))

    const imageLoader = ({ src }) => {
        return `http://localhost:1337${src}`;
    };
    const handleWishlist = async (productId) => {
        if (userId) {
            try {
                const response = await privateRoute.post(`/wishlists`,{
                    data: {
                        user: userId,
                        products: productId
                        
                    }
                })
                window.location.reload()
            } catch (e) {
                console.error(e);
            }
        }
    }
    const removeWishlist = async (id) => {
        const singleUserProducts = wishlist.filter((item) => item.userid === userId)
        const deleteProduct = singleUserProducts.filter((item) => item.productId.includes(id))
        const wishlistId = deleteProduct.length > 0 && deleteProduct[0]?.wishlistId

        await privateRoute.delete(`/wishlists/${wishlistId}`)
        window.location.reload()
    }

    return (
        <>
            {
                productDetails.length > 0 ? productDetails.map((item) =>                 
                    <Box key={item.id} className={styles.container}>
                        <Box className={styles.upperSection}>
                            <Box className={styles.image}>
                                <Image src={item.imageurl} width={300} height={300}  alt={item.imagehash} loader={imageLoader}/>
                            </Box>
                            <Box className={styles.basic}>
                                <Box className={styles.topIcon}>
                                    <Typography className={styles.stock} variant='p'><CheckIcon sx={{marginRight: "5px"}} /> In stock <Link className='global-link' 
                                    href={`/order?productId=${item.id}`}><Button className={styles.orderBtn} variant="outlined">Order Now</Button></Link></Typography>

                                    { product.filter((item1) => item1.id === item.id).length > 0 ? <Typography className={styles.love} variant='h6' onClick={()=> removeWishlist(item.id)} ><FavoriteIcon sx={{marginRight: "10px"}} /> Saved</Typography> : <Typography variant='h6' 
                                    ><IconButton disabled={!userId} className={styles.love} onClick={() => handleWishlist(item.id)}><FavoriteBorderIcon sx={{marginRight: "10px"}} /> Save for later </IconButton></Typography>}
                                </Box>

                                <Typography className={styles.name} variant='h6'>{item.name}</Typography>
                                <Box className={styles.ratingContainer}>
                                    <Rating size="small" name="read-only" value={3.5} precision={0.5} readOnly />
                                    <Typography className={styles.rating} variant='p'> 3.5 (32 reviews)</Typography>
                                    <Typography className={styles.sold} variant='p'><ShoppingBasketOutlinedIcon sx={{marginRight: "7px"}} /> 121 sold</Typography>
                                </Box>
                                <Box className={styles.container1}>
                                    <Box className={styles.info}>
                                        <Typography className={styles.price} variant='p'> Price: </Typography>
                                        <Typography className={styles.brand} variant='p'> Brand: </Typography>
                                        <Typography className={styles.color} variant='p'> Colors: </Typography>
                                        <Typography className={styles.date1} variant='p'> Launch Announcement: </Typography>
                                        <Typography className={styles.date2} variant='p'> Launch Date: </Typography>
                                    </Box>
                                    <Box className={styles.info}>
                                        <Typography className={styles.price} variant='p'> ${item.price} </Typography>
                                        <Typography className={styles.brand} variant='p'> {item.brandName} </Typography>
                                        <Typography className={styles.color} variant='p'> Phantom Black, Green, Cream, Lavender, Graphite, Sky Blue, Lime, Red </Typography>
                                        <Typography className={styles.date1} variant='p'> 2023, March </Typography>
                                        <Typography className={styles.date2} variant='p'> Released 2023, March </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box className={styles.bottomSection}>
                            <Typography sx={{marginBottom: 5}} variant='h4'>Full Specification</Typography>

                            <DarkBox name="Connectivity" />
                            <LightBox name="Network" answer={"2G 3G 4G 5G"} />
                            <LightBox name="SIM" answer={item.sim} />
                            <LightBox name="WLAN" answer={item.wlan} />
                            <LightBox name="Bluetooth" answer={item.bluetooth} />
                            <LightBox name="GPS" answer={item.gps} />
                            <LightBox name="Radio" answer={item.radio} />
                            <LightBox name="USB" answer={item.usb} />
                            <LightBox name="OTG" answer={item.otg} />
                            <LightBox name="USB Type-C" answer={item.typeC} />
                            <LightBox name="NFC" answer={item.nfc} />

                            <DarkBox name="Body" />
                            <LightBox name="Style" answer={item.style} />
                            <LightBox name="Material" answer={item.material} />
                            <LightBox name="Water Resistance" answer={item.waterResistance} />
                            <LightBox name="Dimensions" answer={item.dimensions} />
                            <LightBox name="Weight" answer={item.weight} />

                            <DarkBox name="Display" />
                            <LightBox name="Size" answer={item.size} />
                            <LightBox name="Resolution" answer={item.displayResolution} />
                            <LightBox name="Technology" answer={item.technology} />
                            <LightBox name="Protection" answer={item.protection} />
                            <LightBox name="Features" answer={item.displayFeature} />

                            <DarkBox name="Front Camera" />
                            <LightBox name="Resolution" answer={item.fCameraResolution} />
                            <LightBox name="Features" answer={item.fCameraFeatures} />
                            <LightBox name="Video Recording" answer={item.fCameraVideoRecording} />

                            <DarkBox name="Back Camera" />
                            <LightBox name="Resolution" answer={item.bCameraResolution} />
                            <LightBox name="Features" answer={item.bCameraFeatures} />
                            <LightBox name="Video Recording" answer={item.bCameraVideoRecording} />

                            <DarkBox name="Battery" />
                            <LightBox name="Type and Capacity" answer={item.typeAndCapacity} />
                            <LightBox name="Fast Charging" answer={item.fastCharging} />
                            <LightBox name="Wireless Charging" answer={item.wirelessCharging ? <CheckIcon /> : <CloseIcon />} />

                            <DarkBox name="Performance" />
                            <LightBox name="Operating System" answer={item.OS} />
                            <LightBox name="Chipset" answer={item.chipset} />
                            <LightBox name="RAM" answer={item.rams?.data[0]?.attributes?.ram.split("r-")} />
                            <LightBox name="Processor" answer={item?.processor} />
                            <LightBox name="GPU" answer={item?.gpu} />

                            <DarkBox name="Storage" />
                            <LightBox name="ROM" answer={item.roms?.data[0]?.attributes?.rom.split("r-")} />
                            <LightBox name="MicroSD Slot" answer={item.externalSlot ? <CheckIcon /> : <CloseIcon />} />

                            <DarkBox name="Sound" />
                            <LightBox name="3.5mm Jack" answer={item.earphoneJack ? <CheckIcon /> : <CloseIcon />} />
                            <LightBox name="Features" answer={item.soundFeature} />

                            <DarkBox name="Security" />
                            <LightBox name="Fingerprint" answer={item.fingerPrint} />
                            <LightBox name="Face Unlock" answer={item.faceLock ? <CheckIcon /> : <CloseIcon />} />
                            <LightBox name="More" answer={item?.more} />

                            <DarkBox name="Others" />
                            <LightBox name="Sensors" answer={item.sensors} />
                            <LightBox name="Manufactured by" answer={item.manufacturedBy} />
                            <LightBox name="Made in" answer={item?.madeIn} />
                        </Box>
                    </Box> )
                : <Typography variant=''></Typography>
            }
        </>

    )
}

export default ProductsDetails

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