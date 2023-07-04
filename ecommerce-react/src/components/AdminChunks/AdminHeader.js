import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import { authActions } from '../Store/store';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height : "8%",
        backgroundColor : "rgba(40, 30, 94, 0.932)",
    },
    text : {
        fontSize:"18px",
        flexGrow : 1,
        textAlign : "center"
    },
    buttonText : {
        fontSize:"15px",
        fontamily : ['Noto Sans JP','sans-serif'],
    },
}));

function AdminHeader(props) {

    const classes = useStyles();
    const clientId = "1071156735723-ng1sp6e5jaimpmoeikbmivee820bi399.apps.googleusercontent.com";

    const username = useSelector( state => state.user.username ) ;
    const isGoogleLogin = useSelector((state) => state.auth.isGoogleLogin);

    let dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    const onSignoutSuccess = () => {
        console.clear();
        dispatch(authActions.logout());
    };

    return (
        <Fragment>
            <AppBar position="fixed" elevation={0} className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" edge="start" noWrap>
                        <i>YourMart</i>
                    </Typography>
                    <Typography variant="h6" className={classes.text} noWrap>
                        {props.headName}
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.showProfileHandler}
                        edge="end"
                    >
                        <AccountCircleOutlinedIcon />
                        <span className={classes.buttonText}>{username}</span>
                        <span style={{paddingLeft:"15px"}}></span>
                    </IconButton>
                    { !(isGoogleLogin) ? 
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={logoutHandler}
                                            edge="end"
                                        >
                                            <ExitToAppIcon />
                                            <span className={classes.buttonText}>Logout</span>
                                        </IconButton>
                                        :
                                        <GoogleLogout
                                        className={classes.profile}
                                        clientId={clientId}
                                        buttonText="Sign Out"
                                        onLogoutSuccess={onSignoutSuccess}
                                        icon="false"
                                        />
                        }  
                </Toolbar>
            </AppBar>
        </Fragment>
    );

}

export default AdminHeader;