import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { useState } from "react";

import styles from "../../styles/filter.module.css"

const INIT = ["r-32GB", "r-64GB", "r-128GB", "r-256GB", "r-512GB", "r-1TB"]
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

const RomFilter = ({products, filter, setFilter, checked, setChecked}) => {
    // const [checked, setChecked] = useState({one: false, two: false, three: false, four: false, five: false, six: false, seven: false, eight: false});
    const [rom, setRom] = useState([...INIT])
    // const [products, setProducts] = useState([...product])
    // const [filter, setFilter] = useState([])

    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]: event.target.checked})
        const value = event.target.value

        if (event.target.checked) {
            const add = products.filter((item) => {
                const roms = item.roms.data.map(rom => rom.attributes.rom)
                return roms.includes(value)
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
                const roms = item.roms.data.map(rom => rom.attributes.rom)
                return !roms.includes(value)
            })
            setFilter([...remove])
        }
    }; 
  
    return (
            <Box className={styles.ramContainer}>
                <Typography className={styles.name1} variant="h6">ROM</Typography>
                <FormControlLabel
                    sx={{mt: 1}}
                    label="32GB"
                    control={<Checkbox value={rom[0]} size="small" name="one" checked={checked[0]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="64GB"
                    control={<Checkbox value={rom[1]} size="small" name="two" checked={checked[1]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="128GB"
                    control={<Checkbox value={rom[2]} size="small" name="three" checked={checked[2]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="256GB"
                    control={<Checkbox value={rom[3]} size="small" name="four" checked={checked[3]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="512GB"
                    control={<Checkbox value={rom[4]} size="small" name="five" checked={checked[4]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="1TB"
                    control={<Checkbox value={rom[5]} size="small" name="six" checked={checked[5]} onChange={handleChange} />}
                />

            </Box>
    )
}

export default RomFilter