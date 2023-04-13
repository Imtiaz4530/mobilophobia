// import { Box, Card, Typography } from "@mui/material"
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useStoreActions } from "easy-peasy";

// import styles from "../styles/orderhistory.module.css"
// import m1 from "../public/m1.jpg"
// import { decodeToken } from "@/utils/axios";
// import useOrders from "@/hooks/useOrders";

// const Orderdetails = ({orders}) => {
//     const [userId, setUserId] = useState('');
//     const {getAllOrder} = useStoreActions((action) => action.order) 

//     useEffect(() => {
//         getAllOrder(orders)
//         const token  = localStorage.getItem("token");
//         if (token) {
//             const userid = decodeToken(token)
//             setUserId(userid);
//         }
//     }, [])

//     const {findOrderForSingleUser: data, loading, error} = useOrders(userId)
//     console.log("findOrderForSingleUser", data);
    
//     const imageLoader = ({ src }) => {
//         return `http://localhost:1337${src}`;
//     };
//     if (loading) {
//         return <Typography sx={{marginTop: 81}} variant="h4">Loading...</Typography>
//     }
//     if (error) {
//         return <Typography sx={{marginTop: 81}} variant="h4">Some Error Occurd.</Typography>
//     }
//     return (
//         <Box className={styles.container}>
//             <Typography className={styles.typo1} variant="h4">Order History</Typography>
//             <Box className={styles.orders}>
//                 { true ? <Typography className={styles.noitem} variant="h3">No orders till now.</Typography> : 
//                     <Card className={styles.orderCard}>
//                         <Box className={styles.image}>
//                             <Image src={m1} alt={"Image"} width={200} height={200} loader={imageLoader} />
//                         </Box>
//                     </Card>
//                 }
//             </Box>
//         </Box>
//     )
// }

// export default Orderdetails

// export async function getServerSideProps() {
//     const res = await fetch("http://localhost:1337/api/orders?populate=address&populate=products&populate=order_enum")

//     const {data: order} = await res.json();
//     const orders = order?.map((item) => {
//         const { address: {data: {attributes: {area, division, district, streetNO, house, subDistrict}}}, order_enum: {data: {attributes: {orderStatus}}}, userId, subtotal } = item?.attributes

//         return {
//             area, division, district, streetNO, house, subDistrict, id: item.id, userId, orderStatus, subtotal
//         }
//     })

//     return {
//       props: {
//           orders
//       },    
//     };
// }

// //getAllOrder