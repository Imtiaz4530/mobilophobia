import { Alert, AppBar, Button, Dialog, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material"
import { forwardRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

import { publicRoute } from "@/utils/axios";
import styles from "../styles/profile.module.css"

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const INIT = {
    identifier: '',
    password: ''
}

const Login1 = ({open, handleClose}) => {
    const [formValues, setFormValues] = useState({...INIT});
    const [error, setError] = useState("");

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
            const res = await publicRoute.post("/auth/local" , {
                identifier : formValues.identifier, 
                password : formValues.password
            })
            const token = res.data.jwt
            localStorage.setItem("token", token);
            window.location.reload();
            handleClose()
            setFormValues({...INIT})

        } catch (e) {
            console.log(e?.response?.data?.error?.message);
            setError(e?.response?.data?.error?.message)
        }
    };

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar sx={{ position: 'relative', background: "black" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close"> <CloseIcon /> </IconButton>
                    <Typography sx={{ margin: "auto", letterSpacing: 4 }} variant="P" component="div"> Login </Typography>
                </Toolbar>
            </AppBar>
            <form className={styles.form} onSubmit={handleSubmit}>
                {error && <Alert severity="error">Invalid identifier or password — check it out!</Alert>}
                <TextField label="Username/Email" name="identifier" type="text" variant="outlined" value={formValues.identifier} onChange={handleChange} sx={{ width: "100%" }} required />
                <TextField label="Password" name="password" type="password" variant="outlined" value={formValues.password} onChange={handleChange} sx={{ width: "100%" }} required />
                
                <Button type="submit" variant="contained" className={styles.resiterBTN}> Login </Button>
            </form>
        </Dialog>
    )
}

export default Login1