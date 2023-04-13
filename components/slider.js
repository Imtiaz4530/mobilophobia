import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Box, Button } from '@mui/material';

import slide1 from '../public/slide1.png'
import slide2 from '../public/slide2.png'
import slide3 from '../public/slide3.png'
import styles from '../styles/navbar.module.css'

const slideIMG = [slide1, slide2, slide3, ]

const Slider = () => {
  
  return (
    <Box className={styles.slides}>
      <Swiper
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {
            slideIMG.map((item) => 
                <Box key={item}>
                    <SwiperSlide ><Image src={item} alt={item} /></SwiperSlide>
                </Box>
            )
        }
      </Swiper>
      <Button className={styles.button} variant="contained">Explore More</Button>
    </Box>
  )
}

export default Slider