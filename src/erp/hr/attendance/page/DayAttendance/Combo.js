import React, { useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import classNames from "classnames";
import {OutlinedInput} from "@material-ui/core";
import GridStyle from "./GridStyle";

//===========================재영 20-08-27======================//
// const BootstrapInput = withStyles(theme => ({
//   root: {
//     "label + &": {
//       marginTop: theme.spacing(3),
//     },
//   },
//   input: {
//     borderRadius: 4,
//     position: "relative",
//     backgroundColor: theme.palette.background.paper,
//     border: "1px solid #ced4da",
//     fontSize: 16,
//     padding: "10px 26px 10px 12px",
//     transition: theme.transitions.create(["border-color", "box-shadow"]),
//     // Use the system font instead of the default Roboto font.
//     fontFamily: [
//       "-apple-system",
//       "BlinkMacSystemFont",
//       '"Segoe UI"',
//       "Roboto",
//       '"Helvetica Neue"',
//       "Arial",
//       "sans-serif",
//       '"Apple Color Emoji"',
//       '"Segoe UI Emoji"',
//       '"Segoe UI Symbol"',
//     ].join(","),
//     "&:focus": {
//       borderRadius: 4,
//       borderColor: "#80bdff",
//       boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
//     },
//   },
// }))(InputBase);

// const useStyles = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
//   marginLeft: {
//     marginLeft: theme.spacing(6),
//   },
// }));



export default function CustomizedSelects(props) {

  const classes = GridStyle();

  useEffect(() => {
    switch (props.attdType.value) {
      case "ADC001":
        props.attdTypeName.setValue("출근");
        break;
      case "ADC002":
        props.attdTypeName.setValue("퇴근");
        break;
      case "ADC004":
        props.attdTypeName.setValue("귀사");
        break;
      case "ADC006":
        props.attdTypeName.setValue("외출");
        break;
      default:
        props.attdTypeName.setValue("");
        break;
    }
  }, [props.attdType.value]);

  return (
    <div>
      <FormControl variant="outlined" className={classes.FormControl}>
        <InputLabel htmlFor="outlined-cost-simple">
          근태구분
        </InputLabel>
        <Select
          id="demo-customized-select"
          value={props.attdType.value}
          onChange={e => {
            props.attdType.setValue(e.target.value);
          }}
          input={<OutlinedInput name="cost" id="outlined-cost-simple" />}
        >
          <MenuItem value=""></MenuItem>
          <MenuItem value={"ADC001"}>출근</MenuItem>
          <MenuItem value={"ADC002"}>퇴근</MenuItem>
          <MenuItem value={"ADC004"}>귀사</MenuItem>
          <MenuItem value={"ADC006"}>외출</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
