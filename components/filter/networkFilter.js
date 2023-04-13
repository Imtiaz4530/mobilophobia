import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { useState } from "react";

import styles from "../../styles/filter.module.css"

const INIT = ["N-2G", "N-3G", "N-4G", "N-5G"]
const product = [
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        ram: '6GB'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200,
        ram: '8GB'
    },
    {
        id: 3,
        name: 'Product 3',
        price: 300,
        ram: '12GB'
    },
    {
        id: 4,
        name: 'Product 4',
        price: 100,
        ram: '16GB'
    },
    {
        id: 5,
        name: 'Product 5',
        price: 200,
        ram: '1GB'
    },
    {
        id: 6,
        name: 'Product 6',
        price: 300,
        ram: '2GB'
    },
    {
        id: 7,
        name: 'Product 7',
        price: 300,
        ram: '3GB'
    },
    {
        id: 8,
        name: 'Product 8',
        price: 300,
        ram: '4GB'
    },
    {
        id: 9,
        name: 'Product 9',
        price: 300,
        ram: '6GB'
    },
    {
        id: 10,
        name: 'Product 10',
        price: 300,
        ram: '8GB'
    },
    {
        id: 11,
        name: 'Product 11',
        price: 300,
        ram: '12GB'
    },
        {
        id: 12,
        name: 'Product 12',
        price: 300,
        ram: '16GB'
    },    {
        id: 13,
        name: 'Product 13',
        price: 300,
        ram: '1GB'
    },
    {
        id: 14,
        name: 'Product 14',
        price: 300,
        ram: '2GB'
    },
        {
        id: 15,
        name: 'Product 15',
        price: 300,
        ram: '3GB'
    },    {
        id: 16,
        name: 'Product 16',
        price: 300,
        ram: '4GB'
    },
    {
        id: 17,
        name: 'Product 17',
        price: 300,
        ram: '6GB'
    },
    {
        id: 18,
        name: 'Product 18',
        price: 300,
        ram: '8GB'
    },
    {
        id: 19,
        name: 'Product 19',
        price: 300,
        ram: '12GB'
    },
    {
        id: 20,
        name: 'Product 20',
        price: 300,
        ram: '16GB'
    },
]

const NetworkFilter = ({products, filter, setFilter, checked, setChecked}) => {
    const [network, setNetwork] = useState([...INIT])

    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]: event.target.checked})
        const value = event.target.value

        if (event.target.checked) {
            const add = products.filter((item) => {
                const network = item.networks.data.map(network => network.attributes.network)
                return network.includes(value)
            })

            setFilter(p =>{
                if (JSON.stringify(p.map(item => item.id)) === JSON.stringify(add.map(item => item.id))) {
                    return [...p]
                } else {
                    return [...p, ...add]
                }
            })
        } else {
            const remove = filter.filter((item) => {
                const network = item.networks.data.map(network => network.attributes.network)
                return !network.includes(value)
            })
            setFilter([...remove])
        }
    }; 
  
    return (
            <Box className={styles.ramContainer}>
                <Typography className={styles.name1} variant="h6">Network</Typography>
                <FormControlLabel
                    sx={{mt: 1}}
                    label="2G"
                    control={<Checkbox value={network[0]} size="small" name="one" checked={checked[0]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="3G"
                    control={<Checkbox value={network[1]} size="small" name="two" checked={checked[1]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="4G"
                    control={<Checkbox value={network[2]} size="small" name="three" checked={checked[2]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="5G"
                    control={<Checkbox value={network[3]} size="small" name="four" checked={checked[3]} onChange={handleChange} />}
                />

            </Box>
    )
}

export default NetworkFilter