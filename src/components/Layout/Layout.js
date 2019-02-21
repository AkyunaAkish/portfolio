import React from 'react';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PortfolioIcon from '@material-ui/icons/ImportantDevices';
import ContactIcon from '@material-ui/icons/Forum';
import ResumeIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import TopNav from '../TopNav/TopNav';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        maxWidth: '100%',
        wordBreak: 'break-all',
        padding: theme.spacing.unit * 3,
    },
});

class ResponsiveDrawer extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    getIcon = (name) => {
        switch (name.toLowerCase()) {
            case 'portfolio':
                return <PortfolioIcon />;
                
            case 'contact':
                return <ContactIcon />;
        
            case 'resumé':
                return <ResumeIcon />;
        
            default:
                return <ContactIcon />;
        }
    };

    navigate = (text) => {
        switch (text.toLowerCase()) {
            case 'portfolio':
                this.props.history.push('/');
            break;

            case 'contact':
                this.props.history.push('/contact');
            break;

            case 'resumé':
                //
            break;
        
            default:
                this.props.history.push('/');
            break;
        }
    };

    render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div className='layout'>
                <div className={ `${classes.toolbar} toolbar` }>
                    <Typography variant='h6' color='inherit' noWrap>
                        Akyuna Akish
                    </Typography>
                </div>

                <Divider />
                <List>
                    { [ 'Portfolio', 'Contact', 'Resumé' ].map((text, index) => (
                        <ListItem button key={ text } onClick={ () => this.navigate(text) }>
                            <ListItemIcon classes={{ root: 'grey-icon' }}>{ this.getIcon(text) }</ListItemIcon>
                            <ListItemText primary={ text } classes={{ root: 'white-text' }}/>
                        </ListItem>
                    )) }
                </List>
            </div>
        );

        return (
            <div className={ classes.root }>
                <CssBaseline />

                <TopNav customClass={ classes.appBar } />

                <nav className={ classes.drawer }>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation='css'>
                        <Drawer container={ this.props.container }
                                variant='temporary'
                                anchor={ theme.direction === 'rtl' ? 'right' : 'left' }
                                open={ this.state.mobileOpen }
                                onClose={ this.handleDrawerToggle }
                                classes={{
                                    paper: classes.drawerPaper,
                                }}>
                            { drawer }
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation='css'>
                        <Drawer classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant='permanent'
                                open>
                            { drawer }
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={ classes.content }>
                    { this.props.routes }
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(ResponsiveDrawer));