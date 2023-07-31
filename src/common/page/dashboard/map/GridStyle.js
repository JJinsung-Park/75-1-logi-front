import { makeStyles } from "@material-ui/styles";

//*************************범석 찾아오시는길 21-09- *************************
const GridStyle = makeStyles(theme => ({
  root: {
    right: "220px",
  },
  topPaper: {
    padding: theme.spacing(1),
    height: 90,
    background: "white",
  },
  marginLeft: {
    marginLeft: theme.spacing(10),
    alignItems: "center",
    justify: "center",
  },
  rightPaper: {
    padding: theme.spacing(2),
    height: 650,
    left: "220px",
  },
  leftPaper: {
    padding: theme.spacing(2),
    height: 650,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "90%",
    paddingTop: 8,
    margin: 8,
  },
  combo: {
    marginLeft: theme.spacing(6),
    width: "50%"
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  subCategory: {
    background: "#232f3e",
    color: "white",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  topFormControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
}));

export default GridStyle;
//*************************범석 찾아오시는길 21-09- *************************
