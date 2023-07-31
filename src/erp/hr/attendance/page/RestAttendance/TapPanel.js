import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
class TabPanel extends Component {
  render() {
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={this.props.value !== this.props.index}
        id={`simple-tabpanel-${this.props.index}`}
        aria-labelledby={`simple-tab-${this.props.index}`}
        {...this.props.other}
      >
        <Box p={3}>{this.props.children}</Box>
       
      </Typography>
    );
  }
}
export default TabPanel;
