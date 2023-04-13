import { Typography } from "@mui/material"

const Typographi = ({sx, align, variant, value}) => {
    return (
        <>
            <Typography sx={{...sx}} align={align} variant={variant}> {value} </Typography>
        </>
    )
}

export default Typographi

{/* <Typography gutterBottom sx={{marginBottom: 5}} align='center' variant='h3'> {pages} </Typography> */}