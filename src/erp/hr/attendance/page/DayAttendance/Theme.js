import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    borderRadius: "12px",
    color: "black",
    position: "relative",
    height: "400px",
    backgroundColor: "white",
  },
  root1: {
    borderRadius: "12px",
    position: "relative",
    backgroundColor: "white",
  },
  tab: {
    position: "relative",
    left: "70px",
    borderRadius: "12px",
    color: "white",
    backgroundColor: "red",
  },
  tab1: {
    position: "relative",
    left: "110px",
    borderRadius: "12px",
    color: "white",
    backgroundColor: "red",
  },
  input: {
    textAlign: "center",
    width: "330px",
    height: "30px",
  },
  buttonsize: {
    position: "relative",
    top: "30px",
    left: "145px",
    width: "120px",
    padding: "10px",
    margin: "5px",
  },
  Clock: {
    position: "relative",
    height: "100px",
  },
  textField: {
    color: "secondary",
    marginLeft: 1,
    marginRight: 1,
    width: "330px",
    fontSize: 60,
  },
}));

export default useStyles;
