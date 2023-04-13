import { Box, Button, Typography, Slide } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"

import styles from "../styles/profile.module.css"
import manAvater from "../public/man.png"
import Register from "@/components/register";
import Login1 from "@/components/login1"
import { decodeToken, publicRoute } from "@/utils/axios"
import Address from "@/components/addressModel"

const Profile = ({address}) => {
    const [user, setUser] = useState('');
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);

    const singleAddress = address.filter((item) => Number(item.userId) === user.id)
    const addressValue = singleAddress.reduce((acc, cur) => {
        if (cur) {
            acc.id = cur.id
            acc.area = cur.area
            acc.division = cur.division
            acc.house = cur.house
            acc.streetNO = cur.streetNO
            acc.subDistrict = cur.subDistrict
            acc.district = cur.district
            acc.userId = Number(cur.userId)
        }

        return acc
    }, {})

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (token) {
        const userId = decodeToken(token)
        publicRoute.get(`/users/${userId}?populate=*&[address][populate]=*`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }, []);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    // login
    const handleClickOpen1 = () => {
      setOpen1(true);
    };
    const handleClose1 = () => {
      setOpen1(false);
    };
    //logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    // address
    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    const handleClose2 = () => {
        setOpen2(false);
    };
    
    const handleUserAddress =async () => {
        try {
          const res = await publicRoute.put(`/users/${user.id}` , {
              address: addressValue.id
          })
          console.log(res.data);
          window.location.reload();
      } catch (e) {
          console.log(e);
      }
    }

    return (
        <>
            {
                user.length === 0 ? 
                    <Box className={styles.container1}>
                        <Typography sx={{color: "#ababab"}} variant="h3">You don't have any profile yet!</Typography>
                        <Box className={styles.btnBox}>
                            <Button className={styles.createBTN} onClick={handleClickOpen} variant="contained">Create Profile</Button>
                            <Typography sx={{fontWeight: 600}} variant="p">OR</Typography>
                            <Button className={styles.createBTN} onClick={handleClickOpen1} variant="contained">Login</Button>
                        </Box>

                        <Register open={open} handleClose={handleClose} />
                        <Login1 open={open1} handleClose={handleClose1} />
                    </Box>
                    :
                    <Box className={styles.container}>
                        <Box className={styles.image}>
                            <Image src={manAvater} className={styles.avater1} alt={"manAvater"} width={400} width={400} />
                            <Typography variant="h4">{user?.name}</Typography>
                        </Box>
                        <Box className={styles.info}>
                            <Typography variant="h6">Username</Typography>
                            <Typography sx={{marginTop: "5px"}} component="div" variant="p">{user?.username}</Typography>
                            <Typography sx={{marginTop: "18px"}} variant="h6">Email</Typography>
                            <Typography sx={{marginTop: "5px"}} component="div" variant="p">{user?.email}</Typography>
                            <Typography sx={{marginTop: "18px"}} variant="h6">Phone</Typography>
                            <Typography sx={{marginTop: "5px"}} component="div" variant="p">{user?.phone}</Typography>

                            <Typography sx={{marginTop: "18px"}} variant="h6">Address</Typography>
                            {user?.address && singleAddress.length > 0 && <Typography sx={{marginTop: "5px"}} component="div" variant="p">Flat # {addressValue.house ? addressValue.house : "--"}, Street # {addressValue.streetNO ? addressValue.streetNO : "--"}{addressValue.area ?`, ${addressValue.area}` : ""}{addressValue.subDistrict ?`, ${addressValue.subDistrict}` : ""}{addressValue.district ?`, ${addressValue.district}` : ""}{addressValue.division ?`, ${addressValue.division}` : ""}</Typography>}

                            {user?.address === null && singleAddress.length > 0 && <Typography sx={{marginTop: "5px"}} component="div" variant="p">Flat # {addressValue.house ? addressValue.house : "--"}, Street # {addressValue.streetNO ? addressValue.streetNO : "--"}{addressValue.area ?`, ${addressValue.area}` : ""}{addressValue.subDistrict ?`, ${addressValue.subDistrict}` : ""}{addressValue.district ?`, ${addressValue.district}` : ""}{addressValue.division ?`, ${addressValue.division}` : ""}<Button onClick={handleUserAddress} className={styles.saveBTN} variant="contained">Save</Button></Typography>}

                            {user?.address === null && singleAddress.length === 0 && <Button className={styles.addressBTN} onClick={handleClickOpen2} variant="contained">Add address</Button>}
                            

                            <Address userId={user?.id} open={open2} handleClose={handleClose2} />
            
                            <Box className={styles.btns}>
                                <Button className={styles.editBTN} variant="contained">Edit Profile</Button>
                                <Button className={styles.editBTN} onClick={handleLogout} variant="contained">Logout</Button>
                            </Box>
                        </Box>
                    </Box>
            }
        </>
    )
}

export default Profile

// Flat # 203, House # 10/A, Housing Estate, Road # 4, Mohammadpur, Dhaka
export async function getServerSideProps() {
  const res = await fetch(`http://localhost:1337/api/addresses`);
  const {data} = await res.json();

  const address = data.map((item) => {
      const {area, district, division, house, streetNO, subDistrict, userId} = item?.attributes

      return {
          id: item.id, area, district, division, house, streetNO, subDistrict, userId
      }
  })

  return {
    props: {
        address
    },
  };
}
