import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MuiPhoneNumber from "material-ui-phone-number";
import TextField from "@material-ui/core/TextField";

import { FormEvent, useState } from "react";

const Stages = { DONE: "done", PHNO: "phNo", OTP: "otp", PWD: "pwd" };

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function Copyright() 
{
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://github.com/rohittp0/Gramup-Web">
        GramUp
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function StageViceInput({...props})
{

    if(props.id === Stages.PHNO)
        return (
            <MuiPhoneNumber 
                defaultCountry="in"
                label="Phone Number"
                autoComplete="tel-national"
                {...props}
            />
        );  
    
    if(props.id === Stages.PWD)
        return (
            <TextField
                label="Password"
                type="password"
                autoComplete="current-password"
                {...props}
            />
        );
    
    if(props.id === Stages.OTP)
        return (
            <TextField
                label="OTP"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                inputProps={{pattern: "[0-9]{5}"}}
                {...props}
            />
        );   


    return null;    
}

export const SignIn = () => 
{
    const [stage, setStage] = useState(Stages.PHNO);
    const [value, setValue] = useState("");
    const classes = useStyles();

    function handleSubmit(event: FormEvent)
    {
        event.preventDefault();
        setStage((cur) => cur === Stages.OTP ? Stages.PWD : Stages.OTP);
        console.log(value);
        setValue("");
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
          Sign in With Telegram
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <StageViceInput 
                        onChange={(e: { target: { value: string; }; }) => setValue(e.target?.value ?? e)} 
                        margin="normal"
                        required={true}
                        fullWidth={true}
                        id={stage}
                        value={value}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
            Sign In
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
};
