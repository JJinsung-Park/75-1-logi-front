import React, { useState } from 'react';
import clsx from 'clsx';
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Fab
    //Tabs,
    //Tab
} from '@material-ui/core';
import {
    Menu as MenuIcon,
    MailOutline as MailIcon,
    NotificationsNone as NotificationsIcon,
    Person as AccountIcon,
    Search as SearchIcon,
    Send as SendIcon,
    ArrowBack as ArrowBackIcon
} from '@material-ui/icons';
import classNames from 'classnames';
import ExploreIcon from '@material-ui/icons/Explore';
import Mapping from './Map/Mapping';

// styles
import useStyles from './styles';

// components
import { Badge, Typography } from 'util/StyleComponents/Wrappers/Wrappers';
import Notification from 'util/StyleComponents/Notification/Notification';
import UserAvatar from 'util/StyleComponents/UserAvatar/UserAvatar';

import * as types from 'common/reducer/commonReducer';

// darkMode
import { useThemeSwitcher } from 'mui-theme-switcher';
import Brightness3OutlinedIcon from '@material-ui/icons/Brightness3Outlined';
import Brightness7OutlinedIcon from '@material-ui/icons/Brightness7Outlined';
import { useDispatch, useSelector } from 'react-redux';

export default function Header(props) {
    var classes = useStyles();
    const { handleLogOut, empInfo } = props;

    const dispatch = useDispatch();
    const isSidebarOpened = useSelector(({ sideBarReducer }) => sideBarReducer.isSidebarOpened, []);

    // local
    var [mailMenu, setMailMenu] = useState(null);
    var [isMailsUnread, setIsMailsUnread] = useState(true);
    var [notificationsMenu, setNotificationsMenu] = useState(null);
    var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
    var [profileMenu, setProfileMenu] = useState(null);
    var [isSearchOpen, setSearchOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openMapping = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { dark, toggleDark } = useThemeSwitcher();
    const icon = !dark ? (
        <Brightness3OutlinedIcon classes={{ root: classes.headerIcon }} />
    ) : (
        <Brightness7OutlinedIcon classes={{ root: classes.headerIcon }} />
    );

    return (
        <div className={classes.root}>
            <AppBar
                style={{ backgroundColor: 'gray' }}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: isSidebarOpened
                })}
            >
                <Toolbar style={{ backgroundColor: 'steelblue' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() =>
                            dispatch({
                                type: types.TOGGLE_SIDEBAR
                            })
                        }
                        edge="start"
                        className={clsx(classes.menuButton, isSidebarOpened && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        weight="medium"
                        //className={classes.logotype}
                    >
                        Seoul It ERP
                    </Typography>
                    {/* <Typography className={classes.logotype} variant="h6" noWrap>
            Seoul It ERP
          </Typography> */}
                    <div className={classes.grow} />
                    {/* <div //  돋보기 ( 검색 ) 아이콘
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div> */}
                    {/* <IconButton //  종모양 아이콘
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton> */}
                    <IconButton //  맵 아이콘
                        color="inherit"
                        aria-haspopup="true"
                        aria-controls="mail-menu"
                        onClick={openMapping}
                        className={classes.headerMenuButton}
                    >
                        <Badge color="warning">
                            <ExploreIcon classes={{ root: classes.headerIcon }} />
                        </Badge>
                    </IconButton>
                    <Mapping open={isModalOpen} close={closeModal} />
                    {/* <IconButton // 메세지 아이콘
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            color="secondary"
          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton> */}
                    <IconButton
                        color="inherit"
                        aria-haspopup="true"
                        aria-controls="mail-menu"
                        className={classes.headerMenuButton}
                        onClick={toggleDark}
                    >
                        {icon}
                    </IconButton>
                    <IconButton // 사람모양 아이콘
                        aria-haspopup="true"
                        color="inherit"
                        className={classes.headerMenuButton}
                        aria-controls="profile-menu"
                        onClick={e => setProfileMenu(e.currentTarget)}
                    >
                        <AccountIcon classes={{ root: classes.headerIcon }} />
                    </IconButton>
                    <Menu // 메일 아이콘 누르면 나오는 메뉴
                        id="mail-menu"
                        open={Boolean(mailMenu)}
                        anchorEl={mailMenu}
                        onClose={() => setMailMenu(null)}
                        MenuListProps={{ className: classes.headerMenuList }}
                        className={classes.headerMenu}
                        classes={{ paper: classes.profileMenu }}
                        disableAutoFocusItem
                    >
                        <div className={classes.profileMenuUser}>
                            <Typography variant="h4" weight="medium">
                                New Messages
                            </Typography>
                            <Typography
                                className={classes.profileMenuLink}
                                component="a"
                                color="secondary"
                            >
                                {messages.length} New Messages
                            </Typography>
                        </div>
                        {messages.map(message => (
                            <MenuItem key={message.id} className={classes.messageNotification}>
                                <div className={classes.messageNotificationSide}>
                                    <UserAvatar color={message.variant} name={message.name} />
                                    <Typography size="sm" color="text" colorBrightness="secondary">
                                        {message.time}
                                    </Typography>
                                </div>
                                <div
                                    className={classNames(
                                        classes.messageNotificationSide,
                                        classes.messageNotificationBodySide
                                    )}
                                >
                                    <Typography weight="medium" gutterBottom>
                                        {message.name}
                                    </Typography>
                                    <Typography color="text" colorBrightness="secondary">
                                        {message.message}
                                    </Typography>
                                </div>
                            </MenuItem>
                        ))}
                        <Fab
                            variant="extended"
                            color="primary"
                            aria-label="Add"
                            className={classes.sendMessageButton}
                        >
                            Send New Message
                            <SendIcon className={classes.sendButtonIcon} />
                        </Fab>
                    </Menu>
                    <Menu // 종모양 아이콘 누르면 나오는 메뉴
                        id="notifications-menu"
                        open={Boolean(notificationsMenu)}
                        anchorEl={notificationsMenu}
                        onClose={() => setNotificationsMenu(null)}
                        className={classes.headerMenu}
                        disableAutoFocusItem
                    >
                        {notifications.map(notification => (
                            <MenuItem
                                key={notification.id}
                                onClick={() => setNotificationsMenu(null)}
                                className={classes.headerMenuItem}
                            >
                                <Notification {...notification} typographyVariant="inherit" />
                            </MenuItem>
                        ))}
                    </Menu>
                    <Menu // 사람모양 아이콘 누르면 나오는 메뉴
                        id="profile-menu"
                        open={Boolean(profileMenu)}
                        anchorEl={profileMenu}
                        onClose={() => setProfileMenu(null)}
                        className={classes.headerMenu}
                        classes={{ paper: classes.profileMenu }}
                        disableAutoFocusItem
                    >
                        <div className={classes.profileMenuUser}>
                            <Typography variant="h4" weight="medium">
                                {empInfo.empName}
                            </Typography>
                            <Typography
                                className={classes.profileMenuLink}
                                component="a"
                                color="primary"
                                href="https://flatlogic.com"
                            >
                                Flalogic.com
                            </Typography>
                        </div>
                        <MenuItem
                            className={classNames(classes.profileMenuItem, classes.headerMenuItem)}
                        >
                            <AccountIcon className={classes.profileMenuIcon} /> Profile
                        </MenuItem>
                        <MenuItem
                            className={classNames(classes.profileMenuItem, classes.headerMenuItem)}
                        >
                            <AccountIcon className={classes.profileMenuIcon} /> Tasks
                        </MenuItem>
                        <MenuItem
                            className={classNames(classes.profileMenuItem, classes.headerMenuItem)}
                        >
                            <AccountIcon className={classes.profileMenuIcon} /> Messages
                        </MenuItem>
                        <div className={classes.profileMenuUser}>
                            <Typography
                                className={classes.profileMenuLink}
                                color="primary"
                                onClick={() => handleLogOut()}
                            >
                                Sign Out
                            </Typography>
                        </div>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const messages = [
    {
        id: 0,
        variant: 'warning',
        name: 'Jane Hew',
        message: 'Hey! How is it going?',
        time: '9:32'
    },
    {
        id: 1,
        variant: 'success',
        name: 'Lloyd Brown',
        message: 'Check out my new Dashboard',
        time: '9:18'
    },
    {
        id: 2,
        variant: 'primary',
        name: 'Mark Winstein',
        message: 'I want rearrange the appointment',
        time: '9:15'
    },
    {
        id: 3,
        variant: 'secondary',
        name: 'Liana Dutti',
        message: 'Good news from sale department',
        time: '9:09'
    }
];

const notifications = [
    { id: 0, color: 'warning', message: 'Check out this awesome ticket' },
    {
        id: 1,
        color: 'success',
        type: 'info',
        message: 'What is the best way to get ...'
    },
    {
        id: 2,
        color: 'secondary',
        type: 'notification',
        message: 'This is just a simple notification'
    },
    {
        id: 3,
        color: 'primary',
        type: 'e-commerce',
        message: '12 new orders has arrived today'
    }
];
