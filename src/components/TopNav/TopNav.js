import React from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import PortfolioIcon from '@material-ui/icons/ImportantDevices';
import ContactIcon from '@material-ui/icons/Forum';
import ResumeIcon from '@material-ui/icons/Assignment';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 15,
        width: '100%',
        maxWidth: '165px',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
            maxWidth: 'none',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class PrimarySearchAppBar extends React.Component {
    state = {
        mobileMoreAnchorEl: null,
    };

    handleResize = () => {
        if (this.state.mobileMoreAnchorEl) {
            this.handleMenuClose();
        }
    };

    componentDidMount = () => {
        // resize handler
        this.myListenerWithContext = this.handleResize.bind(this);

        // close menus after window resize to avoid misplacement of dropdowns
        window.addEventListener('resize', this.myListenerWithContext);
    };

    componentWillUnmount = () => {
        // stop listening to resize after component unmounts
        window.removeEventListener('resize', this.myListenerWithContext);
    };

    handleMenuClose = () => {
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { mobileMoreAnchorEl } = this.state;
        const { classes } = this.props;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMobileMenu = (
            <Menu anchorEl={ mobileMoreAnchorEl }
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={ isMobileMenuOpen }
                  onClose={ this.handleMenuClose }>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <PortfolioIcon />
                    </IconButton>
                    <p>Portfolio</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.props.history.push('/contact');
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <ContactIcon />
                    </IconButton>
                    <p>Contact</p>
                </MenuItem>
                <MenuItem classes={{ root: 'grey-icon white-text' }}
                          onClick={ () => {
                            this.handleMobileMenuClose();
                          }}>
                    <IconButton color='inherit'>
                        <ResumeIcon />
                    </IconButton>
                    <p>Resumé</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div>
                <AppBar position='fixed' classes={{ root: this.props.customClass}}>
                    <Toolbar>
                        <Typography className={ classes.title } variant='h6' color='inherit' noWrap>
                            Akyuna Akish
                        </Typography>
                        <div className={ classes.grow } />
                        <div>
                            <IconButton aria-haspopup='true' onClick={ this.handleMobileMenuOpen } color='inherit'>
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                { renderMobileMenu }
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(PrimarySearchAppBar));