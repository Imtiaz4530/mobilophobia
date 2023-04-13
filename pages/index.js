import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { Box, Button } from '@mui/material';

import BrandHeader from '@/components/brandHeader';
import styles from '../styles/Home.module.css'
import Slider from '@/components/slider';
import SalesCard from '@/components/reusable/salesCard';
import bs from '../public/bestS.png'
import up from '../public/upcoming.png'
import tr from '../public/topR.png'
import Discount from '@/components/discount';

export default function Home({brands, products}) {
    const {brands: brandStore, products: productStore} = useStoreActions((action) => action) 
    const {brands: {data: brandData, loading: brandLoading, error: brandError}, products: {data: productData, loading: productLoading, error: productError}} = useStoreState((state) => state) ;
 
    useEffect(() => {
        brandStore.getAllBrands(brands)
        productStore.getAllProducts(products)
    }, []);

    return (
        <Box className={styles.container}>
            {/* <Login handleLogout={handleLogout} /> */}
            {/* <Link href={'/'} onClick={handleLogout}><Button sx={{ my: 2, color: 'white', display: 'block', background: "black" }} > Logout </Button></Link> */}
            {/* <Link href={'/products'}><Button sx={{ my: 2, color: 'white', display: 'block', background: "black" }} > Products </Button></Link> */}
            <BrandHeader data={brandData} loading={brandLoading} error={brandError} />
            <Slider />
            <SalesCard src={up} alt="up" />
            <SalesCard src={bs} alt="bs" />
            <SalesCard src={tr} alt="tr"/>
            <Discount />
        </Box>
    )
}

export async function getServerSideProps() {
    const res = await fetch("http://localhost:1337/api/brands?populate=*&pagination[start]=0&pagination[limit]=10")
    const res2 = await fetch("http://localhost:1337/api/products?populate=*&pagination[start]=0&pagination[limit]=100")
    const res3 = await fetch("http://localhost:1337/api/products?populate[storage][populate]=*&populate[performance][populate]=*&populate[product][populate]=*&populate[connectivity][populate]=*&populate[productImage][populate]=*&pagination[start]=0&pagination[limit]=100")

    const {data: brandsData} = await res.json();
    const brands = brandsData?.map((item) => {
        const {brandImage, name, products} = item?.attributes
        return {brandImage, name, products}
    })

    const {data: product1Data} = await res2.json();
    const products1 = product1Data?.map((item) => {
        const {id, attributes: {name, discount, upcoming, stock, price, launchDate, launchAnnouncement, colors, ratings,
            body: {data: {attributes: {dimensions, material, style, waterResistance, weight}}},
            display: {data: {attributes: {features: displayFeature, protection, resolution: displayResolution, size, technology}}},
            back_camera: {data: {attributes: {features: bCameraFeatures, resolution: bCameraResolution, videoRecording: bCameraVideoRecording}}},
            front_camera: {data: {attributes: {features: fCameraFeatures, resolution: fCameraResolution, videoRecording: fCameraVideoRecording}}},
            battery: {data: {attributes: {fastCharging, typeAndCapacity, wirelessCharging}}},
            sound: {data: {attributes: {earphoneJack, features: soundFeature}}},
            security: {data: {attributes: {faceLock, fingerPrint}}},
            other: {data: {attributes: {madeIn, manufacturedBy, sensors}}},
            brand: {data: {attributes: {name: brandName}}},
        }} = item

        return {id, name, discount, upcoming, stock, price, launchDate, launchAnnouncement, colors, ratings, dimensions, material, style, waterResistance, weight, displayFeature, protection, displayResolution, size, technology, bCameraFeatures, bCameraResolution, bCameraVideoRecording, fCameraFeatures, fCameraResolution, fCameraVideoRecording, fastCharging, typeAndCapacity, wirelessCharging, earphoneJack, soundFeature, faceLock, fingerPrint, madeIn, manufacturedBy, sensors, brandName}
    }) 
    const {data: product2Data} = await res3.json();
    const products2 = product2Data?.map((item) => {
        const {id, attributes: {
            connectivity: {data: {attributes: {bluetooth, gps, nfc, otg, radio, sim, typeC, usb, wlan, networks}}},
            performance: {data: {attributes: {OS, chipset, processor, gpu, rams}}},
            storage: {data: {attributes: {externalSlot, roms}}},
            productImage: {data: {attributes: {width, height, hash, url}}},
        }} = item

        return {id, bluetooth, gps, nfc, otg, radio, sim, typeC, usb, wlan, networks, OS, chipset, processor, gpu, rams, externalSlot, roms, width, height, hash, url}
    }) 
    const products = products1.reduce((acc, cur) => {
        products2.reduce((acc1, cur1) => {
            if (cur?.id === cur1?.id) {
                cur.OS = cur1.OS
                cur.bluetooth = cur1.bluetooth
                cur.chipset = cur1.chipset
                cur.bluetooth = cur1.bluetooth
                cur.externalSlot = cur1.externalSlot
                cur.gps = cur1.gps
                cur.gpu = cur1.gpu
                cur.networks = cur1.networks
                cur.nfc = cur1.nfc
                cur.otg = cur1.otg
                cur.radio = cur1.radio 
                cur.rams = cur1.rams
                cur.roms = cur1.roms
                cur.sim = cur1.sim
                cur.typeC = cur1.typeC
                cur.usb = cur1.usb
                cur.wlan = cur1.wlan
                cur.imageWidth = cur1.width
                cur.imageHeight = cur1.height
                cur.imagehash = cur1.hash
                cur.imageurl = cur1.url
                cur.processor = cur1.processor
            }

        }, [])

        acc.push(cur)

        return acc
    }, [])
  
    return {
      props: {
        brands, products
      },
    };
}
