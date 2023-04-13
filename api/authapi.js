import axios from "axios"
import { useEffect, useState } from "react"
import {privateRoute, publicRoute} from "../utils/axios"

const URL = `http://localhost:1337/api/products?populate[storage][populate]=*&populate[performance][populate]=*&populate[product][populate]=*&populate[connectivity][populate]=*`
const URL2 = `http://localhost:1337/api/products?populate=*`

export const productsAccessories = () => {
    const [accessories, setAccessories] = useState([])

    useEffect(() => {
        publicRoute.get(URL).then(res =>{ 
            const {data} = res.data 
            const impData = data?.map((item) => {
                const {id, attributes: {
                    connectivity: {data: {attributes: {bluetooth, gps, nfc, otg, radio, sim, typeC, usb, wlan, networks}}},
                    performance: {data: {attributes: {OS, chipset, processor, gpu, rams}}},
                    storage: {data: {attributes: {externalSlot, roms}}},
                }} = item

                return {id, bluetooth, gps, nfc, otg, radio, sim, typeC, usb, wlan, networks, OS, chipset, processor, gpu, rams, externalSlot, roms}
            }) 

            setAccessories(impData)
        }).catch(e => console.log(e))
    }, [])

    return accessories
}

export const products = () => {
    const [data, setData] = useState([])
    const accessories = productsAccessories()

    useEffect(() => {
        publicRoute.get(URL2).then(res =>{ 
            const {data} = res.data 

            const impData = data?.map((item) => {
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
            setData(impData)
        }).catch(e => console.log(e))
    }, [])

    const combineProduct = data.reduce((acc, cur) => {

        accessories.reduce((acc1, cur1) => {
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
            }

        }, [])

        acc.push(cur)

        return acc
    }, [])

    return combineProduct
}

export const getAllBrands = () => {
    const [brands, setBrands] = useState([])

    useEffect(() => {
        publicRoute.get("http://localhost:1337/api/brands?populate=*").then(res =>{ 
            const {data} = res.data 
            
            const brandData = data?.map((item) => {
                const {attributes: {name, products,
                    brandImage: {data: {attributes: {url}}}
                }} = item

                return {name, products, url}
            }) 

            setBrands(brandData)
        }).catch(e => console.log(e))
    }, [])

    return brands
}

// http://localhost:1337/api/products?populate[storage][populate]=*&populate[performance][populate]=*&populate[product][populate]=*&populate[connectivity][populate]=*