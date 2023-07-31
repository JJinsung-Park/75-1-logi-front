import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "erp/hr/Page/RestAttendance/TapPanel";

import MaxWidthDialog from "erp/hr/Page/RestAttendance/MaxWidthDialog";
class RestAttdRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  a11yProps = index => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    return (
      <div>
        <AppBar position="static">
          <Tabs value={this.state.value} onChange={this.handleChange}>
            <Tab label="근태외신청" {...this.a11yProps(0)} />
            <Tab label="근태외조회" {...this.a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}></TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Item Two
        </TabPanel>
        <div class="MaxWidthDialog">
          <MaxWidthDialog />
        </div>
      </div>
    );
  }
}
export default RestAttdRegister;
