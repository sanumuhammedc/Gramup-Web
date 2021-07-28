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

import Telegram from "../utils/telegram";
import { Errors, Status } from "../utils/constants";
import { showError } from "../utils/functions";

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

/**
 * Creates a component used to display copyright string.
 * 
 * @author Rohit T P
 * @returns { JSX.Element } CopyRight Component
 */
function CopyRight(): JSX.Element 
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

/**
 * Creates a component that dynamically displays inputs based on current 
 * stage of signing-in.
 * 
 * @author Rohit T P
 * 
 * @param {{[prop: string]: unknown}} props
 * @returns { JSX.Element | null } CopyRight Component
 */
function StageViceInput({...props}: { [prop: string]: unknown; }): JSX.Element | null
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

/**
 * Component that displays a sign-in form.
 * 
 * @author Rohit T P
 * @returns { JSX.Element } SignIn Component
 */
function SignIn(): JSX.Element
{
    const client = new Telegram(process.env.TELEGRAM_API_ID, process.env.TELEGRAM_API_HASH);
  
    const [stage, setStage] = useState(Stages.PHNO);
    const [value, setValue] = useState("");
    const classes = useStyles();

    async function handleSubmit(event: FormEvent)
    {
        event.preventDefault();
        if(stage === Stages.PHNO)
        {
            await client.sendCode(value.replace(/\s|-/g, ""));
            setStage(Stages.OTP);
        }
        else if(stage === Stages.OTP)
        {
            const result = await client.signIn(Number(value));

            if(result === Status.SIGN_IN_SUCCESS)
                setStage(Stages.DONE);
            else if(result === Errors.PASSWORD_REQUIRED)
                setStage(Stages.PWD);
            else 
                showError(result), setStage(Stages.PHNO);                
        }
        else if(stage === Stages.PWD)
        {
            const result = await client.checkPassword(value).catch((er) => showError(er));

            if(!result)
                setStage(Stages.PHNO);
            else 
                setStage(Stages.DONE);    
        }


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
                <CopyRight />
            </Box>
        </Container>
    );
}

export default SignIn;
