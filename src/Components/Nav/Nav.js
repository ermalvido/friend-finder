import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../ducks/reducer';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      [theme.breakpoints.down("xs")]: {
        flexGrow: 1
      }
    },
    headerOptions: {
      display: "flex",
      flex: 1,
      justifyContent: "space-evenly"
    }
  }));

function Nav(props) {
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null);
    };

    const handleButtonClick = pageURL => {
        history.push(pageURL);
    };

    const menuItems = [
        {
            menuTitle: "Profile",
            pageURL: "/about"
        },
        {
            menuTitle: "Home",
            pageURL: "/dashboard"
        },
        {
            menuTitle: "New Post",
            pageURL: "/new"
        },
        {
            menuTitle: "Logout",
            pageURL: "/"
        }
    ];
    if(props.location.pathname !== '/') {
        console.log('nav', props)
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Friend Finder
                        </Typography>
                        {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="secondary"
                                aria-label="menu"
                                onClick={handleMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuItems.map(menuItem => {
                                    const { menuTitle, pageURL } = menuItem;
                                    return (
                                        <MenuItem onClick={() => handleMenuClick(pageURL)}>
                                            {menuTitle}
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </>
                        ) : (
                        <div className={classes.headerOptions}>
                            <Button
                                variant='text'
                                color='secondary'
                                onClick={() => handleButtonClick("/dashboard")}

                            >
                                HOME
                            </Button>
                            <Button
                                variant='text'
                                color='secondary'
                                onClick={() => handleButtonClick("/new")}
                            >
                                NEW POST
                            </Button>
                            <Button
                                variant='text'
                                color='secondary'
                                onClick={() => handleButtonClick("/about")}
                            >
                                PROFILE
                            </Button>
                            <Button
                                variant='text'
                                color='inherit'
                                onClick={() => handleButtonClick("/")}
                            >
                                LOGOUT
                            </Button>
                        </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        )
    } else {
        return null;
    }
}

function mapStateToProps(state) {
    return state;
}

export default withRouter(connect(mapStateToProps, { logoutUser })(Nav));