import { makeStyles } from "@material-ui/styles";

const drawerWidth = 270;

export default makeStyles(theme => ({
  root: {
    display: "flex",
    // maxWidth: "100vw",
    // overflowX: "hidden",
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   width: `calc(100vw - 270px)`,
  //   minHeight: "100vh",
  //   marginLeft: 0,
  // },
  // contentShift: {
  //   width: `calc(100vw - ${270 + theme.spacing(6)}px)`,
  //   transition: theme.transitions.create(["width", "margin"], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.enteringScreen,
  //   }),
  //   marginLeft: +drawerWidth,
  // },
  // fakeToolbar: {
  //   ...theme.mixins.toolbar,
  // },
  /////////////////////////////////////
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
