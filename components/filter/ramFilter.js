import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material"
import { useState } from "react";

import styles from "../../styles/filter.module.css"

const INIT = ["r-1GB", "r-2GB", "r-3GB", "r-4GB", "r-6GB", "r-8GB", "r-12GB", "r-16GB"]

const RamFilter = ({products, filter, setFilter, checked, setChecked}) => {
    const [ram, setRam] = useState([...INIT])

    const handleChange = (event) => {
        setChecked({...checked, [event.target.name]: event.target.checked})
        const value = event.target.value

        if (event.target.checked) {
            const add = products.filter((item) => {
                const rams = item.rams.data.map(ram => ram.attributes.ram)
                return rams.includes(value)
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
                const rams = item.rams.data.map(ram => ram.attributes.ram)
                return !rams.includes(value)
            })
            setFilter([...remove])
        }
    }; 
  
    return (
            <Box className={styles.ramContainer}>
                <Typography className={styles.name1} variant="h6">RAM</Typography>
                <FormControlLabel
                    sx={{mt: 1}}
                    label="1GB"
                    control={<Checkbox value={ram[0]} size="small" name="one" checked={checked[0]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="2GB"
                    control={<Checkbox value={ram[1]} size="small" name="two" checked={checked[1]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="3GB"
                    control={<Checkbox value={ram[2]} size="small" name="three" checked={checked[2]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="4GB"
                    control={<Checkbox value={ram[3]} size="small" name="four" checked={checked[3]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="6GB"
                    control={<Checkbox value={ram[4]} size="small" name="five" checked={checked[4]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="8GB"
                    control={<Checkbox value={ram[5]} size="small" name="six" checked={checked[5]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="12GB"
                    control={<Checkbox value={ram[6]} size="small" name="seven" checked={checked[6]} onChange={handleChange} />}
                />

                <FormControlLabel
                    label="16GB"
                    control={<Checkbox value={ram[7]} size="small" name="eight" checked={checked[7]} onChange={handleChange} />}
                />

            </Box>
    )
}

export default RamFilter