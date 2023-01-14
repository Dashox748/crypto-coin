import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
        color: 'green',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        background:"#1B2028",
        borderRadius:"12px",
        padding:"5px 20px",

        '& fieldset': {
            border:"0px",
            color:"white"
        },
        'input': {
            '&::placeholder': {
               fontWeight:"200",
                color:"lightgray"
            }
        },
        '&:hover fieldset': {
            borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
            borderColor: 'green',
            },
    },
});
