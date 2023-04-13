import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { useState } from "react";

import styles from "../../styles/filter.module.css"

const INIT = ["200-300", "301-400", "401-500", "501-600", "601-700", "701-800", "801-900", "901-1000", "1001-99999999"]

const PriceFilter = ({products, setFilter, filter, setChecked, checked}) => {
    const [price, setPrice] = useState([...INIT])

    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]: event.target.checked})
        const [min, max] = event.target.value.split('-');

        if (event.target.checked) {
            const add = products.filter((item) => item.price >= Number(min) && item.price <= Number(max))
            
            setFilter(p =>{
                if (JSON.stringify(p.map(item => item.id)) === JSON.stringify(add.map(item => item.id))) {
                    return [...p]
                } else {
                    return [...p, ...add]
                }})
        } else {
            const remove = filter.filter((item) => !(item.price >= Number(min) && item.price <= Number(max)))
            setFilter([...remove])
        }
    }; 
  
    return (
            <Box className={styles.priceContainer}>
                <Typography className={styles.name1} variant="h6">Price</Typography>
                <FormControlLabel
                    sx={{mt: 1}}
                    label="$200 - $300"
                    control={<Checkbox value={price[0]} size="small" name="one" checked={checked[0]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="$301 - $400"
                    control={<Checkbox value={price[1]} size="small" name="two" checked={checked[1]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="$401 - $500"
                    control={<Checkbox value={price[2]} size="small" name="three" checked={checked[2]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="$501 - $600"
                    control={<Checkbox value={price[3]} size="small" name="four" checked={checked[3]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="$601 - $700"
                    control={<Checkbox value={price[4]} size="small" name="five" checked={checked[4]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="$701 - $800"
                    control={<Checkbox value={price[5]} size="small" name="six" checked={checked[5]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="$801 - $900"
                    control={<Checkbox value={price[6]} size="small" name="seven" checked={checked[6]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="$901 - $1000"
                    control={<Checkbox value={price[7]} size="small" name="eight" checked={checked[7]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="Above $1000"
                    control={<Checkbox value={price[8]} size="small" name="nine" checked={checked[8]} onChange={handleChange} />}
                />
            </Box>
    )
}

export default PriceFilter