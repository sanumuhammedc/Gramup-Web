import { AppBar, Avatar, Box, fade, Hidden, IconButton, InputBase, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

/**
 * Styles for HomePage page components goes here  
 *  
 * @author Sunith vs
 * 
 * @param {{[prop: string]: unknown}} props
 * @returns { JSX.Element | null } HomePage page
 */


const useStyles = makeStyles((theme) => 
    (
        {   
            root: {
                display:"flex",
                margin:0,
                color:"black",
                justifyContent:"center",
                height:theme.spacing(10),
                backgroundColor:"inherit",
                
                
                
            },
            menuButton: {
                marginRight: theme.spacing(1),
                color:"inherit",

            },
            
            menuBar:{
                display:"flex",
                width:"100%",
                paddingLeft:10,
                
                
               
            },
            search:{
                display:"flex",
                width:"100",
                height:theme.spacing(5),
                marginLeft:"auto",
                backgroundColor: fade(theme.palette.common.black, 0.15),
                paddingLeft:10,
                borderRadius: theme.shape.borderRadius,                
                "&:hover": {
                    backgroundColor: fade(theme.palette.common.black, 0.20),
                },
           
                

            },
          
            inputLabel: {
                
               
                
                
            },
            avatar:{
                marginLeft:3,
                marginTop:"auto",
                marginBottom:"auto",
                
            }
           
        }
    )
);
    

 



/**
 * HomePage page component including the hamburger menu  
 *  
 * @author Sunith vs
 * 
 * @param {{[prop: string]: unknown}} props
 * @returns { JSX.Element | null } HomePage page
 */

export const HomePage = (): JSX.Element => 
{   
    const classes = useStyles();


    return (
        <div>
            <AppBar position ="static" className={classes.root} >
                <Toolbar>
                    <Box  className={classes.menuBar}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Hidden xsDown >
                            <Typography variant="h4">
                                Gram-up
                            </Typography>
                        </Hidden>
                        <Box className={classes.search}>
                           
                            <InputBase
                                classes={
                                    {
                                        root:"classes.inputRoot",
                                        input:"classes.inputLabel",
                                    }

                                }
                                placeholder="Search in Gramup"
                            />
                            
                            <IconButton >
                                <SearchIcon/>
                            </IconButton>
                        </Box>
                        <Avatar
                            alt='name'
                            className={classes.avatar}
                        
                        />

                        
                    </Box>


                </Toolbar>
            </AppBar>
            
        </div>
    );
};

export default HomePage;
