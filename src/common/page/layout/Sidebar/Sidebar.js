import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../reducer/commonReducer';
import { Divider, Drawer, IconButton, List } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {
    Home as HomeIcon
    // ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import PersonIcon from '@material-ui/icons/Person';

// styles
import useStyles from './styles';
//asdas

// components
import MenuStructure from '../menu/menuStructure';
// import AdditionalFuncion from "common/menu/Page/additionalFunction";
import SidebarLink from './components/SidebarLink/SidebarLink';

function Sidebar(props) {
    const dispatch = useDispatch();
    const isSidebarOpened = useSelector(({ sideBarReducer }) => sideBarReducer.isSidebarOpened, []);

    var classes = useStyles();

    /*

 

  for (let key in props) {

   

}

for (let key in props.location) {

 

}
*/
    // local
    // var [isPermanent, setPermanent] = useState(true);

    // useEffect(() => {
    //   window.addEventListener("resize", handleWindowWidthChange);
    //   handleWindowWidthChange();

    //   return () => {
    //     window.removeEventListener("resize", handleWindowWidthChange);
    //   };
    // });

    // 메뉴바가 아닌 일반적인 기능들을 하게될 메뉴 만들기위한 structure
    const mainStructure = [
        {
            id: 0,
            menuName: '메인 홈',
            menuUrl: '/app/dashboard',
            icon: <HomeIcon />
        },
        {
            id: 100,
            menuName: '코로나 현황',
            menuUrl: '/app/dashboard/covid19',
            icon: <EqualizerIcon />
        },
        {
            id: 200,
            menuName: '찾아 오시는 길',
            menuUrl: '/app/dashboard/map',
            icon: <PersonIcon />
        }
    ];

    return (
        <Drawer
            backdropprops={{ style: { position: 'absolute' } }}
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            classes={{
                paper: classes.drawerPaper
            }}
            open={isSidebarOpened}
        >
            <div className={classes.drawerHeader}>
                <IconButton
                    onClick={() =>
                        dispatch({
                            type: types.TOGGLE_SIDEBAR
                        })
                    }
                >
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />
            <List className={classes.sidebarList}>
                <div>
                    {mainStructure.map(link => (
                        <SidebarLink
                            key={link.id}
                            location={props.location}
                            isSidebarOpened={isSidebarOpened}
                            authorityLevel="main"
                            {...link}
                        />
                    ))}
                </div>
                {/* 사이드 바에 홈 */}
                <MenuStructure isSidebarOpened={isSidebarOpened} location={props.location} />
                {/* <AdditionalFuncion
          isSidebarOpened={isSidebarOpened}
          location={props.location}
        /> */}
            </List>
        </Drawer>
    );

    // ##################################################################
    // function handleWindowWidthChange() {
    //   var windowWidth = window.innerWidth;
    //   var breakpointWidth = theme.breakpoints.values.md;
    //   var isSmallScreen = windowWidth < breakpointWidth;

    //   if (isSmallScreen && isPermanent) {
    //     setPermanent(false);
    //   } else if (!isSmallScreen && !isPermanent) {
    //     setPermanent(true);
    //   }
    // }
}

export default withRouter(Sidebar);
