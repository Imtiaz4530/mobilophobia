import { Box, Card, Typography, Button } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "../styles/order.module.css"
import imageurl from "../public/m1.jpg"
import useFindproduct from "@/hooks/useFindproduct";
import { useEffect, useState } from "react";
import { decodeToken, privateRoute } from "@/utils/axios";
import PrivateRoute from "@/utils/PrivateRoute";

const Order = ({users}) => {
    const [userId, setUserId] = useState('');
    const router = useRouter()
    const {productId: id} = router?.query
    const {findProduct: product, items, loading, error} = useFindproduct(id)

    useEffect(() => {
        const token  = localStorage.getItem("token");
        if (token) {
            const userid = decodeToken(token)
            setUserId(userid);
        }
    }, [])
    const user = users.reduce((acc, cur) => {
        if (cur.id === Number(userId)) {
            acc.username = cur.username,
            acc.email = cur.email,
            acc.phone = cur.phone,
            acc.addressId = cur.addressId,
            acc.division = cur.division,
            acc.district = cur.district,
            acc.subDistrict = cur.subDistrict,
            acc.house = cur.house,
            acc.streetNo = cur.streetNo,
            acc.area = cur.area
        }
        return acc
    }, {})

    const handleOrder = async () => {
        if (userId) {
            try {
                const response = await privateRoute.post(`/orders`,{
                    data: {
                        userId: userId,
                        phone: user?.phone,
                        price: items?.price,
                        subtotal: items?.price - (items?.price * (items?.discount / 100)) + 10,
                        address: user?.addressId,
                        discount: items?.discount,
                        products: items?.id,
                        order_enum: "1"
                    }
                })
                window.location.reload()
            } catch (e) {
                console.error(e);
            }
        }
    }

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
        <Box className={styles.container}>
            <Box className={styles.upper}>
                <ShoppingCartIcon className={styles.upperIcon} />
                <Typography className={styles.upperCount} variant="h6"> Orders overview</Typography>
            </Box>
            <Box className={styles.orderDetails}>
                <Card className={styles.imageCard}>
                    <Image src={items?.imgURL} width={300} height={300} alt={items?.alt} loader={imageLoader} loading="lazy" />
                </Card>
                <Box className={styles.details}>
                        <Typography variant="h6">Username</Typography>
                        <Typography sx={{marginTop: "5px"}} component="div" variant="p">{user?.username}</Typography>
                        <Typography sx={{marginTop: "18px"}} variant="h6">Email</Typography>
                        <Typography sx={{marginTop: "5px"}} component="div" variant="p">{user?.email}</Typography>
                        <Typography sx={{marginTop: "18px"}} variant="h6">Phone</Typography>
                        <Typography sx={{marginTop: "5px"}} component="div" variant="p">0{user?.phone}</Typography>
                        <Typography sx={{marginTop: "18px"}} variant="h6">Address</Typography>
                        <Typography sx={{marginTop: "5px"}} component="div" variant="p">Flat # {user.house ? user.house : "--"}, Street # {user.streetNo ? user.streetNo : "--"}{user.area ?`, ${user.area}` : ""}{user.subDistrict ?`, ${user.subDistrict}` : ""}{user.district ?`, ${user.district}` : ""}{user.division ?`, ${user.division}` : ""}</Typography>
                </Box>  
                <Card className={styles.info}>
                    <Box className={styles.left}>
                        <Typography sx={{marginTop: "5px"}} variant="p">Price</Typography>
                        <Typography sx={{marginTop: "15px"}} variant="p">Quantity</Typography>
                        <Typography sx={{marginTop: "15px"}} variant="p">Discount</Typography>
                        <Typography sx={{marginTop: "15px"}} variant="p">Delivery Charge</Typography>
                        <hr className={styles.line} />
                        <Typography sx={{marginTop: "1px"}} variant="p">Subtotal</Typography>
                    </Box>
                    <Box className={styles.right}>
                        <Typography sx={{marginTop: "5px"}} variant="p">${items?.price}</Typography>
                        <Typography sx={{marginTop: "15px"}} variant="p">1</Typography>
                        <Typography sx={{marginTop: "15px"}} variant="p">{items?.discount}%</Typography>
                        <Typography sx={{marginTop: "15px"}} variant="p">$10</Typography>
                        <hr className={styles.line} />
                        <Typography sx={{marginTop: "1px"}} variant="p">${items?.price - (items?.price * (items?.discount / 100)) + 10}</Typography>
                    </Box>
                    <Button className={styles.orderBTN} onClick={handleOrder} variant="contained">Checkout</Button>
                </Card>  
            </Box>
        </Box>
        </PrivateRoute>
    )
}

export default Order

export async function getServerSideProps() {
    const res = await fetch("http://localhost:1337/api/users?populate=*")
    const data = await res.json();
    const users = data?.map((item) => {

        const {id, division, district, subDistrict, house, streetNO, area} = item?.address

        return {
            id: item.id,
            username: item.username,
            email: item.email,
            phone: item.phone,
            addressId: id,
            division: division,
            district: district,
            subDistrict: subDistrict,
            house: house,
            streetNo: streetNO,
            area: area,
        }
    })

    return {
      props: {
            users
      },
    };
}