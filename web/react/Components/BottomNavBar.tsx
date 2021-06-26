import {  BottomNavigation, BottomNavigationAction, Box, Hidden, makeStyles } from "@material-ui/core";
import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import StarIcon from "@material-ui/icons/Star";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

const useStyles = makeStyles({
    root: {
        width:"100%",
        position:"fixed",
        bottom:0,
        display:"flex",
        justifyContent:"space-between",

    },
});
  

function BottomNavBar() 
{
    const classes = useStyles();
    const [value, setValue] = React.useState("home");

    function handleChange(event: React.ChangeEvent<{[key:string]: unknown}>, newValue: string)
    {
        setValue(newValue);
    }
    
    return (

    // Bottom navigation bar will hide for the screen size more than sm

        <Hidden smUp>
            <Box>
                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                    <BottomNavigationAction  label="Home" value="home" icon={<HomeIcon />} />
                    <BottomNavigationAction label="Upload" value="upload" icon={<TrendingUpIcon />} />
                    <BottomNavigationAction label="Stared" value="stared" icon={<StarIcon />} />
                    <BottomNavigationAction label="Groups" value="groups" icon={<PeopleAltIcon/>} />
                </BottomNavigation>
            </Box>
        </Hidden>

    );
}

export default BottomNavBar;
