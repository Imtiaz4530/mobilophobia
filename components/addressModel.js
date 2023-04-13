import { AppBar, Button, Dialog, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material"
import { forwardRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styles from "../styles/profile.module.css"
import { publicRoute } from "@/utils/axios";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const INIT = {
    division: '',
    district: '',
    subDistrict: '',
    house: '',
    streetNO: '',
    area: '',
}

const Address = ({open, handleClose, userId}) => {
    const [formValues, setFormValues] = useState({...INIT});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            const res = await publicRoute.post("/addresses" , {
                data : {
                    userId: userId,
                    division : formValues.division, 
                    district : formValues.district,
                    subDistrict : formValues.subDistrict,
                    house : formValues.house,
                    streetNO: formValues.streetNO,
                    area : formValues.area
                }
            })
            console.log(res.data);
            window.location.reload();
        } catch (e) {
            console.log(e);
        }
        handleClose()
        setFormValues({...INIT})
    };
    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative', background: "black" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close"> <CloseIcon /> </IconButton>
                    <Typography sx={{ margin: "auto", letterSpacing: 4 }} variant="P" component="div"> LOCATE YOURSELF </Typography>
                </Toolbar>
            </AppBar>
            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField label="Division" name="division" type="text" variant="outlined" value={formValues.division} onChange={handleChange} sx={{ width: "100%" }} required />
                <TextField label="District" name="district" type="text" variant="outlined" value={formValues.district} onChange={handleChange} sx={{ width: "100%" }} required />
                <TextField label="Sub-district" name="subDistrict" type="text" variant="outlined" value={formValues.subDistrict} onChange={handleChange} sx={{ width: "100%" }} />
                <TextField label="street-no" name="streetNO" type="text" variant="outlined" value={formValues.streetNO} onChange={handleChange} sx={{ width: "100%" }} />
                <TextField label="House/Holding" name="house" type="text" variant="outlined" value={formValues.house} onChange={handleChange} sx={{ width: "100%" }}  />
                <TextField label="Area" name="area" type="text" variant="outlined" value={formValues.area} onChange={handleChange} sx={{ width: "100%" }} required/>
                
                <Button type="submit" variant="contained" className={styles.resiterBTN}> Save </Button>
            </form>
        </Dialog>
    )
}

export default Address