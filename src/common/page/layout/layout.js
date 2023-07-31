import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import classnames from "classnames";
import useStyles from "common/page/layout/styles";
import HeaderContainer from "./Header/HeaderContainer";
import Sidebar from "./Sidebar/Sidebar";
import Scroll from "./Scroll";
import { CssBaseline } from "@material-ui/core";
import RootRoute from "root/RootRoute";
 

function Layout(props) {
  var classes = useStyles();

  // global
  // var layoutState = useLayoutState();
  const isSidebarOpened = useSelector(
    ({ sideBarReducer }) => sideBarReducer.isSidebarOpened,
    [],
  );
   const url = props.match.path
   
 
  return (
    <div className={classes.root}>
      <CssBaseline />
      <HeaderContainer history={props.history} />
      <Sidebar />
      <div
        backdropprops={{ style: { position: "absolute" } }}
        className={classnames(classes.content, {
          [classes.contentShift]: isSidebarOpened,
        })}
      >
        <div className={classes.drawerHeader} />
        {/* <div className={classes.fakeToolbar} /> */}

        <RootRoute/>

      </div>
      <Scroll showBelow={10} />
    </div>
  );
}

export default withRouter(Layout);
