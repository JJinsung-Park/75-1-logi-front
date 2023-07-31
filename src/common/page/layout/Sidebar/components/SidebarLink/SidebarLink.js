import React, { useState } from 'react';
import {
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';

import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Icon from '@material-ui/core/Icon';
// styles
import useStyles from './styles';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

// components
import Dot from '../Dot';
import { useSelector } from 'react-redux';

export default function SidebarLink({
    menuUrl,
    icon,
    menuName,
    subMenuList,
    location,
    isSidebarOpened,
    nested,
    type,
    authorityLevel
}) {

    var classes = useStyles();
    // local
    var [isOpen, setIsOpen] = useState(false);
    const { empInfo } = useSelector(({ logInOutReducer }) => ({
        empInfo: logInOutReducer.empInfo
    }));

    var isLinkActive =
        menuUrl && (location.pathname === menuUrl || location.pathname.indexOf(menuUrl) !== -1);

    if (type === 'title')
        return (
            <Typography
                className={classnames(classes.linkText, classes.sectionTitle, {
                    [classes.linkTextHidden]: !isSidebarOpened
                })}
            >
                {menuName}
            </Typography>
        );

    if (type === 'divider') return <Divider className={classes.divider} />;

    if (!subMenuList)
        return (
            <ListItem
                button
                component={menuUrl && Link}
                to={menuUrl}
                className={classes.link}
                classes={{
                    root: classnames(classes.linkRoot, {
                        [classes.linkActive]: isLinkActive && !nested,
                        [classes.linkNested]: nested
                    })
                }}
                // disabled
                // {
                //     authorityLevel === 'main' || authorityLevel <= empInfo.authorityLevel
                //         ? false
                //         : true
                // }
            >
                <ListItemIcon
                    className={classnames(classes.linkIcon, {
                        [classes.linkIconActive]: isLinkActive
                    })}
                >
                    {nested ? <Dot color={isLinkActive && 'primary'} /> : icon}
                </ListItemIcon>
                <ListItemText
                    classes={{
                        primary: classnames(classes.linkText, {
                            [classes.linkTextActive]: isLinkActive,
                            [classes.linkTextHidden]: !isSidebarOpened
                        })
                    }}
                    primary={menuName}
                />
            </ListItem>
        );

    return (
        <>
            <ListItem
                button
                component={menuUrl && Link}
                onClick={toggleCollapse}
                className={classes.link}
                disableRipple
            >
                <ListItemIcon
                    className={classnames(classes.linkIcon, {
                        [classes.linkIconActive]: isLinkActive
                    })}
                >
                    <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText
                    classes={{
                        primary: classnames(classes.linkText, {
                            [classes.linkTextActive]: isLinkActive,
                            [classes.linkTextHidden]: !isSidebarOpened
                        })
                    }}
                    primary={menuName}
                />
            </ListItem>
            {subMenuList && (
                <Collapse
                    in={isOpen && isSidebarOpened}
                    timeout="auto"
                    unmountOnExit
                    className={classes.nestedList}
                >
                    <List component="div" disablePadding>
                        {subMenuList.map(subMenu => (
                            <SidebarLink
                                key={subMenu && subMenu.menuCode}
                                location={location}
                                isSidebarOpened={isSidebarOpened}
                                classes={classes}
                                nested
                                authorityLevel={authorityLevel}
                                {...subMenu}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );

    // ###########################################################

    function toggleCollapse(e) {
        if (isSidebarOpened) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    }
}
