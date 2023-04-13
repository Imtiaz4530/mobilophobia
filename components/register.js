import { AppBar, Button, Dialog, IconButton, Slide, TextField, Toolbar, Typography } from "@mui/material"
import { forwardRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import styles from "../styles/profile.module.css"
import { publicRoute } from "@/utils/axios";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const INIT = {
    name: '',
    email: '',
    password: '',
    username: '',
    phone: '',
    role: '2'
}

const Register = ({open, handleClose}) => {
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
            const res = await publicRoute.post("/users" , {
                username : formValues.username, 
                password : formValues.password,
                email : formValues.email,
                phone : formValues.phone,
                name: formValues.name,
                role : formValues.role
            })
            console.log(res.data);
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
                    <Typography sx={{ margin: "auto", letterSpacing: 4 }} variant="P" component="div"> CREATE YOUR PROFILE </Typography>
                </Toolbar>
            </AppBar>
            <form className={styles.form} onSubmit={handleSubmit}>
                <TextField label="Name" name="name" type="text" variant="outlined" value={formValues.name} onChange={handleChange} sx={{ width: "100%" }} required />
                <TextField label="Username" name="username" type="text" variant="outlined" value={formValues.username} onChange={handleChange} sx={{ width: "100%" }} required />
                <TextField label="Email" name="email" type="email" variant="outlined" value={formValues.email} onChange={handleChange} sx={{ width: "100%" }} required />
                <TextField label="Number" name="phone" type="number" variant="outlined" value={formValues.phone} onChange={handleChange} sx={{ width: "100%" }} required />
                <TextField label="Password" name="password" type="password" variant="outlined" value={formValues.password} onChange={handleChange} sx={{ width: "100%" }} required />
                
                <Button type="submit" variant="contained" className={styles.resiterBTN}> Register </Button>
            </form>
        </Dialog>
    )
}

export default Register