import {TextField} from '@mui/material';

const InputField = ({name, type, label, value, onChange }) => {
    return (
        <>
            <TextField id="outlined-basic" type={type} name={name} label={label} variant="outlined" value={value} onChange={onChange} fullWidth required />
        </>
    )
}

export default InputField