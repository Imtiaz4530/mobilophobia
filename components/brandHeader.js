const { Button, Box, Typography } = require("@mui/material")

import Link from 'next/link'
import { useState, useEffect} from 'react'
import styles from '../styles/navbar.module.css'

const BrandHeader = ({data, loading, error}) => {
    const [brands, setBrands] = useState([])

    useEffect(() => {
        setBrands(data)
    }, [data]);

    if (error) {
        alert("Some error occurd in brandHeader page")
    }

    return (
        <Box className={styles.main} sx={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: "86px", height: "45px", alignItems: "center"}}>
            {loading && <p>Loading...</p>}
            {
                !loading && brands.map((item) => (
                    <Link className='global-link' key={item.name} href={`/brand/${item.name}`}><Button sx={{ color: '#4b7fcb' }}> {item.name} </Button></Link>
                ))
            }
        </Box>
    )
}

export default BrandHeader